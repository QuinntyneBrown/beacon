using FluentValidation;

namespace Beacon.Application.Features.Auth.RequestPasswordReset;

public class RequestPasswordResetCommandValidator : AbstractValidator<RequestPasswordResetCommand>
{
    public RequestPasswordResetCommandValidator()
    {
        RuleFor(command => command.Email).NotEmpty().EmailAddress();
    }
}
