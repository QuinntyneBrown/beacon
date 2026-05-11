import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { KANBAN_BOARD_STATE_SERVICE, KanbanBoardComponent } from 'domain';

@Component({
  selector: 'app-board-page',
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, KanbanBoardComponent],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss'
})
export class BoardPageComponent implements OnInit {
  readonly board = inject(KANBAN_BOARD_STATE_SERVICE).board;
  readonly errorMessage = signal('');

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

