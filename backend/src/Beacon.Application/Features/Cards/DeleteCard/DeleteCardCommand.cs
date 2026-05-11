using MediatR;

namespace Beacon.Application.Features.Cards.DeleteCard;

public record DeleteCardCommand(Guid CardId) : IRequest;
