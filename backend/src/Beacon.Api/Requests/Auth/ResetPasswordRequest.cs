namespace Beacon.Api.Requests.Auth;

public class ResetPasswordRequest
{
    public string ResetToken { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
