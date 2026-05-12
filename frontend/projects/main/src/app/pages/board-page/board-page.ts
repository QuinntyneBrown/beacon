import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarComponent } from 'components';
import {
  BoardHeaderComponent,
  BoardViewControlsComponent,
  CardQuickCreateActionComponent,
  KANBAN_BOARD_STATE_SERVICE,
  KanbanBoardComponent
} from 'domain';

@Component({
  selector: 'app-board-page',
  imports: [BoardHeaderComponent, BoardViewControlsComponent, CardQuickCreateActionComponent, KanbanBoardComponent, SnackbarComponent],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss'
})
export class BoardPageComponent implements OnInit {
  readonly board = inject(KANBAN_BOARD_STATE_SERVICE).board;
  readonly errorMessage = signal('');
  readonly members = [
    { id: 'ak', label: 'Alex Kim', initials: 'AK' },
    { id: 'mj', label: 'Maya Jones', initials: 'MJ' },
    { id: 'qs', label: 'Quinn Stone', initials: 'QS' }
  ];

  private readonly route = inject(ActivatedRoute);
  private readonly boardState = inject(KANBAN_BOARD_STATE_SERVICE);

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('boardId');
    const loader = boardId ? this.boardState.loadBoardById(boardId) : this.boardState.loadBoard();
    loader.subscribe({
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to load the board.')
    });
  }
}

