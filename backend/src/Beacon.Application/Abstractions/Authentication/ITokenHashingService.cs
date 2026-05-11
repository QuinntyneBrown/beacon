namespace Beacon.Application.Abstractions.Authentication;

public interface ITokenHashingService
{
    string Hash(string token);
}
