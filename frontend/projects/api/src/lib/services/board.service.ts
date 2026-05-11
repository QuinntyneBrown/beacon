import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIGURATION } from '../configuration/api-configuration';
import { CreateCardRequest } from '../models/create-card-request';
import { KanbanBoard } from '../models/kanban-board';
import { MoveCardRequest } from '../models/move-card-request';
import { IBoardService } from './board.service.contract';

@Injectable()
export class BoardService implements IBoardService {
  private readonly httpClient = inject(HttpClient);
  private readonly configuration = inject(API_CONFIGURATION);

  getMyBoard(): Observable<KanbanBoard> {
    return this.httpClient.get<KanbanBoard>(`${this.configuration.baseUrl}/api/boards/me`);
  }

  createCard(request: CreateCardRequest): Observable<KanbanBoard> {
    return this.httpClient.post<KanbanBoard>(`${this.configuration.baseUrl}/api/boards/cards`, request);
  }

  moveCard(request: MoveCardRequest): Observable<KanbanBoard> {
    return this.httpClient.post<KanbanBoard>(`${this.configuration.baseUrl}/api/boards/cards/move`, request);
  }
}
