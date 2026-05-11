using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.MoveCard;

public class MoveCardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<MoveCardCommand, KanbanBoardDto>
{
    public async Task<KanbanBoardDto> Handle(MoveCardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn)
            .ThenInclude(column => column.Board)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        var sourceColumnId = card.BoardColumnId;
        var destinationColumn = await dbContext.BoardColumns
            .Include(candidate => candidate.Cards)
            .Include(candidate => candidate.Board)
            .SingleAsync(candidate => candidate.Id == request.DestinationColumnId && candidate.Board.OwnerId == userId, cancellationToken);

        var sourceCards = await dbContext.WorkItemCards
            .Where(candidate => candidate.BoardColumnId == sourceColumnId && candidate.Id != request.CardId)
            .OrderBy(candidate => candidate.SortOrder)
            .ToListAsync(cancellationToken);
        for (var index = 0; index < sourceCards.Count; index += 1)
        {
            sourceCards[index].SortOrder = index;
        }

        var destinationCards = await dbContext.WorkItemCards
            .Where(candidate => candidate.BoardColumnId == request.DestinationColumnId && candidate.Id != request.CardId)
            .OrderBy(candidate => candidate.SortOrder)
            .ToListAsync(cancellationToken);

        var insertionIndex = Math.Min(request.DestinationSortOrder, destinationCards.Count);
        destinationCards.Insert(insertionIndex, card);
        card.BoardColumnId = request.DestinationColumnId;
        card.BoardColumn = destinationColumn;

        for (var index = 0; index < destinationCards.Count; index += 1)
        {
            destinationCards[index].SortOrder = index;
        }

        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "card_moved", Details = $"Card '{card.Title}' moved." });
        await dbContext.SaveChangesAsync(cancellationToken);

        var board = await dbContext.Boards
            .Include(candidate => candidate.Columns)
            .ThenInclude(column => column.Cards)
            .SingleAsync(candidate => candidate.OwnerId == userId, cancellationToken);

        return board.ToDto();
    }
}
