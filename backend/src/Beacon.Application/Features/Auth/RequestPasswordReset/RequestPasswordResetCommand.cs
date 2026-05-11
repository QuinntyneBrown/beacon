using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Auth.RequestPasswordReset;

public record RequestPasswordResetCommand(string Email) : IRequest<PasswordResetTicket>;
