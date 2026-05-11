using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Cards.DeleteCard;

public class DeleteCardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<DeleteCardCommand>
{
    public async Task Handle(DeleteCardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn).ThenInclude(column => column.Board)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        var siblings = await dbContext.WorkItemCards
            .Where(candidate => candidate.BoardColumnId == card.BoardColumnId && candidate.Id != card.Id)
            .OrderBy(candidate => candidate.SortOrder)
            .ToListAsync(cancellationToken);

        dbContext.WorkItemCards.Remove(card);
        for (var index = 0; index < siblings.Count; index += 1)
        {
            siblings[index].SortOrder = index;
        }

        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "card_deleted", Details = $"Card '{card.Title}' deleted." });
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
