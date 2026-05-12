import { Component, input, output } from '@angular/core';
import { FilterChipComponent } from 'components';
import { BoardFilterId, BoardFilterOption } from '../models/domain-ui-models';

@Component({
  selector: 'lib-board-filter-bar',
  imports: [FilterChipComponent],
  templateUrl: './board-filter-bar.html',
  styleUrl: './board-filter-bar.scss'
})
export class BoardFilterBarComponent {
  readonly filters = input<readonly BoardFilterOption[]>([
    { id: 'all', label: 'All' },
    { id: 'starred', label: 'Starred' },
    { id: 'recent', label: 'Recent' },
    { id: 'mine', label: 'Mine' },
    { id: 'shared', label: 'Shared' },
    { id: 'archived', label: 'Archived' }
  ]);
  readonly selectedFilterId = input<BoardFilterId>('all');
  readonly filterSelected = output<BoardFilterId>();
}
