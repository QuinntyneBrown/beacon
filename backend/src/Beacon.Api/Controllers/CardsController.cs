using Beacon.Api.Requests.Cards;
using Beacon.Application.Features.Cards.AddChecklistItem;
using Beacon.Application.Features.Cards.AddComment;
using Beacon.Application.Features.Cards.DeleteCard;
using Beacon.Application.Features.Cards.GetCard;
using Beacon.Application.Features.Cards.ToggleChecklistItem;
using Beacon.Application.Features.Cards.UpdateCard;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Beacon.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/cards")]
public class CardsController(IMediator mediator) : ControllerBase
{
    [HttpGet("{cardId:guid}")]
    public async Task<IResult> Get(Guid cardId, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new GetCardQuery(cardId), cancellationToken));
    }

    [HttpPut("{cardId:guid}")]
    public async Task<IResult> Update(Guid cardId, [FromBody] UpdateCardRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new UpdateCardCommand(cardId, request.Title, request.Description, request.DueDateUtc), cancellationToken));
    }

    [HttpDelete("{cardId:guid}")]
    public async Task<IResult> Delete(Guid cardId, CancellationToken cancellationToken)
    {
        await mediator.Send(new DeleteCardCommand(cardId), cancellationToken);
        return Results.NoContent();
    }

    [HttpPost("{cardId:guid}/comments")]
    public async Task<IResult> AddComment(Guid cardId, [FromBody] AddCommentRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new AddCommentCommand(cardId, request.Body), cancellationToken));
    }

    [HttpPost("{cardId:guid}/checklist")]
    public async Task<IResult> AddChecklistItem(Guid cardId, [FromBody] AddChecklistItemRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new AddChecklistItemCommand(cardId, request.Text), cancellationToken));
    }

    [HttpPut("{cardId:guid}/checklist/{itemId:guid}")]
    public async Task<IResult> ToggleChecklistItem(Guid cardId, Guid itemId, [FromBody] ToggleChecklistItemRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new ToggleChecklistItemCommand(cardId, itemId, request.IsCompleted), cancellationToken));
    }
}
