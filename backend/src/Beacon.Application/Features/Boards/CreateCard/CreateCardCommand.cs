using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Boards.CreateCard;

public record CreateCardCommand(Guid ColumnId, string Title, string Description) : IRequest<KanbanBoardDto>;
