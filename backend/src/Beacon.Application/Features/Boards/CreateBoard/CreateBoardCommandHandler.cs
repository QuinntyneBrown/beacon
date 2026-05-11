using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.CreateBoard;

public class CreateBoardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<CreateBoardCommand, BoardSummaryDto>
{
    public async Task<BoardSummaryDto> Handle(CreateBoardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var owner = await dbContext.Users.SingleAsync(user => user.Id == userId, cancellationToken);

        var board = new Board
        {
            Owner = owner,
            OwnerId = owner.Id,
            Name = request.Name.Trim(),
            Columns =
            [
                new BoardColumn { Name = "Backlog", SortOrder = 0 },
                new BoardColumn { Name = "In Progress", SortOrder = 1 },
                new BoardColumn { Name = "Done", SortOrder = 2 }
            ]
        };

        dbContext.Boards.Add(board);
        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "board_created", Details = $"Board '{board.Name}' created." });
        await dbContext.SaveChangesAsync(cancellationToken);

        return board.ToSummary();
    }
}
