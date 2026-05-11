namespace Beacon.Application.Models;

public record KanbanBoardDto(Guid BoardId, string Name, IReadOnlyCollection<KanbanColumnDto> Columns);
