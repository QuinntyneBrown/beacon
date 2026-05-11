namespace Beacon.Infrastructure.Authentication;

public class OidcOptions
{
    public const string SectionName = "Oidc";
    public string Authority { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public string ValidIssuer { get; set; } = string.Empty;
}
