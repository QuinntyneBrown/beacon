import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardSummary, CreateBoardRequest, RenameBoardRequest } from 'api';

export interface IBoardsStateService {
  readonly boards: Signal<readonly BoardSummary[]>;
  readonly isLoading: Signal<boolean>;
  load(): Observable<void>;
  create(request: CreateBoardRequest): Observable<BoardSummary>;
  rename(boardId: string, request: RenameBoardRequest): Observable<void>;
  delete(boardId: string): Observable<void>;
}

export const BOARDS_STATE_SERVICE = new InjectionToken<IBoardsStateService>('BOARDS_STATE_SERVICE');
