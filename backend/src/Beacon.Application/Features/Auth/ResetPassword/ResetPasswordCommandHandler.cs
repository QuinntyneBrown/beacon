using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Auth.ResetPassword;

public class ResetPasswordCommandHandler(
    IBeaconDbContext dbContext,
    IPasswordHasher passwordHasher,
    ITokenHashingService tokenHashingService) : IRequestHandler<ResetPasswordCommand>
{
    public async Task Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var tokenHash = tokenHashingService.Hash(request.ResetToken);
        var passwordResetToken = await dbContext.PasswordResetTokens
            .Include(candidate => candidate.User)
            .SingleOrDefaultAsync(candidate => candidate.TokenHash == tokenHash && candidate.ConsumedAtUtc == null && candidate.ExpiresAtUtc > DateTimeOffset.UtcNow, cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid password reset token.");

        passwordResetToken.User.PasswordHash = passwordHasher.HashPassword(passwordResetToken.User, request.Password);
        passwordResetToken.User.FailedSignInCount = 0;
        passwordResetToken.User.LockoutEndUtc = null;
        passwordResetToken.ConsumedAtUtc = DateTimeOffset.UtcNow;

        foreach (var refreshToken in await dbContext.RefreshTokens.Where(token => token.UserId == passwordResetToken.UserId && token.RevokedAtUtc == null).ToListAsync(cancellationToken))
        {
            refreshToken.RevokedAtUtc = DateTimeOffset.UtcNow;
        }

        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = passwordResetToken.UserId, EventType = "password_reset_completed", Details = "Password reset completed." });
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
