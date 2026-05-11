using Beacon.Application.Models;
using Beacon.Domain;

namespace Beacon.Application.Mappings;

public static class ProfileMapper
{
    public static ProfileDto ToProfileDto(this AppUser user)
    {
        return new ProfileDto(
            user.Id,
            user.Email,
            user.UserName,
            user.DisplayName,
            user.UserRoles.Select(userRole => userRole.Role.Name).OrderBy(name => name).ToArray());
    }
}
