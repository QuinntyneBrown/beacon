namespace Beacon.Domain;

public class BoardColumn
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BoardId { get; set; }
    public Board Board { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public ICollection<WorkItemCard> Cards { get; set; } = new List<WorkItemCard>();
}
