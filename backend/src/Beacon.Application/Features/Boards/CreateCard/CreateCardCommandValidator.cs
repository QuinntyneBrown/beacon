using FluentValidation;

namespace Beacon.Application.Features.Boards.CreateCard;

public class CreateCardCommandValidator : AbstractValidator<CreateCardCommand>
{
    public CreateCardCommandValidator()
    {
        RuleFor(command => command.ColumnId).NotEmpty();
        RuleFor(command => command.Title).NotEmpty().MaximumLength(120);
        RuleFor(command => command.Description).MaximumLength(500);
    }
}
