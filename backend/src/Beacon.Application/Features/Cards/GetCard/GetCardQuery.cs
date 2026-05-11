using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Cards.GetCard;

public record GetCardQuery(Guid CardId) : IRequest<CardDetailDto>;
