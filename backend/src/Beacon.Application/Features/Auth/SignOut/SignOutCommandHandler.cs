using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Auth.SignOut;

public class SignOutCommandHandler(
    IBeaconDbContext dbContext,
    ICurrentUserService currentUserService,
    ITokenHashingService tokenHashingService) : IRequestHandler<SignOutCommand>
{
    public async Task Handle(SignOutCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var refreshTokenHash = tokenHashingService.Hash(request.RefreshToken);
        var refreshToken = await dbContext.RefreshTokens
            .SingleOrDefaultAsync(token => token.UserId == userId && token.TokenHash == refreshTokenHash && token.RevokedAtUtc == null, cancellationToken);

        if (refreshToken is not null)
        {
            refreshToken.RevokedAtUtc = DateTimeOffset.UtcNow;
        }

        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "signout_succeeded", Details = "Refresh token revoked." });
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
