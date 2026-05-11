using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Profile.GetProfile;

public record GetProfileQuery : IRequest<ProfileDto>;
