using MediatR;

namespace Beacon.Application.Features.Auth.SignOut;

public record SignOutCommand(string RefreshToken) : IRequest;
