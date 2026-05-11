namespace Beacon.Infrastructure.Authentication;

public class JwtOptions
{
    public const string SectionName = "Jwt";
    public string Issuer { get; set; } = "Beacon";
    public string Audience { get; set; } = "Beacon.Client";
    public string SigningKey { get; set; } = "super-long-development-signing-key-change-me";
    public int AccessTokenMinutes { get; set; } = 60;
}
