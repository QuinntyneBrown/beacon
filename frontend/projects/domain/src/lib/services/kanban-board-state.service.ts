import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BOARDS_SERVICE, BOARD_SERVICE, CreateCardRequest, IBoardService, IBoardsService, KanbanBoard, MoveCardRequest } from 'api';
import { IKanbanBoardStateService } from './kanban-board-state.service.contract';

@Injectable()
export class KanbanBoardStateService implements IKanbanBoardStateService {
  readonly board = signal<KanbanBoard | null>(null);

  private readonly boardService = inject(BOARD_SERVICE);
  private readonly boardsService = inject(BOARDS_SERVICE);

  loadBoard(): Observable<void> {
    return this.boardService.getMyBoard().pipe(
      tap((board) => this.board.set(board)),
      map(() => void 0)
    );
  }

  loadBoardById(boardId: string): Observable<void> {
    return this.boardsService.get(boardId).pipe(
      tap((board) => this.board.set(board)),
      map(() => void 0)
    );
  }

  createCard(request: CreateCardRequest): Observable<void> {
    return this.boardService.createCard(request).pipe(
      tap((board) => this.board.set(board)),
      map(() => void 0)
    );
  }

  moveCard(request: MoveCardRequest): Observable<void> {
    return this.boardService.moveCard(request).pipe(
      tap((board) => this.board.set(board)),
      map(() => void 0)
    );
  }

  setBoard(board: KanbanBoard): void {
    this.board.set(board);
  }

  clear(): void {
    this.board.set(null);
  }
}

