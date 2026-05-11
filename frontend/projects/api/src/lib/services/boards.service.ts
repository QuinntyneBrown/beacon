import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIGURATION } from '../configuration/api-configuration';
import { BoardSummary } from '../models/board-summary';
import { CreateBoardRequest } from '../models/create-board-request';
import { KanbanBoard } from '../models/kanban-board';
import { RenameBoardRequest } from '../models/rename-board-request';
import { IBoardsService } from './boards.service.contract';

@Injectable()
export class BoardsService implements IBoardsService {
  private readonly httpClient = inject(HttpClient);
  private readonly configuration = inject(API_CONFIGURATION);

  list(): Observable<readonly BoardSummary[]> {
    return this.httpClient.get<readonly BoardSummary[]>(`${this.configuration.baseUrl}/api/boards`);
  }

  get(boardId: string): Observable<KanbanBoard> {
    return this.httpClient.get<KanbanBoard>(`${this.configuration.baseUrl}/api/boards/${boardId}`);
  }

  create(request: CreateBoardRequest): Observable<BoardSummary> {
    return this.httpClient.post<BoardSummary>(`${this.configuration.baseUrl}/api/boards`, request);
  }

  rename(boardId: string, request: RenameBoardRequest): Observable<BoardSummary> {
    return this.httpClient.put<BoardSummary>(`${this.configuration.baseUrl}/api/boards/${boardId}`, request);
  }

  delete(boardId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.configuration.baseUrl}/api/boards/${boardId}`);
  }
}
