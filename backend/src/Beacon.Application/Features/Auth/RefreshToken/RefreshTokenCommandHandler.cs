using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TokenEntity = Beacon.Domain.RefreshToken;

namespace Beacon.Application.Features.Auth.RefreshToken;

public class RefreshTokenCommandHandler(
    IBeaconDbContext dbContext,
    ITokenFactory tokenFactory,
    ITokenHashingService tokenHashingService) : IRequestHandler<RefreshTokenCommand, AuthenticatedSession>
{
    public async Task<AuthenticatedSession> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var hash = tokenHashingService.Hash(request.RefreshToken);
        var existing = await dbContext.RefreshTokens
            .Include(token => token.User).ThenInclude(user => user.UserRoles).ThenInclude(userRole => userRole.Role)
            .SingleOrDefaultAsync(token => token.TokenHash == hash, cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid refresh token.");

        if (existing.RevokedAtUtc is not null || existing.ExpiresAtUtc <= DateTimeOffset.UtcNow)
        {
            throw new UnauthorizedAccessException("Refresh token expired.");
        }

        existing.RevokedAtUtc = DateTimeOffset.UtcNow;

        var user = existing.User;
        var roles = user.UserRoles.Select(userRole => userRole.Role.Name).OrderBy(name => name).ToArray();
        var accessToken = tokenFactory.CreateAccessToken(user, roles);
        var newRefreshToken = tokenFactory.CreateOpaqueToken();

        dbContext.RefreshTokens.Add(new TokenEntity
        {
            UserId = user.Id,
            User = user,
            TokenHash = tokenHashingService.Hash(newRefreshToken),
            ExpiresAtUtc = DateTimeOffset.UtcNow.AddDays(30)
        });
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthenticatedSession(user.Id, user.Email, user.DisplayName, roles, accessToken.Token, newRefreshToken, accessToken.ExpiresAtUtc);
    }
}
