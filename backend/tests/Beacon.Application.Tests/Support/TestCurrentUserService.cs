using Beacon.Application.Abstractions.Authentication;

namespace Beacon.Application.Tests.Support;

public class TestCurrentUserService(Guid userId) : ICurrentUserService
{
    public bool IsAuthenticated => true;
    public Guid? UserId => userId;
    public Guid GetRequiredUserId() => userId;
}
