import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent, IconButtonComponent } from 'components';
import { CardMoveEvent, KanbanCardModel, KanbanColumnModel } from '../models/domain-ui-models';
import { KanbanCardComponent } from '../kanban-card/kanban-card';

export type KanbanColumnDropState = 'idle' | 'drag-over' | 'disabled';

@Component({
  selector: 'lib-kanban-column',
  imports: [ButtonComponent, CdkDrag, CdkDropList, IconButtonComponent, KanbanCardComponent, MatCardModule],
  templateUrl: './kanban-column.html',
  styleUrl: './kanban-column.scss'
})
export class KanbanColumnComponent {
  readonly column = input.required<KanbanColumnModel>();
  readonly addPermission = input(true);
  readonly dropState = input<KanbanColumnDropState>('idle');
  readonly compact = input(false);
  readonly cardDropped = output<CardMoveEvent>();
  readonly addCardClicked = output<string>();
  readonly columnMenuClicked = output<string>();
  readonly cardOpened = output<string>();
  readonly cardActionSelected = output<{ readonly cardId: string; readonly actionId: string }>();

  dropCard(event: CdkDragDrop<readonly KanbanCardModel[]>): void {
    const card = event.item.data as KanbanCardModel;
    this.cardDropped.emit({
      cardId: card.cardId,
      sourceColumnId: event.previousContainer.id,
      destinationColumnId: this.column().columnId,
      destinationSortOrder: event.currentIndex
    });
  }
}
