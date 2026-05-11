using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Cards.AddChecklistItem;

public record AddChecklistItemCommand(Guid CardId, string Text) : IRequest<CardDetailDto>;
