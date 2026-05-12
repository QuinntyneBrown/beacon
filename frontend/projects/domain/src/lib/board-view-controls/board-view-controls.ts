import { Component, input, output } from '@angular/core';
import { ChipGroupComponent, IconButtonComponent, LabelPillComponent } from 'components';
import { BoardLabel, BoardViewId, BoardViewOption } from '../models/domain-ui-models';

@Component({
  selector: 'lib-board-view-controls',
  imports: [ChipGroupComponent, IconButtonComponent, LabelPillComponent],
  templateUrl: './board-view-controls.html',
  styleUrl: './board-view-controls.scss'
})
export class BoardViewControlsComponent {
  readonly activeView = input<BoardViewId>('board');
  readonly filterCount = input(0);
  readonly availableLabels = input<readonly BoardLabel[]>([]);
  readonly canFilter = input(true);
  readonly canChangeView = input(true);
  readonly viewOptions = input<readonly BoardViewOption[]>([
    { id: 'board', label: 'Board', icon: 'view_column' },
    { id: 'list', label: 'List', icon: 'view_list' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' }
  ]);
  readonly viewChanged = output<BoardViewId>();
  readonly filterClicked = output<void>();
  readonly labelsClicked = output<void>();
  readonly moreClicked = output<void>();

  emitViewChanged(selectedIds: readonly string[]): void {
    const selectedView = selectedIds[0];

    if (selectedView) {
      this.viewChanged.emit(selectedView);
    }
  }
}
