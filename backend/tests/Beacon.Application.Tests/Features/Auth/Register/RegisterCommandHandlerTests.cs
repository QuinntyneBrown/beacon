using Beacon.Application.Features.Auth.Register;
using Beacon.Application.Tests.Support;
using Beacon.Infrastructure.Authentication;
using Beacon.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Tests.Features.Auth.Register;

public class RegisterCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldCreateStarterBoardAndSession()
    {
        await using var dbContext = CreateDbContext();
        var handler = new RegisterCommandHandler(
            dbContext,
            new Pbkdf2PasswordHasher(),
            new TestTokenFactory(),
            new Sha256TokenHashingService());

        var session = await handler.Handle(
            new RegisterCommand("new@beacon.local", "new-user", "New User", "Password12345!"),
            CancellationToken.None);

        var user = await dbContext.Users
            .Include(candidate => candidate.Boards)
            .ThenInclude(board => board.Columns)
            .ThenInclude(column => column.Cards)
            .SingleAsync();

        Assert.Equal("new@beacon.local", session.Email);
        Assert.Equal("access-token", session.AccessToken);
        Assert.Single(user.Boards);
        Assert.Equal(3, user.Boards.Single().Columns.Count);
    }

    private static BeaconDbContext CreateDbContext()
    {
        return new BeaconDbContext(new DbContextOptionsBuilder<BeaconDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options);
    }
}
