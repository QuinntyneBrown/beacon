namespace Beacon.Application.Models;

public record CardDetailDto(
    Guid CardId,
    Guid BoardId,
    Guid ColumnId,
    string ColumnName,
    string Title,
    string Description,
    int SortOrder,
    DateTimeOffset? DueDateUtc,
    IReadOnlyCollection<CommentDto> Comments,
    IReadOnlyCollection<ChecklistItemDto> ChecklistItems);
