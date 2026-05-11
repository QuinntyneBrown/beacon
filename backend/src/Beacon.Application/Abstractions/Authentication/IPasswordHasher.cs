using Beacon.Domain;

namespace Beacon.Application.Abstractions.Authentication;

public interface IPasswordHasher
{
    string HashPassword(AppUser user, string password);
    bool VerifyPassword(AppUser user, string providedPassword, string passwordHash);
}
