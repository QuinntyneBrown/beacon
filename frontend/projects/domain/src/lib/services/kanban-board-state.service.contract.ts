import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCardRequest, KanbanBoard, MoveCardRequest } from 'api';

export interface IKanbanBoardStateService {
  readonly board: Signal<KanbanBoard | null>;
  loadBoard(): Observable<void>;
  loadBoardById(boardId: string): Observable<void>;
  createCard(request: CreateCardRequest): Observable<void>;
  moveCard(request: MoveCardRequest): Observable<void>;
  setBoard(board: KanbanBoard): void;
  clear(): void;
}

export const KANBAN_BOARD_STATE_SERVICE = new InjectionToken<IKanbanBoardStateService>('KANBAN_BOARD_STATE_SERVICE');
