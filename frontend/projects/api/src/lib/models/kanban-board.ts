import { KanbanColumn } from './kanban-column';

export interface KanbanBoard {
  readonly boardId: string;
  readonly name: string;
  readonly columns: readonly KanbanColumn[];
}
