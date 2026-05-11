using Beacon.Application.Models;
using MediatR;

namespace Beacon.Application.Features.Cards.ToggleChecklistItem;

public record ToggleChecklistItemCommand(Guid CardId, Guid ChecklistItemId, bool IsCompleted) : IRequest<CardDetailDto>;
