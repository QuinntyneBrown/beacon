using FluentValidation;

namespace Beacon.Application.Features.Boards.CreateBoard;

public class CreateBoardCommandValidator : AbstractValidator<CreateBoardCommand>
{
    public CreateBoardCommandValidator()
    {
        RuleFor(command => command.Name).NotEmpty().MaximumLength(80);
    }
}
