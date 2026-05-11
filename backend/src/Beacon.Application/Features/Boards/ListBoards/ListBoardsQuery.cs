using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Boards.ListBoards;

public record ListBoardsQuery : IRequest<IReadOnlyCollection<BoardSummaryDto>>;
