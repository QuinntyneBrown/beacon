using FluentValidation;

namespace Beacon.Application.Features.Boards.RenameBoard;

public class RenameBoardCommandValidator : AbstractValidator<RenameBoardCommand>
{
    public RenameBoardCommandValidator()
    {
        RuleFor(command => command.BoardId).NotEmpty();
        RuleFor(command => command.Name).NotEmpty().MaximumLength(80);
    }
}
