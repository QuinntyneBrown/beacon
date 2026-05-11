using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Boards.CreateBoard;

public record CreateBoardCommand(string Name) : IRequest<BoardSummaryDto>;
