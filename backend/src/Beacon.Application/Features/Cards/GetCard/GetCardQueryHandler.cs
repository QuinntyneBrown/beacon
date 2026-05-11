using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Cards.GetCard;

public class GetCardQueryHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<GetCardQuery, CardDetailDto>
{
    public async Task<CardDetailDto> Handle(GetCardQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn).ThenInclude(column => column.Board)
            .Include(candidate => candidate.Comments).ThenInclude(comment => comment.Author)
            .Include(candidate => candidate.ChecklistItems)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        return card.ToDetail();
    }
}
