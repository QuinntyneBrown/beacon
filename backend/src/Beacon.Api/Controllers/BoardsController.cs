using Beacon.Api.Requests.Boards;
using Beacon.Application.Features.Boards.CreateCard;
using Beacon.Application.Features.Boards.GetBoard;
using Beacon.Application.Features.Boards.MoveCard;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Beacon.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/boards")]
public class BoardsController(IMediator mediator) : ControllerBase
{
    [HttpGet("me")]
    public async Task<IResult> Get(CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new GetBoardQuery(), cancellationToken));
    }

    [HttpPost("cards")]
    public async Task<IResult> CreateCard([FromBody] CreateCardRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new CreateCardCommand(request.ColumnId, request.Title, request.Description), cancellationToken));
    }

    [HttpPost("cards/move")]
    public async Task<IResult> MoveCard([FromBody] MoveCardRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new MoveCardCommand(request.CardId, request.DestinationColumnId, request.DestinationSortOrder), cancellationToken));
    }
}
