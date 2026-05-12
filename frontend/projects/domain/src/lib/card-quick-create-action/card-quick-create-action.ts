import { Component, input, output } from '@angular/core';
import { ButtonComponent, FloatingActionButtonComponent } from 'components';
import { CardCreateContext } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-quick-create-action',
  imports: [ButtonComponent, FloatingActionButtonComponent],
  templateUrl: './card-quick-create-action.html',
  styleUrl: './card-quick-create-action.scss'
})
export class CardQuickCreateActionComponent {
  readonly boardId = input.required<string>();
  readonly columnId = input<string | null>(null);
  readonly canCreate = input(true);
  readonly busy = input(false);
  readonly hidden = input(false);
  readonly createCardRequested = output<CardCreateContext>();

  emitCreate(): void {
    this.createCardRequested.emit({
      boardId: this.boardId(),
      columnId: this.columnId() ?? undefined
    });
  }
}
