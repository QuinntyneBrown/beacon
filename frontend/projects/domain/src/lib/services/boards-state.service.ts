import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BOARDS_SERVICE, BoardSummary, CreateBoardRequest, RenameBoardRequest } from 'api';
import { IBoardsStateService } from './boards-state.service.contract';

@Injectable()
export class BoardsStateService implements IBoardsStateService {
  readonly boards = signal<readonly BoardSummary[]>([]);
  readonly isLoading = signal(false);

  private readonly boardsService = inject(BOARDS_SERVICE);

  load(): Observable<void> {
    this.isLoading.set(true);
    return this.boardsService.list().pipe(
      tap((boards) => {
        this.boards.set(boards);
        this.isLoading.set(false);
      }),
      map(() => void 0)
    );
  }

  create(request: CreateBoardRequest): Observable<BoardSummary> {
    return this.boardsService.create(request).pipe(
      tap((created) => this.boards.update((current) => [...current, created]))
    );
  }

  rename(boardId: string, request: RenameBoardRequest): Observable<void> {
    return this.boardsService.rename(boardId, request).pipe(
      tap((updated) =>
        this.boards.update((current) =>
          current.map((board) => (board.boardId === boardId ? { ...board, name: updated.name } : board))
        )
      ),
      map(() => void 0)
    );
  }

  delete(boardId: string): Observable<void> {
    return this.boardsService.delete(boardId).pipe(
      tap(() => this.boards.update((current) => current.filter((board) => board.boardId !== boardId)))
    );
  }
}
