using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Profile.DeleteAccount;

public class DeleteAccountCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<DeleteAccountCommand>
{
    public async Task Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var user = await dbContext.Users.SingleAsync(candidate => candidate.Id == userId, cancellationToken);
        dbContext.Users.Remove(user);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
