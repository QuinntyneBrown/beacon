using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Cards.AddChecklistItem;

public class AddChecklistItemCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<AddChecklistItemCommand, CardDetailDto>
{
    public async Task<CardDetailDto> Handle(AddChecklistItemCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn).ThenInclude(column => column.Board)
            .Include(candidate => candidate.Comments).ThenInclude(comment => comment.Author)
            .Include(candidate => candidate.ChecklistItems)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        var item = new ChecklistItem
        {
            CardId = card.Id,
            Card = card,
            Text = request.Text.Trim(),
            SortOrder = card.ChecklistItems.Count
        };
        card.ChecklistItems.Add(item);
        await dbContext.SaveChangesAsync(cancellationToken);

        return card.ToDetail();
    }
}
