using Beacon.Application.Abstractions.Authentication;
using Beacon.Application.Abstractions.Persistence;
using Beacon.Application.Mappings;
using Beacon.Application.Models;
using Beacon.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Beacon.Application.Features.Cards.AddComment;

public class AddCommentCommandHandler(IBeaconDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<AddCommentCommand, CardDetailDto>
{
    public async Task<CardDetailDto> Handle(AddCommentCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetRequiredUserId();
        var card = await dbContext.WorkItemCards
            .Include(candidate => candidate.BoardColumn).ThenInclude(column => column.Board)
            .Include(candidate => candidate.Comments).ThenInclude(comment => comment.Author)
            .Include(candidate => candidate.ChecklistItems)
            .SingleAsync(candidate => candidate.Id == request.CardId && candidate.BoardColumn.Board.OwnerId == userId, cancellationToken);

        var author = await dbContext.Users.SingleAsync(user => user.Id == userId, cancellationToken);
        var comment = new Comment
        {
            CardId = card.Id,
            Card = card,
            AuthorId = author.Id,
            Author = author,
            Body = request.Body.Trim()
        };
        card.Comments.Add(comment);
        dbContext.Comments.Add(comment);
        await dbContext.SaveChangesAsync(cancellationToken);

        return card.ToDetail();
    }
}
