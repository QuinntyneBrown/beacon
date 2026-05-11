using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TokenEntity = Beacon.Domain.RefreshToken;

namespace Beacon.Application.Features.Auth.SignIn;

public class SignInCommandHandler(
    IBeaconDbContext dbContext,
    IPasswordHasher passwordHasher,
    ITokenFactory tokenFactory,
    ITokenHashingService tokenHashingService) : IRequestHandler<SignInCommand, AuthenticatedSession>
{
    public async Task<AuthenticatedSession> Handle(SignInCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToUpperInvariant();
        var user = await dbContext.Users
            .Include(candidate => candidate.UserRoles)
            .ThenInclude(userRole => userRole.Role)
            .Include(candidate => candidate.RefreshTokens)
            .SingleOrDefaultAsync(candidate => candidate.NormalizedEmail == normalizedEmail, cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid credentials.");

        if (user.LockoutEndUtc is not null && user.LockoutEndUtc > DateTimeOffset.UtcNow)
        {
            dbContext.SecurityAuditLogs.Add(new SecurityAuditLog
            {
                UserId = user.Id,
                EventType = "signin_blocked",
                Details = "Sign-in blocked because the account is locked."
            });
            await dbContext.SaveChangesAsync(cancellationToken);
            throw new UnauthorizedAccessException("Account is temporarily locked.");
        }

        if (!passwordHasher.VerifyPassword(user, request.Password, user.PasswordHash))
        {
            user.FailedSignInCount += 1;
            if (user.FailedSignInCount >= 5)
            {
                user.LockoutEndUtc = DateTimeOffset.UtcNow.AddMinutes(15);
            }

            dbContext.SecurityAuditLogs.Add(new SecurityAuditLog
            {
                UserId = user.Id,
                EventType = user.LockoutEndUtc is null ? "signin_failed" : "signin_locked",
                Details = "Local password validation failed."
            });
            await dbContext.SaveChangesAsync(cancellationToken);
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        user.FailedSignInCount = 0;
        user.LockoutEndUtc = null;

        var roles = user.UserRoles.Select(userRole => userRole.Role.Name).OrderBy(name => name).ToArray();
        var accessToken = tokenFactory.CreateAccessToken(user, roles);
        var refreshToken = tokenFactory.CreateOpaqueToken();

        dbContext.RefreshTokens.Add(new TokenEntity
        {
            UserId = user.Id,
            User = user,
            TokenHash = tokenHashingService.Hash(refreshToken),
            ExpiresAtUtc = DateTimeOffset.UtcNow.AddDays(30)
        });
        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = user.Id, EventType = "signin_succeeded", Details = "Local sign-in succeeded." });

        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthenticatedSession(user.Id, user.Email, user.DisplayName, roles, accessToken.Token, refreshToken, accessToken.ExpiresAtUtc);
    }
}
