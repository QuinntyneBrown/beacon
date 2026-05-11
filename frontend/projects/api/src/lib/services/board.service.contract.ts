import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCardRequest } from '../models/create-card-request';
import { KanbanBoard } from '../models/kanban-board';
import { MoveCardRequest } from '../models/move-card-request';

export interface IBoardService {
  getMyBoard(): Observable<KanbanBoard>;
  createCard(request: CreateCardRequest): Observable<KanbanBoard>;
  moveCard(request: MoveCardRequest): Observable<KanbanBoard>;
}

export const BOARD_SERVICE = new InjectionToken<IBoardService>('BOARD_SERVICE');
