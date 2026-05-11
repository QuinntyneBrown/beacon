using FluentValidation;

namespace Beacon.Application.Features.Cards.AddChecklistItem;

public class AddChecklistItemCommandValidator : AbstractValidator<AddChecklistItemCommand>
{
    public AddChecklistItemCommandValidator()
    {
        RuleFor(command => command.CardId).NotEmpty();
        RuleFor(command => command.Text).NotEmpty().MaximumLength(200);
    }
}
