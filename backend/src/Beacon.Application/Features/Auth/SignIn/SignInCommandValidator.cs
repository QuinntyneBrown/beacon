using FluentValidation;

namespace Beacon.Application.Features.Auth.SignIn;

public class SignInCommandValidator : AbstractValidator<SignInCommand>
{
    public SignInCommandValidator()
    {
        RuleFor(command => command.Email).NotEmpty().EmailAddress();
        RuleFor(command => command.Password).NotEmpty();
    }
}
