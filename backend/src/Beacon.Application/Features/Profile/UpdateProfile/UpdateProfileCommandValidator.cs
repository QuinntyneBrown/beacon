using FluentValidation;

namespace Beacon.Application.Features.Profile.UpdateProfile;

public class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
{
    public UpdateProfileCommandValidator()
    {
        RuleFor(command => command.UserName).NotEmpty().MaximumLength(50);
        RuleFor(command => command.DisplayName).NotEmpty().MaximumLength(100);
    }
}
