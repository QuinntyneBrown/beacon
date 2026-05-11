namespace Beacon.Application.Models;

public record KanbanColumnDto(Guid ColumnId, string Name, int SortOrder, IReadOnlyCollection<KanbanCardDto> Cards);
