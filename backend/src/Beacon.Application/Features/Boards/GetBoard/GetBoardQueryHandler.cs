using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.GetBoard;

public class GetBoardQueryHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<GetBoardQuery, KanbanBoardDto>
{
    public async Task<KanbanBoardDto> Handle(GetBoardQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var query = dbContext.Boards
            .Include(candidate => candidate.Columns)
            .ThenInclude(column => column.Cards)
            .ThenInclude(card => card.Comments)
            .Include(candidate => candidate.Columns)
            .ThenInclude(column => column.Cards)
            .ThenInclude(card => card.ChecklistItems)
            .Where(candidate => candidate.OwnerId == userId);

        var board = request.BoardId is { } boardId
            ? await query.SingleAsync(candidate => candidate.Id == boardId, cancellationToken)
            : await query.OrderBy(candidate => candidate.Name).FirstAsync(cancellationToken);

        return board.ToDto();
    }
}

