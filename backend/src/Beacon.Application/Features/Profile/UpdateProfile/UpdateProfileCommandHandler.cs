using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Profile.UpdateProfile;

public class UpdateProfileCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<UpdateProfileCommand, ProfileDto>
{
    public async Task<ProfileDto> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var user = await dbContext.Users
            .Include(candidate => candidate.UserRoles)
            .ThenInclude(userRole => userRole.Role)
            .SingleAsync(candidate => candidate.Id == userId, cancellationToken);

        user.UserName = request.UserName.Trim();
        user.DisplayName = request.DisplayName.Trim();
        dbContext.SecurityAuditLogs.Add(new SecurityAuditLog { UserId = userId, EventType = "profile_updated", Details = "Profile details updated." });
        await dbContext.SaveChangesAsync(cancellationToken);

        return user.ToProfileDto();
    }
}
