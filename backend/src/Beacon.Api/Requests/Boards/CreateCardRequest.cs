namespace Beacon.Api.Requests.Boards;

public class CreateCardRequest
{
    public Guid ColumnId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
