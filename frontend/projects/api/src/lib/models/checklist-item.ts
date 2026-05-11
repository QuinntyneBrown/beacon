export interface ChecklistItem {
  readonly checklistItemId: string;
  readonly text: string;
  readonly isCompleted: boolean;
  readonly sortOrder: number;
}
