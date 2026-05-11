namespace Beacon.Domain;

public class Board
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OwnerId { get; set; }
    public AppUser Owner { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public ICollection<BoardColumn> Columns { get; set; } = new List<BoardColumn>();
}
