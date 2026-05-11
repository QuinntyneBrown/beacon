using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Cards.AddComment;

public record AddCommentCommand(Guid CardId, string Body) : IRequest<CardDetailDto>;
