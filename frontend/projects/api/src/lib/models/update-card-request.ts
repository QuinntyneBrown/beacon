export interface UpdateCardRequest {
  readonly title: string;
  readonly description: string;
  readonly dueDateUtc?: string | null;
}
