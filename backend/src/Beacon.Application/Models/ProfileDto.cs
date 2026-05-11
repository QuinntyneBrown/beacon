namespace Beacon.Application.Models;

public record ProfileDto(Guid UserId, string Email, string UserName, string DisplayName, IReadOnlyCollection<string> Roles);
