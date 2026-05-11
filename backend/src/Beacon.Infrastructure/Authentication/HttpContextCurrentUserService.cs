using System.Security.Claims;
using Beacon.Application.Abstractions.Authentication;
using Microsoft.AspNetCore.Http;

namespace Beacon.Infrastructure.Authentication;

public class HttpContextCurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
{
    public bool IsAuthenticated => UserId.HasValue;

    public Guid? UserId
    {
        get
        {
            var claimValue = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? httpContextAccessor.HttpContext?.User.FindFirstValue("sub");
            return Guid.TryParse(claimValue, out var userId) ? userId : null;
        }
    }

    public Guid GetRequiredUserId()
    {
        return UserId ?? throw new UnauthorizedAccessException("The current request is not authenticated.");
    }
}
