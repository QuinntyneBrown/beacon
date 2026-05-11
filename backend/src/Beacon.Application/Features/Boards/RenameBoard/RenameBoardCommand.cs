using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Boards.RenameBoard;

public record RenameBoardCommand(Guid BoardId, string Name) : IRequest<BoardSummaryDto>;
