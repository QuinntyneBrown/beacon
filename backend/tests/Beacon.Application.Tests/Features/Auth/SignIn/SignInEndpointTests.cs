using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text;
using Beacon.Api.Requests.Auth;
using Beacon.Application.Models;
using Beacon.Infrastructure.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Beacon.Application.Tests.Features.Auth.SignIn;

public class SignInEndpointTests
{
    [Fact]
    public async Task SignIn_WithValidCredentials_ReturnsValidJwt()
    {
        await using var factory = new BeaconApiFactory();
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/auth/sign-in", new SignInRequest
        {
            Email = "demo@beacon.local",
            Password = "Password12345!"
        });

        response.EnsureSuccessStatusCode();
        var session = await response.Content.ReadFromJsonAsync<AuthenticatedSession>();

        Assert.NotNull(session);
        Assert.Equal("demo@beacon.local", session.Email);
        Assert.Contains("Admin", session.Roles);
        Assert.Contains("Member", session.Roles);
        Assert.False(string.IsNullOrWhiteSpace(session.AccessToken));

        var jwtOptions = factory.Services.GetRequiredService<IOptions<JwtOptions>>().Value;
        var principal = ValidateAccessToken(session.AccessToken, jwtOptions, out var validatedToken);
        var jwt = Assert.IsType<JwtSecurityToken>(validatedToken);

        Assert.Equal(SecurityAlgorithms.HmacSha256, jwt.Header.Alg);
        Assert.Equal(session.UserId.ToString(), principal.FindFirstValue(ClaimTypes.NameIdentifier));
        Assert.Equal(session.Email, principal.FindFirstValue(ClaimTypes.Email));
        Assert.Contains(principal.Claims, claim => claim.Type == ClaimTypes.Role && claim.Value == "Admin");
        Assert.Contains(principal.Claims, claim => claim.Type == ClaimTypes.Role && claim.Value == "Member");
    }

    private static ClaimsPrincipal ValidateAccessToken(string accessToken, JwtOptions jwtOptions, out SecurityToken validatedToken)
    {
        return new JwtSecurityTokenHandler().ValidateToken(accessToken, new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey))
        }, out validatedToken);
    }

    private sealed class BeaconApiFactory : WebApplicationFactory<Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((_, configuration) =>
            {
                configuration.AddInMemoryCollection(new Dictionary<string, string?>
                {
                    ["Persistence:UseInMemory"] = "true",
                    ["Jwt:Issuer"] = "Beacon.Tests",
                    ["Jwt:Audience"] = "Beacon.Tests.Client",
                    ["Jwt:SigningKey"] = "test-signing-key-for-beacon-integration-tests"
                });
            });
        }
    }
}
