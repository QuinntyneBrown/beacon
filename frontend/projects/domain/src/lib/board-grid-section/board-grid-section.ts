import { Component, input, output } from '@angular/core';
import { SectionHeadingComponent } from 'components';
import { BoardTileModel } from '../models/domain-ui-models';
import { BoardTileComponent } from '../board-tile/board-tile';

export type BoardGridDensity = 'compact' | 'comfortable';

@Component({
  selector: 'lib-board-grid-section',
  imports: [BoardTileComponent, SectionHeadingComponent],
  templateUrl: './board-grid-section.html',
  styleUrl: './board-grid-section.scss'
})
export class BoardGridSectionComponent {
  readonly sectionTitle = input.required<string>();
  readonly boards = input<readonly BoardTileModel[]>([]);
  readonly emptyText = input('No boards to show.');
  readonly gridDensity = input<BoardGridDensity>('comfortable');
  readonly loading = input(false);
  readonly boardSelected = output<string>();
  readonly boardActionSelected = output<{ readonly boardId: string; readonly actionId: string }>();
}
