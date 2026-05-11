namespace Beacon.Application.Models;

public record KanbanCardDto(Guid CardId, string Title, string Description, int SortOrder);
