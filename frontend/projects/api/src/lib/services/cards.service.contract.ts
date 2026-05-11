import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDetail } from '../models/card-detail';
import { CardComment } from '../models/card-comment';
import { ChecklistItem } from '../models/checklist-item';
import { UpdateCardRequest } from '../models/update-card-request';

export interface ICardsService {
  get(cardId: string): Observable<CardDetail>;
  update(cardId: string, request: UpdateCardRequest): Observable<CardDetail>;
  delete(cardId: string): Observable<void>;
  addComment(cardId: string, body: string): Observable<CardComment>;
  addChecklistItem(cardId: string, text: string): Observable<ChecklistItem>;
  toggleChecklistItem(cardId: string, itemId: string, isCompleted: boolean): Observable<ChecklistItem>;
}

export const CARDS_SERVICE = new InjectionToken<ICardsService>('CARDS_SERVICE');
