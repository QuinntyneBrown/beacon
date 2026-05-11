namespace Beacon.Application.Models;

public record AuthenticatedSession(
    Guid UserId,
    string Email,
    string DisplayName,
    IReadOnlyCollection<string> Roles,
    string AccessToken,
    string RefreshToken,
    DateTimeOffset ExpiresAtUtc);
