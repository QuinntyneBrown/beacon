using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.DeleteBoard;

public class DeleteBoardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<DeleteBoardCommand>
{
    public async Task Handle(DeleteBoardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var remainingCount = await dbContext.Boards.CountAsync(board => board.OwnerId == userId, cancellationToken);
        if (remainingCount <= 1)
        {
            throw new InvalidOperationException("You must keep at least one board.");
        }

        var board = await dbContext.Boards
            .SingleAsync(candidate => candidate.Id == request.BoardId && candidate.OwnerId == userId, cancellationToken);

        dbContext.Boards.Remove(board);
        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "board_deleted", Details = $"Board '{board.Name}' deleted." });
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
