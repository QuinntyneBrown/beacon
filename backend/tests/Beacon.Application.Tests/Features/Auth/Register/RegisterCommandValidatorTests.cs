using Beacon.Application.Features.Auth.Register;

namespace Beacon.Application.Tests.Features.Auth.Register;

public class RegisterCommandValidatorTests
{
    [Fact]
    public void Validate_ShouldFail_WhenPasswordIsTooShort()
    {
        var validator = new RegisterCommandValidator();
        var result = validator.Validate(new RegisterCommand("demo@beacon.local", "demo", "Demo User", "short"));

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.PropertyName == "Password");
    }
}
