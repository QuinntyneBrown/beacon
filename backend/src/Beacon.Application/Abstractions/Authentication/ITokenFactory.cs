using Beacon.Application.Models;
using Beacon.Domain;

namespace Beacon.Application.Abstractions.Authentication;

public interface ITokenFactory
{
    GeneratedAccessToken CreateAccessToken(AppUser user, IReadOnlyCollection<string> roles);
    string CreateOpaqueToken();
}
