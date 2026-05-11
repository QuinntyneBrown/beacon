using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Boards.GetBoard;

public record GetBoardQuery : IRequest<KanbanBoardDto>;
