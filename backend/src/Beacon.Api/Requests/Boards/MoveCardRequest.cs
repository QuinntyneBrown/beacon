namespace Beacon.Api.Requests.Boards;

public class MoveCardRequest
{
    public Guid CardId { get; set; }
    public Guid DestinationColumnId { get; set; }
    public int DestinationSortOrder { get; set; }
}
