namespace Beacon.Application.Models;

public record BoardSummaryDto(Guid BoardId, string Name, int ColumnCount, int CardCount);
