import { Component, computed, input, output } from '@angular/core';
import { PageHeaderComponent, SearchBarComponent, SnackbarComponent } from 'components';
import {
  BoardCollection,
  BoardDashboardUser,
  BoardFilterId,
  BoardFilterOption,
  BoardQuickCreateContext,
  BoardTileModel
} from '../models/domain-ui-models';
import { BoardFilterBarComponent } from '../board-filter-bar/board-filter-bar';
import { BoardGridSectionComponent } from '../board-grid-section/board-grid-section';
import { BoardQuickCreateActionComponent } from '../board-quick-create-action/board-quick-create-action';
import { CreateBoardTileComponent } from '../create-board-tile/create-board-tile';

@Component({
  selector: 'lib-boards-dashboard-view',
  imports: [
    BoardFilterBarComponent,
    BoardGridSectionComponent,
    BoardQuickCreateActionComponent,
    CreateBoardTileComponent,
    PageHeaderComponent,
    SearchBarComponent,
    SnackbarComponent
  ],
  templateUrl: './boards-dashboard-view.html',
  styleUrl: './boards-dashboard-view.scss'
})
export class BoardsDashboardViewComponent {
  readonly currentUser = input<BoardDashboardUser | null>(null);
  readonly starredBoards = input<readonly BoardTileModel[]>([]);
  readonly boards = input<readonly BoardTileModel[]>([]);
  readonly collections = input<readonly BoardCollection[]>([]);
  readonly filters = input<readonly BoardFilterOption[]>([]);
  readonly selectedFilterId = input<BoardFilterId>('all');
  readonly searchQuery = input('');
  readonly loading = input(false);
  readonly errorMessage = input('');
  readonly canCreateBoard = input(true);
  readonly workspaceContext = input<BoardQuickCreateContext | null>(null);
  readonly boardSelected = output<string>();
  readonly filterChanged = output<BoardFilterId>();
  readonly searchSubmitted = output<string>();
  readonly createRequested = output<BoardQuickCreateContext | null>();
  readonly sortRequested = output<string>();
  readonly boardActionSelected = output<{ readonly boardId: string; readonly actionId: string }>();

  readonly visibleCollections = computed<readonly BoardCollection[]>(() => {
    if (this.collections().length > 0) {
      return this.collections();
    }

    return [
      { id: 'starred', title: 'Starred', boards: this.starredBoards(), emptyText: 'No starred boards yet.' },
      { id: 'all', title: 'All boards', boards: this.boards(), emptyText: 'No boards match this view.' }
    ];
  });

  readonly visibleFilters = computed<readonly BoardFilterOption[]>(() =>
    this.filters().length > 0
      ? this.filters()
      : [
          { id: 'all', label: 'All', count: this.boards().length },
          { id: 'starred', label: 'Starred', count: this.starredBoards().length },
          { id: 'recent', label: 'Recent' },
          { id: 'mine', label: 'Mine' },
          { id: 'shared', label: 'Shared' },
          { id: 'archived', label: 'Archived' }
        ]
  );
}
