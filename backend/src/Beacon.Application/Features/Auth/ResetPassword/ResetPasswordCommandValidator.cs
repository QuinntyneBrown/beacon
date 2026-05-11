using FluentValidation;

namespace Beacon.Application.Features.Auth.ResetPassword;

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(command => command.ResetToken).NotEmpty();
        RuleFor(command => command.Password).NotEmpty().MinimumLength(12);
    }
}
