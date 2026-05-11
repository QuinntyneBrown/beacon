using Beacon.Application.Features.Cards.ToggleChecklistItem;
using Beacon.Application.Tests.Support;
using Beacon.Domain;
using Beacon.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Tests.Features.Cards.ToggleChecklistItem;

public class ToggleChecklistItemCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldFlipCompletedFlagOnChecklistItem()
    {
        var ownerId = Guid.NewGuid();
        await using var dbContext = CreateDbContext();
        var (card, checklistItem) = SeedCardWithChecklistItem(ownerId, dbContext);
        await dbContext.SaveChangesAsync(CancellationToken.None);

        var handler = new ToggleChecklistItemCommandHandler(dbContext, new TestCurrentUserService(ownerId));

        await handler.Handle(new ToggleChecklistItemCommand(card.Id, checklistItem.Id, true), CancellationToken.None);

        var refreshed = await dbContext.ChecklistItems.SingleAsync(item => item.Id == checklistItem.Id);
        Assert.True(refreshed.IsCompleted);

        await handler.Handle(new ToggleChecklistItemCommand(card.Id, checklistItem.Id, false), CancellationToken.None);
        refreshed = await dbContext.ChecklistItems.SingleAsync(item => item.Id == checklistItem.Id);
        Assert.False(refreshed.IsCompleted);
    }

    private static BeaconDbContext CreateDbContext()
    {
        return new BeaconDbContext(new DbContextOptionsBuilder<BeaconDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options);
    }

    private static (WorkItemCard Card, ChecklistItem Item) SeedCardWithChecklistItem(Guid ownerId, BeaconDbContext dbContext)
    {
        var owner = new AppUser
        {
            Id = ownerId,
            Email = "demo@beacon.local",
            NormalizedEmail = "DEMO@BEACON.LOCAL",
            UserName = "demo",
            DisplayName = "Demo",
            PasswordHash = "hash"
        };
        dbContext.Users.Add(owner);

        var item = new ChecklistItem { Text = "Step", IsCompleted = false, SortOrder = 0 };
        var card = new WorkItemCard
        {
            Title = "Card",
            Description = string.Empty,
            SortOrder = 0,
            ChecklistItems = [item]
        };
        dbContext.Boards.Add(new Board
        {
            OwnerId = ownerId,
            Owner = owner,
            Name = "Board",
            Columns =
            [
                new BoardColumn { Name = "Backlog", SortOrder = 0, Cards = [card] }
            ]
        });
        return (card, item);
    }
}
