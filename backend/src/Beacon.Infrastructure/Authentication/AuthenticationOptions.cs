namespace Beacon.Infrastructure.Authentication;

public class AuthenticationOptions
{
    public const string SectionName = "Authentication";
    public string Mode { get; set; } = "Local";
}
