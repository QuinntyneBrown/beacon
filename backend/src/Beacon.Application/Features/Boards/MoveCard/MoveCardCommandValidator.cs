using FluentValidation;

namespace Beacon.Application.Features.Boards.MoveCard;

public class MoveCardCommandValidator : AbstractValidator<MoveCardCommand>
{
    public MoveCardCommandValidator()
    {
        RuleFor(command => command.CardId).NotEmpty();
        RuleFor(command => command.DestinationColumnId).NotEmpty();
        RuleFor(command => command.DestinationSortOrder).GreaterThanOrEqualTo(0);
    }
}
