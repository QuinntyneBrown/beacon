using Beacon.Domain;
using Beacon.Application.Abstractions.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Beacon.Infrastructure.Persistence;

public class DevelopmentDataSeederHostedService(IServiceProvider serviceProvider) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = serviceProvider.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<BeaconDbContext>();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        await dbContext.Database.EnsureCreatedAsync(cancellationToken);

        if (!await dbContext.Roles.AnyAsync(cancellationToken))
        {
            dbContext.Roles.AddRange(new Role { Name = "Admin" }, new Role { Name = "Member" });
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        if (await dbContext.Users.AnyAsync(cancellationToken))
        {
            return;
        }

        var adminRole = await dbContext.Roles.SingleAsync(role => role.Name == "Admin", cancellationToken);
        var memberRole = await dbContext.Roles.SingleAsync(role => role.Name == "Member", cancellationToken);

        var user = new AppUser
        {
            Email = "demo@beacon.local",
            NormalizedEmail = "DEMO@BEACON.LOCAL",
            UserName = "demo",
            DisplayName = "Demo User"
        };
        user.PasswordHash = passwordHasher.HashPassword(user, "Password12345!");
        user.UserRoles.Add(new UserRole { User = user, Role = adminRole });
        user.UserRoles.Add(new UserRole { User = user, Role = memberRole });

        user.Boards.Add(new Board
        {
            Owner = user,
            Name = "Demo Roadmap",
            Columns =
            [
                new BoardColumn
                {
                    Name = "Backlog",
                    SortOrder = 0,
                    Cards =
                    [
                        new WorkItemCard { Title = "Add dark mode", Description = "Use design tokens for theming.", SortOrder = 0 },
                        new WorkItemCard { Title = "Capture feedback", Description = "Review open issues with the team.", SortOrder = 1 }
                    ]
                },
                new BoardColumn
                {
                    Name = "In Progress",
                    SortOrder = 1,
                    Cards = [new WorkItemCard { Title = "Build auth flow", Description = "Finish the local JWT sign-in experience.", SortOrder = 0 }]
                },
                new BoardColumn
                {
                    Name = "Done",
                    SortOrder = 2,
                    Cards = [new WorkItemCard { Title = "Seed starter board", Description = "Demo data is ready for local use.", SortOrder = 0 }]
                }
            ]
        });

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
