using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Cards.UpdateCard;

public class UpdateCardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<UpdateCardCommand, CardDetailDto>
{
    public async Task<CardDetailDto> Handle(UpdateCardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn).ThenInclude(column => column.Board)
            .Include(candidate => candidate.Comments).ThenInclude(comment => comment.Author)
            .Include(candidate => candidate.ChecklistItems)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        card.Title = request.Title.Trim();
        card.Description = request.Description.Trim();
        card.DueDateUtc = request.DueDateUtc;
        await dbContext.SaveChangesAsync(cancellationToken);

        return card.ToDetail();
    }
}
