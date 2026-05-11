using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Auth.Register;

public class RegisterCommandHandler(
    IBeaconDbContext dbContext,
    IPasswordHasher passwordHasher,
    ITokenFactory tokenFactory,
    ITokenHashingService tokenHashingService) : IRequestHandler<RegisterCommand, AuthenticatedSession>
{
    public async Task<AuthenticatedSession> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToUpperInvariant();
        var existingUser = await dbContext.Users.AnyAsync(user => user.NormalizedEmail == normalizedEmail, cancellationToken);
        if (existingUser)
        {
            throw new InvalidOperationException("A user with that email already exists.");
        }

        var memberRole = await dbContext.Roles.SingleOrDefaultAsync(role => role.Name == "Member", cancellationToken);
        if (memberRole is null)
        {
            memberRole = new Role { Name = "Member" };
            dbContext.Roles.Add(memberRole);
        }

        var user = new AppUser
        {
            Email = request.Email.Trim(),
            NormalizedEmail = normalizedEmail,
            UserName = request.UserName.Trim(),
            DisplayName = request.DisplayName.Trim()
        };
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
        user.UserRoles.Add(new UserRole { User = user, Role = memberRole });
        user.Boards.Add(CreateStarterBoard(user));
        user.AuditLogs.Add(new SecurityAuditLog { EventType = "registration_succeeded", Details = "Local account registered." });

        dbContext.Users.Add(user);

        var accessToken = tokenFactory.CreateAccessToken(user, ["Member"]);
        var refreshToken = tokenFactory.CreateOpaqueToken();
        user.RefreshTokens.Add(new RefreshToken
        {
            User = user,
            TokenHash = tokenHashingService.Hash(refreshToken),
            ExpiresAtUtc = DateTimeOffset.UtcNow.AddDays(30)
        });

        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthenticatedSession(user.Id, user.Email, user.DisplayName, ["Member"], accessToken.Token, refreshToken, accessToken.ExpiresAtUtc);
    }

    private static Board CreateStarterBoard(AppUser owner)
    {
        var todo = new BoardColumn { Name = "Backlog", SortOrder = 0 };
        var doing = new BoardColumn { Name = "In Progress", SortOrder = 1 };
        var done = new BoardColumn { Name = "Done", SortOrder = 2 };

        todo.Cards.Add(new WorkItemCard { Title = "Welcome to Beacon", Description = "Start by dragging work across the board.", SortOrder = 0 });
        doing.Cards.Add(new WorkItemCard { Title = "Invite teammates", Description = "Share credentials for the demo flow.", SortOrder = 0 });
        done.Cards.Add(new WorkItemCard { Title = "Board ready", Description = "Your starter board is already created.", SortOrder = 0 });

        return new Board
        {
            Owner = owner,
            Name = "Team Board",
            Columns = [todo, doing, done]
        };
    }
}
