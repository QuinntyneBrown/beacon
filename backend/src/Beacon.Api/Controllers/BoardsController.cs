using Beacon.Api.Requests.Boards;
using Beacon.Application.Features.Boards.CreateBoard;
using Beacon.Application.Features.Boards.CreateCard;
using Beacon.Application.Features.Boards.DeleteBoard;
using Beacon.Application.Features.Boards.GetBoard;
using Beacon.Application.Features.Boards.ListBoards;
using Beacon.Application.Features.Boards.MoveCard;
using Beacon.Application.Features.Boards.RenameBoard;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Beacon.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/boards")]
public class BoardsController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IResult> List(CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new ListBoardsQuery(), cancellationToken));
    }

    [HttpGet("me")]
    public async Task<IResult> GetDefault(CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new GetBoardQuery(), cancellationToken));
    }

    [HttpGet("{boardId:guid}")]
    public async Task<IResult> Get(Guid boardId, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new GetBoardQuery(boardId), cancellationToken));
    }

    [HttpPost]
    public async Task<IResult> Create([FromBody] CreateBoardRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new CreateBoardCommand(request.Name), cancellationToken));
    }

    [HttpPut("{boardId:guid}")]
    public async Task<IResult> Rename(Guid boardId, [FromBody] RenameBoardRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new RenameBoardCommand(boardId, request.Name), cancellationToken));
    }

    [HttpDelete("{boardId:guid}")]
    public async Task<IResult> Delete(Guid boardId, CancellationToken cancellationToken)
    {
        await mediator.Send(new DeleteBoardCommand(boardId), cancellationToken);
        return Results.NoContent();
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

