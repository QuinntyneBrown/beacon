using System.Text;
using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Infrastructure.Authentication;
using Beacon.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Beacon.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var persistenceOptions = configuration.GetSection(PersistenceOptions.SectionName).Get<PersistenceOptions>() ?? new PersistenceOptions();
        var jwtOptions = configuration.GetSection(JwtOptions.SectionName).Get<JwtOptions>() ?? new JwtOptions();
        var oidcOptions = configuration.GetSection(OidcOptions.SectionName).Get<OidcOptions>() ?? new OidcOptions();
        var authenticationOptions = configuration.GetSection(AuthenticationOptions.SectionName).Get<AuthenticationOptions>() ?? new AuthenticationOptions();

        services.Configure<PersistenceOptions>(configuration.GetSection(PersistenceOptions.SectionName));
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.Configure<OidcOptions>(configuration.GetSection(OidcOptions.SectionName));
        services.Configure<AuthenticationOptions>(configuration.GetSection(AuthenticationOptions.SectionName));

        services.AddDbContext<BeaconDbContext>(options =>
        {
            if (persistenceOptions.UseInMemory)
            {
                options.UseInMemoryDatabase("beacon");
            }
            else
            {
                options.UseSqlServer(configuration.GetConnectionString("Beacon"));
            }
        });

        services.AddScoped<IBeaconDbContext>(provider => provider.GetRequiredService<BeaconDbContext>());
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, HttpContextCurrentUserService>();
        services.AddScoped<IPasswordHasher, Pbkdf2PasswordHasher>();
        services.AddSingleton<ITokenHashingService, Sha256TokenHashingService>();
        services.AddSingleton<ITokenFactory, JwtTokenFactory>();
        services.AddHostedService<DevelopmentDataSeederHostedService>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => ConfigureJwtBearer(options, authenticationOptions, jwtOptions, oidcOptions));
        services.AddAuthorization();

        return services;
    }

    private static void ConfigureJwtBearer(
        JwtBearerOptions options,
        AuthenticationOptions authenticationOptions,
        JwtOptions jwtOptions,
        OidcOptions oidcOptions)
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1)
        };

        if (authenticationOptions.Mode.Equals("Oidc", StringComparison.OrdinalIgnoreCase))
        {
            options.Authority = oidcOptions.Authority;
            options.Audience = oidcOptions.Audience;
            options.TokenValidationParameters.ValidIssuer = oidcOptions.ValidIssuer;
            options.TokenValidationParameters.ValidAudience = oidcOptions.Audience;
            options.TokenValidationParameters.ValidateIssuerSigningKey = false;
        }
        else
        {
            options.TokenValidationParameters.ValidIssuer = jwtOptions.Issuer;
            options.TokenValidationParameters.ValidAudience = jwtOptions.Audience;
            options.TokenValidationParameters.ValidateIssuerSigningKey = true;
            options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey));
        }
    }
}
