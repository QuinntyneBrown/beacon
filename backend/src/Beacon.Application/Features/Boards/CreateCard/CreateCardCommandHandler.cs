using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Boards.CreateCard;

public class CreateCardCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<CreateCardCommand, KanbanBoardDto>
{
    public async Task<KanbanBoardDto> Handle(CreateCardCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var column = await dbContext.BoardColumns
            .Include(candidate => candidate.Board)
            .Include(candidate => candidate.Cards)
            .SingleAsync(candidate => candidate.Id == request.ColumnId && candidate.Board.OwnerId == userId, cancellationToken);

        var card = new WorkItemCard
        {
            BoardColumnId = column.Id,
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            SortOrder = column.Cards.Count
        };
        column.Cards.Add(card);
        dbContext.WorkItemCards.Add(card);
        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "card_created", Details = $"Card '{card.Title}' created." });
        await dbContext.SaveChangesAsync(cancellationToken);

        var board = await dbContext.Boards
            .Include(candidate => candidate.Columns)
            .ThenInclude(boardColumn => boardColumn.Cards)
            .SingleAsync(candidate => candidate.Id == column.BoardId && candidate.OwnerId == userId, cancellationToken);

        return board.ToDto();
    }
}
