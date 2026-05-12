import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, OutlinedTextFieldComponent } from 'components';
import { BOARDS_STATE_SERVICE, BoardTileModel, BoardsDashboardViewComponent, SESSION_SERVICE } from 'domain';

@Component({
  selector: 'app-boards-page',
  imports: [BoardsDashboardViewComponent, ButtonComponent, OutlinedTextFieldComponent, ReactiveFormsModule],
  templateUrl: './boards-page.html',
  styleUrl: './boards-page.scss'
})
export class BoardsPageComponent implements OnInit {
  readonly boards = inject(BOARDS_STATE_SERVICE).boards;
  readonly session = inject(SESSION_SERVICE).session;
  readonly filteredBoards = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.boards();
    }

    return this.boards().filter((board) => board.name.toLowerCase().includes(term));
  });
  readonly boardTiles = computed<readonly BoardTileModel[]>(() =>
    this.filteredBoards().map((board) => ({
      ...board,
      workspaceName: 'Workspace',
      sprintText: `${board.columnCount} columns · ${board.cardCount} cards`,
      memberAvatars: this.defaultMembers
    }))
  );
  readonly starredBoardTiles = computed<readonly BoardTileModel[]>(() =>
    this.boardTiles()
      .slice(0, 2)
      .map((board) => ({ ...board, starred: true }))
  );
  readonly isLoading = inject(BOARDS_STATE_SERVICE).isLoading;
  readonly errorMessage = signal('');
  readonly creating = signal(false);
  readonly searchTerm = signal('');

  readonly createForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]]
  });

  private readonly boardsState = inject(BOARDS_STATE_SERVICE);
  private readonly router = inject(Router);
  private readonly defaultMembers = [
    { id: 'ak', label: 'Alex Kim', initials: 'AK' },
    { id: 'mj', label: 'Maya Jones', initials: 'MJ' },
    { id: 'qs', label: 'Quinn Stone', initials: 'QS' }
  ];

  ngOnInit(): void {
    this.boardsState.load().subscribe({
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to load boards.')
    });
  }

  create(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.creating.set(true);
    this.boardsState.create(this.createForm.getRawValue()).subscribe({
      next: (board) => {
        this.creating.set(false);
        this.createForm.reset({ name: '' });
        this.router.navigate(['/boards', board.boardId]);
      },
      error: (error) => {
        this.creating.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to create the board.');
      }
    });
  }

  openBoard(boardId: string): void {
    this.router.navigate(['/boards', boardId]);
  }

  updateCreateName(value: string): void {
    this.createForm.controls.name.setValue(value);
    this.createForm.controls.name.markAsDirty();
  }

  handleBoardAction(event: { readonly boardId: string; readonly actionId: string }): void {
    const board = this.boards().find((candidate) => candidate.boardId === event.boardId);

    if (board && event.actionId === 'menu') {
      this.remove(board.boardId, board.name);
    }
  }

  remove(boardId: string, name: string): void {
    if (!globalThis.confirm(`Delete board "${name}"? This cannot be undone.`)) {
      return;
    }

    this.boardsState.delete(boardId).subscribe({
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to delete the board.')
    });
  }
}
