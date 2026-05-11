using Beacon.Application.Features.Boards.CreateBoard;
using Beacon.Application.Tests.Support;
using Beacon.Domain;
using Beacon.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Tests.Features.Boards.CreateBoard;

public class CreateBoardCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldCreateBoardWithThreeDefaultColumnsForOwner()
    {
        var ownerId = Guid.NewGuid();
        await using var dbContext = CreateDbContext();
        SeedUser(ownerId, dbContext);
        await dbContext.SaveChangesAsync(CancellationToken.None);

        var handler = new CreateBoardCommandHandler(dbContext, new TestCurrentUserService(ownerId));

        var summary = await handler.Handle(new CreateBoardCommand("  Roadmap  "), CancellationToken.None);

        var persisted = await dbContext.Boards.Include(board => board.Columns).SingleAsync();
        Assert.Equal("Roadmap", persisted.Name);
        Assert.Equal(ownerId, persisted.OwnerId);
        Assert.Equal(3, persisted.Columns.Count);
        Assert.Equal(new[] { "Backlog", "In Progress", "Done" }, persisted.Columns.OrderBy(column => column.SortOrder).Select(column => column.Name));
        Assert.Equal(persisted.Id, summary.BoardId);
        Assert.Single(await dbContext.SecurityAuditLogs.Where(log => log.EventType == "board_created").ToListAsync());
    }

    private static BeaconDbContext CreateDbContext()
    {
        return new BeaconDbContext(new DbContextOptionsBuilder<BeaconDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options);
    }

    private static void SeedUser(Guid userId, BeaconDbContext dbContext)
    {
        dbContext.Users.Add(new AppUser
        {
            Id = userId,
            Email = "demo@beacon.local",
            NormalizedEmail = "DEMO@BEACON.LOCAL",
            UserName = "demo",
            DisplayName = "Demo User",
            PasswordHash = "hash"
        });
    }
}
