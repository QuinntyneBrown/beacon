namespace Beacon.Application.Models;

public record ChecklistItemDto(Guid ChecklistItemId, string Text, bool IsCompleted, int SortOrder);
