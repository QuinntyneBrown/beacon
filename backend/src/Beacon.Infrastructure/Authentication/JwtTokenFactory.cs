using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Models;
using Beacon.Domain;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Beacon.Infrastructure.Authentication;

public class JwtTokenFactory(IOptions<JwtOptions> jwtOptions) : ITokenFactory
{
    public GeneratedAccessToken CreateAccessToken(AppUser user, IReadOnlyCollection<string> roles)
    {
        var now = DateTimeOffset.UtcNow;
        var expiresAt = now.AddMinutes(jwtOptions.Value.AccessTokenMinutes);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.Name, user.DisplayName)
        };
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expiresAt.UtcDateTime,
            Issuer = jwtOptions.Value.Issuer,
            Audience = jwtOptions.Value.Audience,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Value.SigningKey)),
                SecurityAlgorithms.HmacSha256)
        };

        var handler = new JwtSecurityTokenHandler();
        return new GeneratedAccessToken(handler.WriteToken(handler.CreateToken(tokenDescriptor)), expiresAt);
    }

    public string CreateOpaqueToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
}
