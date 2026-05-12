import { Component, input, output } from '@angular/core';
import { ButtonComponent, FloatingActionButtonComponent } from 'components';
import { BoardQuickCreateContext } from '../models/domain-ui-models';

@Component({
  selector: 'lib-board-quick-create-action',
  imports: [ButtonComponent, FloatingActionButtonComponent],
  templateUrl: './board-quick-create-action.html',
  styleUrl: './board-quick-create-action.scss'
})
export class BoardQuickCreateActionComponent {
  readonly canCreate = input(true);
  readonly workspaceContext = input<BoardQuickCreateContext | null>(null);
  readonly busy = input(false);
  readonly hidden = input(false);
  readonly createBoardRequested = output<BoardQuickCreateContext | null>();
}
