import { CardComment } from './card-comment';
import { ChecklistItem } from './checklist-item';

export interface CardDetail {
  readonly cardId: string;
  readonly columnId: string;
  readonly title: string;
  readonly description: string;
  readonly sortOrder: number;
  readonly dueDateUtc?: string | null;
  readonly comments: readonly CardComment[];
  readonly checklist: readonly ChecklistItem[];
}
