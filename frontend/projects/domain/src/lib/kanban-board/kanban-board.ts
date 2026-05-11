import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KANBAN_BOARD_STATE_SERVICE } from '../services/kanban-board-state.service.contract';

@Component({
  selector: 'lib-kanban-board',
  imports: [CommonModule, FormsModule, CdkDrag, CdkDropList, CdkDropListGroup, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss'
})
export class KanbanBoardComponent {
  readonly board = inject(KANBAN_BOARD_STATE_SERVICE).board;
  readonly isBusy = signal(false);

  private readonly boardStateService = inject(KANBAN_BOARD_STATE_SERVICE);
  private readonly draftTitles = signal<Record<string, string>>({});
  private readonly draftDescriptions = signal<Record<string, string>>({});

  draftTitle(columnId: string): string {
    return this.draftTitles()[columnId] ?? '';
  }

  draftDescription(columnId: string): string {
    return this.draftDescriptions()[columnId] ?? '';
  }

  updateDraftTitle(columnId: string, value: string): void {
    this.draftTitles.update((drafts) => ({ ...drafts, [columnId]: value }));
  }

  updateDraftDescription(columnId: string, value: string): void {
    this.draftDescriptions.update((drafts) => ({ ...drafts, [columnId]: value }));
  }

  createCard(columnId: string): void {
    const title = this.draftTitle(columnId).trim();
    if (!title) {
      return;
    }

    this.isBusy.set(true);
    this.boardStateService.createCard({
      columnId,
      title,
      description: this.draftDescription(columnId).trim()
    }).subscribe({
      next: () => {
        this.isBusy.set(false);
        this.updateDraftTitle(columnId, '');
        this.updateDraftDescription(columnId, '');
      },
      error: () => this.isBusy.set(false)
    });
  }

  dropCard(destinationColumnId: string, event: CdkDragDrop<readonly import('api').KanbanCard[]>): void {
    const card = event.item.data as import('api').KanbanCard;
    this.isBusy.set(true);
    this.boardStateService.moveCard({
      cardId: card.cardId,
      destinationColumnId,
      destinationSortOrder: event.currentIndex
    }).subscribe({
      next: () => this.isBusy.set(false),
      error: () => this.isBusy.set(false)
    });
  }
}
