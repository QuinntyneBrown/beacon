using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Profile.UpdateProfile;

public record UpdateProfileCommand(string UserName, string DisplayName) : IRequest<ProfileDto>;
