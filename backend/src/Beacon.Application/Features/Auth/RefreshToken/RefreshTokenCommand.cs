using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Auth.RefreshToken;

public record RefreshTokenCommand(string RefreshToken) : IRequest<AuthenticatedSession>;
