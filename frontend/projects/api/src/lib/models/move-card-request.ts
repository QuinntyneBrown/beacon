export interface MoveCardRequest {
  readonly cardId: string;
  readonly destinationColumnId: string;
  readonly destinationSortOrder: number;
}
