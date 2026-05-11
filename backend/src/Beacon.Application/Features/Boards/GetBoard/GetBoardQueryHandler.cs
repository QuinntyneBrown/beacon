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
        var board = await dbContext.Boards
            .Include(candidate => candidate.Columns)
            .ThenInclude(column => column.Cards)
            .SingleAsync(candidate => candidate.OwnerId == userId, cancellationToken);

        return board.ToDto();
    }
}
