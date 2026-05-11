using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Boards.MoveCard;

public record MoveCardCommand(Guid CardId, Guid DestinationColumnId, int DestinationSortOrder) : IRequest<KanbanBoardDto>;
