using Beacon.Application.Features.Boards.MoveCard;
using Beacon.Application.Tests.Support;
using Beacon.Domain;
using Beacon.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Tests.Features.Boards.MoveCard;

public class MoveCardCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldMoveCardAndRenumberTheDestinationColumn()
    {
        var ownerId = Guid.NewGuid();
        await using var dbContext = CreateDbContext();
        var board = SeedBoard(ownerId, dbContext);
        await dbContext.SaveChangesAsync(CancellationToken.None);

        var backlog = board.Columns.Single(column => column.Name == "Backlog");
        var done = board.Columns.Single(column => column.Name == "Done");
        var cardToMove = backlog.Cards.OrderBy(card => card.SortOrder).First();
        var handler = new MoveCardCommandHandler(dbContext, new TestCurrentUserService(ownerId));

        await handler.Handle(new MoveCardCommand(cardToMove.Id, done.Id, 0), CancellationToken.None);

        var movedCard = await dbContext.WorkItemCards.SingleAsync(card => card.Id == cardToMove.Id);
        var backlogCards = await dbContext.WorkItemCards.Where(card => card.BoardColumnId == backlog.Id).ToListAsync();
        var doneCards = await dbContext.WorkItemCards.Where(card => card.BoardColumnId == done.Id).OrderBy(card => card.SortOrder).ToListAsync();

        Assert.Equal(done.Id, movedCard.BoardColumnId);
        Assert.Single(backlogCards);
        Assert.Equal(cardToMove.Id, doneCards.First().Id);
    }

    private static BeaconDbContext CreateDbContext()
    {
        return new BeaconDbContext(new DbContextOptionsBuilder<BeaconDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options);
    }

    private static Board SeedBoard(Guid ownerId, BeaconDbContext dbContext)
    {
        var user = new AppUser
        {
            Id = ownerId,
            Email = "demo@beacon.local",
            NormalizedEmail = "DEMO@BEACON.LOCAL",
            UserName = "demo",
            DisplayName = "Demo User",
            PasswordHash = "hash"
        };
        var board = new Board
        {
            OwnerId = ownerId,
            Owner = user,
            Name = "Board",
            Columns =
            [
                new BoardColumn
                {
                    Name = "Backlog",
                    SortOrder = 0,
                    Cards =
                    [
                        new WorkItemCard { Title = "Card A", Description = string.Empty, SortOrder = 0 },
                        new WorkItemCard { Title = "Card B", Description = string.Empty, SortOrder = 1 }
                    ]
                },
                new BoardColumn
                {
                    Name = "Done",
                    SortOrder = 1,
                    Cards = [new WorkItemCard { Title = "Card C", Description = string.Empty, SortOrder = 0 }]
                }
            ]
        };
        dbContext.Users.Add(user);
        dbContext.Boards.Add(board);
        return board;
    }
}
