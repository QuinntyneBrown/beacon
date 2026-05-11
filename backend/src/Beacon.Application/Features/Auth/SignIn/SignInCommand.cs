using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Auth.SignIn;

public record SignInCommand(string Email, string Password) : IRequest<AuthenticatedSession>;
