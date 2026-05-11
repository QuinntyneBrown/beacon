using MediatR;

namespace Beacon.Application.Features.Auth.ResetPassword;

public record ResetPasswordCommand(string ResetToken, string Password) : IRequest;
