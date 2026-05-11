import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardSummary } from '../models/board-summary';
import { CreateBoardRequest } from '../models/create-board-request';
import { KanbanBoard } from '../models/kanban-board';
import { RenameBoardRequest } from '../models/rename-board-request';

export interface IBoardsService {
  list(): Observable<readonly BoardSummary[]>;
  get(boardId: string): Observable<KanbanBoard>;
  create(request: CreateBoardRequest): Observable<BoardSummary>;
  rename(boardId: string, request: RenameBoardRequest): Observable<BoardSummary>;
  delete(boardId: string): Observable<void>;
}

export const BOARDS_SERVICE = new InjectionToken<IBoardsService>('BOARDS_SERVICE');
