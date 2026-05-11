namespace Beacon.Application.Models;

public record PasswordResetTicket(string Email, string? ResetToken);
