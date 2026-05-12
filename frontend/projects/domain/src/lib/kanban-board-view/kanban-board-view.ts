import { Component, input, output } from '@angular/core';
import { SnackbarComponent } from 'components';
import {
  BoardInviteRequest,
  BoardLabel,
  BoardViewId,
  CardCreateContext,
  CardMoveEvent,
  KanbanBoardModel
} from '../models/domain-ui-models';
import { BoardHeaderComponent } from '../board-header/board-header';
import { BoardMemberInviteComponent } from '../board-member-invite/board-member-invite';
import { BoardViewControlsComponent } from '../board-view-controls/board-view-controls';
import { CardQuickCreateActionComponent } from '../card-quick-create-action/card-quick-create-action';
import { KanbanColumnComponent } from '../kanban-column/kanban-column';

@Component({
  selector: 'lib-kanban-board-view',
  imports: [
    BoardHeaderComponent,
    BoardMemberInviteComponent,
    BoardViewControlsComponent,
    CardQuickCreateActionComponent,
    KanbanColumnComponent,
    SnackbarComponent
  ],
  templateUrl: './kanban-board-view.html',
  styleUrl: './kanban-board-view.scss'
})
export class KanbanBoardViewComponent {
  readonly board = input<KanbanBoardModel | null>(null);
  readonly activeView = input<BoardViewId>('board');
  readonly activeFilters = input(0);
  readonly availableLabels = input<readonly BoardLabel[]>([]);
  readonly loading = input(false);
  readonly errorMessage = input('');
  readonly canCreateCard = input(true);
  readonly canInviteMember = input(true);
  readonly inviteOpen = input(false);
  readonly cardOpened = output<string>();
  readonly cardMoved = output<CardMoveEvent>();
  readonly cardCreated = output<CardCreateContext>();
  readonly filterChanged = output<void>();
  readonly viewChanged = output<BoardViewId>();
  readonly inviteRequested = output<string | BoardInviteRequest>();
}
