using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Auth.Register;

public record RegisterCommand(string Email, string UserName, string DisplayName, string Password) : IRequest<AuthenticatedSession>;
