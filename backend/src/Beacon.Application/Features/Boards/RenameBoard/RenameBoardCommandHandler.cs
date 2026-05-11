using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.RenameBoard;

public class RenameBoardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<RenameBoardCommand, BoardSummaryDto>
{
    public async Task<BoardSummaryDto> Handle(RenameBoardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var board = await dbContext.Boards
            .Include(candidate => candidate.Columns)
            .ThenInclude(column => column.Cards)
            .SingleAsync(candidate => candidate.Id == request.BoardId && candidate.OwnerId == userId, cancellationToken);

        board.Name = request.Name.Trim();
        await dbContext.SaveChangesAsync(cancellationToken);

        return board.ToSummary();
    }
}
