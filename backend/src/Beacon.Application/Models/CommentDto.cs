namespace Beacon.Application.Models;

public record CommentDto(Guid CommentId, Guid AuthorId, string AuthorDisplayName, string Body, DateTimeOffset CreatedAtUtc);
