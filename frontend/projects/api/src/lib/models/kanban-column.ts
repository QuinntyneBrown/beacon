import { KanbanCard } from './kanban-card';

export interface KanbanColumn {
  readonly columnId: string;
  readonly name: string;
  readonly sortOrder: number;
  readonly cards: readonly KanbanCard[];
}
