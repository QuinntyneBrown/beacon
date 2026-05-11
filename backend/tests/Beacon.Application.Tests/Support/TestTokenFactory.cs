using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Models;
using Beacon.Domain;

namespace Beacon.Application.Tests.Support;

public class TestTokenFactory : ITokenFactory
{
    public GeneratedAccessToken CreateAccessToken(AppUser user, IReadOnlyCollection<string> roles)
    {
        return new GeneratedAccessToken("access-token", DateTimeOffset.UtcNow.AddHours(1));
    }

    public string CreateOpaqueToken()
    {
        return "refresh-token";
    }
}
