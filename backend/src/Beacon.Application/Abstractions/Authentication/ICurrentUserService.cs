namespace Beacon.Application.Abstractions.Authentication;

public interface ICurrentUserService
{
    bool IsAuthenticated { get; }
    Guid? UserId { get; }
    Guid GetRequiredUserId();
}
