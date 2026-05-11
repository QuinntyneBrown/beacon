using Beacon.Domain;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Abstractions.Persistence;

public interface IBeaconDbContext
{
    DbSet<AppUser> Users { get; }
    DbSet<Role> Roles { get; }
    DbSet<UserRole> UserRoles { get; }
    DbSet<Board> Boards { get; }
    DbSet<BoardColumn> BoardColumns { get; }
    DbSet<WorkItemCard> WorkItemCards { get; }
    DbSet<Comment> Comments { get; }
    DbSet<ChecklistItem> ChecklistItems { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<PasswordResetToken> PasswordResetTokens { get; }
    DbSet<SecurityAuditLog> SecurityAuditLogs { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
