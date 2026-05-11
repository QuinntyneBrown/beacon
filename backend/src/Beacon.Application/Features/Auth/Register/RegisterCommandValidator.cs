using FluentValidation;

namespace Beacon.Application.Features.Auth.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(command => command.Email).NotEmpty().EmailAddress();
        RuleFor(command => command.UserName).NotEmpty().MaximumLength(50);
        RuleFor(command => command.DisplayName).NotEmpty().MaximumLength(100);
        RuleFor(command => command.Password).NotEmpty().MinimumLength(12);
    }
}
