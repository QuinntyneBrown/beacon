using Beacon.Application.Models;
using Beacon.Domain;

namespace Beacon.Application.Mappings;

public static class KanbanBoardMapper
{
    public static KanbanBoardDto ToDto(this Board board)
    {
        return new KanbanBoardDto(
            board.Id,
            board.Name,
            board.Columns
                .OrderBy(column => column.SortOrder)
                .Select(
                    column => new KanbanColumnDto(
                        column.Id,
                        column.Name,
                        column.SortOrder,
                        column.Cards
                            .OrderBy(card => card.SortOrder)
                            .Select(card => new KanbanCardDto(card.Id, card.Title, card.Description, card.SortOrder))
                            .ToArray()))
                .ToArray());
    }
}
