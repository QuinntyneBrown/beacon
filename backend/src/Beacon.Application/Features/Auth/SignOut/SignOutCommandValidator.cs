using FluentValidation;

namespace Beacon.Application.Features.Auth.SignOut;

public class SignOutCommandValidator : AbstractValidator<SignOutCommand>
{
    public SignOutCommandValidator()
    {
        RuleFor(command => command.RefreshToken).NotEmpty();
    }
}
