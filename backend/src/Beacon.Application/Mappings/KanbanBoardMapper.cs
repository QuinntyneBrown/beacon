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
                            .Select(card => new KanbanCardDto(
                                card.Id,
                                card.Title,
                                card.Description,
                                card.SortOrder,
                                card.DueDateUtc,
                                card.Comments.Count,
                                card.ChecklistItems.Count,
                                card.ChecklistItems.Count(item => item.IsCompleted)))
                            .ToArray()))
                .ToArray());
    }

    public static BoardSummaryDto ToSummary(this Board board)
    {
        return new BoardSummaryDto(
            board.Id,
            board.Name,
            board.Columns.Count,
            board.Columns.Sum(column => column.Cards.Count));
    }

    public static CardDetailDto ToDetail(this WorkItemCard card)
    {
        return new CardDetailDto(
            card.Id,
            card.BoardColumn.BoardId,
            card.BoardColumnId,
            card.BoardColumn.Name,
            card.Title,
            card.Description,
            card.SortOrder,
            card.DueDateUtc,
            card.Comments
                .OrderBy(comment => comment.CreatedAtUtc)
                .Select(comment => new CommentDto(comment.Id, comment.AuthorId, comment.Author.DisplayName, comment.Body, comment.CreatedAtUtc))
                .ToArray(),
            card.ChecklistItems
                .OrderBy(item => item.SortOrder)
                .Select(item => new ChecklistItemDto(item.Id, item.Text, item.IsCompleted, item.SortOrder))
                .ToArray());
    }
}

