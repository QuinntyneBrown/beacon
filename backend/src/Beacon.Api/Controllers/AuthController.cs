using Beacon.Api.Requests.Auth;
using Beacon.Application.Features.Auth.Register;
using Beacon.Application.Features.Auth.RequestPasswordReset;
using Beacon.Application.Features.Auth.ResetPassword;
using Beacon.Application.Features.Auth.SignIn;
using Beacon.Application.Features.Auth.SignOut;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Beacon.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("register")]
    public Task<IResult> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        return ExecuteAsync(() => mediator.Send(new RegisterCommand(request.Email, request.UserName, request.DisplayName, request.Password), cancellationToken));
    }

    [HttpPost("sign-in")]
    public Task<IResult> SignIn([FromBody] SignInRequest request, CancellationToken cancellationToken)
    {
        return ExecuteAsync(() => mediator.Send(new SignInCommand(request.Email, request.Password), cancellationToken));
    }

    [Authorize]
    [HttpPost("sign-out")]
    public async Task<IResult> SignOut([FromBody] SignOutRequest request, CancellationToken cancellationToken)
    {
        await mediator.Send(new SignOutCommand(request.RefreshToken), cancellationToken);
        return Results.NoContent();
    }

    [HttpPost("request-password-reset")]
    public Task<IResult> RequestPasswordReset([FromBody] RequestPasswordResetRequest request, CancellationToken cancellationToken)
    {
        return ExecuteAsync(() => mediator.Send(new RequestPasswordResetCommand(request.Email), cancellationToken));
    }

    [HttpPost("reset-password")]
    public async Task<IResult> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        await mediator.Send(new ResetPasswordCommand(request.ResetToken, request.Password), cancellationToken);
        return Results.NoContent();
    }

    private static async Task<IResult> ExecuteAsync<TResponse>(Func<Task<TResponse>> action)
    {
        return Results.Ok(await action());
    }
}
