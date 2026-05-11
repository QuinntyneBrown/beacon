using Beacon.Api.Requests.Profile;
using Beacon.Application.Features.Profile.DeleteAccount;
using Beacon.Application.Features.Profile.GetProfile;
using Beacon.Application.Features.Profile.UpdateProfile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Beacon.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public class ProfileController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IResult> Get(CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new GetProfileQuery(), cancellationToken));
    }

    [HttpPut]
    public async Task<IResult> Update([FromBody] UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        return Results.Ok(await mediator.Send(new UpdateProfileCommand(request.UserName, request.DisplayName), cancellationToken));
    }

    [HttpDelete]
    public async Task<IResult> Delete(CancellationToken cancellationToken)
    {
        await mediator.Send(new DeleteAccountCommand(), cancellationToken);
        return Results.NoContent();
    }
}
