using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Cards.ToggleChecklistItem;

public class ToggleChecklistItemCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<ToggleChecklistItemCommand, CardDetailDto>
{
    public async Task<CardDetailDto> Handle(ToggleChecklistItemCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn).ThenInclude(column => column.Board)
            .Include(candidate => candidate.Comments).ThenInclude(comment => comment.Author)
            .Include(candidate => candidate.ChecklistItems)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        var item = card.ChecklistItems.SingleOrDefault(checklistItem => checklistItem.Id == request.ChecklistItemId)
            ?? throw new InvalidOperationException("Checklist item not found.");
        item.IsCompleted = request.IsCompleted;
        await dbContext.SaveChangesAsync(cancellationToken);

        return card.ToDetail();
    }
}
