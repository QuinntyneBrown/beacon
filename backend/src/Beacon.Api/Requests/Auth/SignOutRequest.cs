namespace Beacon.Api.Requests.Auth;

public class SignOutRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}
