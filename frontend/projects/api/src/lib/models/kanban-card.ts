export interface KanbanCard {
  readonly cardId: string;
  readonly title: string;
  readonly description: string;
  readonly sortOrder: number;
  readonly dueDateUtc?: string | null;
  readonly commentCount?: number;
  readonly checklistTotal?: number;
  readonly checklistCompleted?: number;
}

