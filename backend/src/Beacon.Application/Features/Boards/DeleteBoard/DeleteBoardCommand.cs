using MediatR;

namespace Beacon.Application.Features.Boards.DeleteBoard;

public record DeleteBoardCommand(Guid BoardId) : IRequest;
