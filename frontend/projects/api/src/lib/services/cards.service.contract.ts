import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDetail } from '../models/card-detail';
import { UpdateCardRequest } from '../models/update-card-request';

export interface ICardsService {
  get(cardId: string): Observable<CardDetail>;
  update(cardId: string, request: UpdateCardRequest): Observable<CardDetail>;
  delete(cardId: string): Observable<void>;
  addComment(cardId: string, body: string): Observable<CardDetail>;
  addChecklistItem(cardId: string, text: string): Observable<CardDetail>;
  toggleChecklistItem(cardId: string, itemId: string, isCompleted: boolean): Observable<CardDetail>;
}

export const CARDS_SERVICE = new InjectionToken<ICardsService>('CARDS_SERVICE');
