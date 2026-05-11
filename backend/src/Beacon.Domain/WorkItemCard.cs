namespace Beacon.Domain;

public class WorkItemCard
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BoardColumnId { get; set; }
    public BoardColumn BoardColumn { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public DateTimeOffset? DueDateUtc { get; set; }
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<ChecklistItem> ChecklistItems { get; set; } = new List<ChecklistItem>();
}
