using FluentValidation;

namespace Beacon.Application.Features.Cards.UpdateCard;

public class UpdateCardCommandValidator : AbstractValidator<UpdateCardCommand>
{
    public UpdateCardCommandValidator()
    {
        RuleFor(command => command.CardId).NotEmpty();
        RuleFor(command => command.Title).NotEmpty().MaximumLength(120);
        RuleFor(command => command.Description).MaximumLength(2000);
    }
}
