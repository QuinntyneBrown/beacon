using Beacon.Application.Abstractions.Persistence;
using Beacon.Domain;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Infrastructure.Persistence;

public class BeaconDbContext(DbContextOptions<BeaconDbContext> options) : DbContext(options), IBeaconDbContext
{
    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<Board> Boards => Set<Board>();
    public DbSet<BoardColumn> BoardColumns => Set<BoardColumn>();
    public DbSet<WorkItemCard> WorkItemCards => Set<WorkItemCard>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<ChecklistItem> ChecklistItems => Set<ChecklistItem>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();
    public DbSet<SecurityAuditLog> SecurityAuditLogs => Set<SecurityAuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>().HasIndex(user => user.NormalizedEmail).IsUnique();
        modelBuilder.Entity<Role>().HasIndex(role => role.Name).IsUnique();

        modelBuilder.Entity<UserRole>().HasKey(userRole => new { userRole.UserId, userRole.RoleId });
        modelBuilder.Entity<UserRole>()
            .HasOne(userRole => userRole.User)
            .WithMany(user => user.UserRoles)
            .HasForeignKey(userRole => userRole.UserId);
        modelBuilder.Entity<UserRole>()
            .HasOne(userRole => userRole.Role)
            .WithMany(role => role.UserRoles)
            .HasForeignKey(userRole => userRole.RoleId);

        modelBuilder.Entity<Board>()
            .HasOne(board => board.Owner)
            .WithMany(user => user.Boards)
            .HasForeignKey(board => board.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BoardColumn>()
            .HasOne(column => column.Board)
            .WithMany(board => board.Columns)
            .HasForeignKey(column => column.BoardId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<WorkItemCard>()
            .HasOne(card => card.BoardColumn)
            .WithMany(column => column.Cards)
            .HasForeignKey(card => card.BoardColumnId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Comment>()
            .HasOne(comment => comment.Card)
            .WithMany(card => card.Comments)
            .HasForeignKey(comment => comment.CardId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Comment>()
            .HasOne(comment => comment.Author)
            .WithMany()
            .HasForeignKey(comment => comment.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ChecklistItem>()
            .HasOne(item => item.Card)
            .WithMany(card => card.ChecklistItems)
            .HasForeignKey(item => item.CardId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<RefreshToken>()
            .HasOne(token => token.User)
            .WithMany(user => user.RefreshTokens)
            .HasForeignKey(token => token.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PasswordResetToken>()
            .HasOne(token => token.User)
            .WithMany(user => user.PasswordResetTokens)
            .HasForeignKey(token => token.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SecurityAuditLog>()
            .HasOne(log => log.User)
            .WithMany(user => user.AuditLogs)
            .HasForeignKey(log => log.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
