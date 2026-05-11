using FluentValidation;

namespace Beacon.Application.Features.Cards.AddComment;

public class AddCommentCommandValidator : AbstractValidator<AddCommentCommand>
{
    public AddCommentCommandValidator()
    {
        RuleFor(command => command.CardId).NotEmpty();
        RuleFor(command => command.Body).NotEmpty().MaximumLength(1000);
    }
}
