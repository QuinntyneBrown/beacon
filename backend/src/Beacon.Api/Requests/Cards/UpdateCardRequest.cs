namespace Beacon.Api.Requests.Cards;

public class UpdateCardRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset? DueDateUtc { get; set; }
}
