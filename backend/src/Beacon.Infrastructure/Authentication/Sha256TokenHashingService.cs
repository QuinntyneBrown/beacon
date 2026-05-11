using System.Security.Cryptography;
using System.Text;
using Beacon.Application.Abstractions.Authentication;

namespace Beacon.Infrastructure.Authentication;

public class Sha256TokenHashingService : ITokenHashingService
{
    public string Hash(string token)
    {
        return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
    }
}
