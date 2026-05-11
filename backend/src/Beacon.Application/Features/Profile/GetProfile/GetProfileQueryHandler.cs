using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Profile.GetProfile;

public class GetProfileQueryHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<GetProfileQuery, ProfileDto>
{
    public async Task<ProfileDto> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var user = await dbContext.Users
            .Include(candidate => candidate.UserRoles)
            .ThenInclude(userRole => userRole.Role)
            .SingleAsync(candidate => candidate.Id == userId, cancellationToken);

        return user.ToProfileDto();
    }
}
