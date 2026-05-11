import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIGURATION } from '../configuration/api-configuration';
import { CardDetail } from '../models/card-detail';
import { UpdateCardRequest } from '../models/update-card-request';
import { ICardsService } from './cards.service.contract';

@Injectable()
export class CardsService implements ICardsService {
  private readonly httpClient = inject(HttpClient);
  private readonly configuration = inject(API_CONFIGURATION);

  get(cardId: string): Observable<CardDetail> {
    return this.httpClient.get<CardDetail>(`${this.configuration.baseUrl}/api/cards/${cardId}`);
  }

  update(cardId: string, request: UpdateCardRequest): Observable<CardDetail> {
    return this.httpClient.put<CardDetail>(`${this.configuration.baseUrl}/api/cards/${cardId}`, request);
  }

  delete(cardId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.configuration.baseUrl}/api/cards/${cardId}`);
  }

  addComment(cardId: string, body: string): Observable<CardDetail> {
    return this.httpClient.post<CardDetail>(`${this.configuration.baseUrl}/api/cards/${cardId}/comments`, { body });
  }

  addChecklistItem(cardId: string, text: string): Observable<CardDetail> {
    return this.httpClient.post<CardDetail>(`${this.configuration.baseUrl}/api/cards/${cardId}/checklist`, { text });
  }

  toggleChecklistItem(cardId: string, itemId: string, isCompleted: boolean): Observable<CardDetail> {
    return this.httpClient.put<CardDetail>(`${this.configuration.baseUrl}/api/cards/${cardId}/checklist/${itemId}`, { isCompleted });
  }
}
