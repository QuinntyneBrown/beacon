using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Cards.UpdateCard;

public record UpdateCardCommand(Guid CardId, string Title, string Description, DateTimeOffset? DueDateUtc) : IRequest<CardDetailDto>;
