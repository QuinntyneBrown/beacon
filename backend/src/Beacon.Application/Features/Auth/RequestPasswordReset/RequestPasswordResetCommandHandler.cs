using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Auth.RequestPasswordReset;

public class RequestPasswordResetCommandHandler(
    IBeaconDbContext dbContext,
    ITokenFactory tokenFactory,
    ITokenHashingService tokenHashingService) : IRequestHandler<RequestPasswordResetCommand, PasswordResetTicket>
{
    public async Task<PasswordResetTicket> Handle(RequestPasswordResetCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToUpperInvariant();
        var user = await dbContext.Users.SingleOrDefaultAsync(candidate => candidate.NormalizedEmail == normalizedEmail, cancellationToken);
        if (user is null)
        {
            return new PasswordResetTicket(request.Email.Trim(), null);
        }

        var rawToken = tokenFactory.CreateOpaqueToken();
        dbContext.PasswordResetTokens.Add(new PasswordResetToken
        {
            UserId = user.Id,
            TokenHash = tokenHashingService.Hash(rawToken),
            ExpiresAtUtc = DateTimeOffset.UtcNow.AddHours(1)
        });
        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = user.Id, EventType = "password_reset_requested", Details = "Password reset token issued." });
        await dbContext.SaveChangesAsync(cancellationToken);

        return new PasswordResetTicket(user.Email, rawToken);
    }
}
