import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent, CardMetaItemComponent, LabelPillComponent, ProgressBarComponent } from 'components';
import { KanbanCardModel } from '../models/domain-ui-models';

@Component({
  selector: 'lib-kanban-card',
  imports: [AvatarComponent, CardMetaItemComponent, LabelPillComponent, MatCardModule, ProgressBarComponent],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.scss'
})
export class KanbanCardComponent {
  readonly card = input.required<KanbanCardModel>();
  readonly loading = input(false);
  readonly cardOpened = output<string>();
  readonly actionSelected = output<{ readonly cardId: string; readonly actionId: string }>();
  readonly dragStarted = output<string>();

  checklistValue(): number {
    return this.card().checklistCompleted ?? 0;
  }

  checklistMax(): number {
    return this.card().checklistTotal ?? 0;
  }

  commentCountText(): string {
    return `${this.card().commentCount ?? 0}`;
  }

  attachmentCountText(): string {
    return `${this.card().attachmentCount ?? 0}`;
  }
}
