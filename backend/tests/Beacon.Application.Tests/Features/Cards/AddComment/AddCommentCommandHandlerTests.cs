using Beacon.Application.Features.Cards.AddComment;
using Beacon.Application.Tests.Support;
using Beacon.Domain;
using Beacon.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Tests.Features.Cards.AddComment;

public class AddCommentCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldAppendCommentAuthoredByCurrentUser()
    {
        var ownerId = Guid.NewGuid();
        var databaseName = Guid.NewGuid().ToString();
        Guid cardId;
        await using (var seedContext = CreateDbContext(databaseName))
        {
            var seededCard = SeedBoardWithCard(ownerId, seedContext);
            await seedContext.SaveChangesAsync(CancellationToken.None);
            cardId = seededCard.Id;
        }

        await using var dbContext = CreateDbContext(databaseName);
        var handler = new AddCommentCommandHandler(dbContext, new TestCurrentUserService(ownerId));

        var detail = await handler.Handle(new AddCommentCommand(cardId, "  Looks good  "), CancellationToken.None);

        var persistedComments = await dbContext.Comments.Where(comment => comment.CardId == cardId).ToListAsync();
        Assert.Single(persistedComments);
        Assert.Equal("Looks good", persistedComments[0].Body);
        Assert.Equal(ownerId, persistedComments[0].AuthorId);
        Assert.Single(detail.Comments);
        Assert.Equal("Looks good", detail.Comments.Single().Body);
    }

    [Fact]
    public async Task Handle_ShouldThrowWhenCardBelongsToAnotherUser()
    {
        var ownerId = Guid.NewGuid();
        var intruderId = Guid.NewGuid();
        var databaseName = Guid.NewGuid().ToString();
        Guid cardId;
        await using (var seedContext = CreateDbContext(databaseName))
        {
            var seededCard = SeedBoardWithCard(ownerId, seedContext);
            SeedUser(intruderId, seedContext, "intruder@beacon.local", "intruder");
            await seedContext.SaveChangesAsync(CancellationToken.None);
            cardId = seededCard.Id;
        }

        await using var dbContext = CreateDbContext(databaseName);
        var handler = new AddCommentCommandHandler(dbContext, new TestCurrentUserService(intruderId));

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new AddCommentCommand(cardId, "Hi"), CancellationToken.None));
    }

    private static BeaconDbContext CreateDbContext(string databaseName)
    {
        return new BeaconDbContext(new DbContextOptionsBuilder<BeaconDbContext>()
            .UseInMemoryDatabase(databaseName)
            .Options);
    }

    private static WorkItemCard SeedBoardWithCard(Guid ownerId, BeaconDbContext dbContext)
    {
        var owner = SeedUser(ownerId, dbContext, "demo@beacon.local", "demo");
        var card = new WorkItemCard { Title = "Card", Description = string.Empty, SortOrder = 0 };
        dbContext.Boards.Add(new Board
        {
            OwnerId = ownerId,
            Owner = owner,
            Name = "Board",
            Columns =
            [
                new BoardColumn
                {
                    Name = "Backlog",
                    SortOrder = 0,
                    Cards = [card]
                }
            ]
        });
        return card;
    }

    private static AppUser SeedUser(Guid userId, BeaconDbContext dbContext, string email, string userName)
    {
        var user = new AppUser
        {
            Id = userId,
            Email = email,
            NormalizedEmail = email.ToUpperInvariant(),
            UserName = userName,
            DisplayName = userName,
            PasswordHash = "hash"
        };
        dbContext.Users.Add(user);
        return user;
    }
}
