using Beacon.Domain;
using Beacon.Application.Abstractions.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Beacon.Infrastructure.Authentication;

public class Pbkdf2PasswordHasher : IPasswordHasher
{
    private readonly PasswordHasher<AppUser> _passwordHasher = new(Options.Create(new PasswordHasherOptions { IterationCount = 120_000 }));

    public string HashPassword(AppUser user, string password)
    {
        return _passwordHasher.HashPassword(user, password);
    }

    public bool VerifyPassword(AppUser user, string providedPassword, string passwordHash)
    {
        return _passwordHasher.VerifyHashedPassword(user, passwordHash, providedPassword) != PasswordVerificationResult.Failed;
    }
}
