using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.ListBoards;

public class ListBoardsQueryHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<ListBoardsQuery, IReadOnlyCollection<BoardSummaryDto>>
{
    public async Task<IReadOnlyCollection<BoardSummaryDto>> Handle(ListBoardsQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var boards = await dbContext.Boards
            .Include(board => board.Columns)
            .ThenInclude(column => column.Cards)
            .Where(board => board.OwnerId == userId)
            .OrderBy(board => board.Name)
            .ToListAsync(cancellationToken);

        return boards.Select(board => board.ToSummary()).ToArray();
    }
}
