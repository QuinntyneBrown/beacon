import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export type HistoryListDensity = 'default' | 'compact';

export interface HistoryListItem {
  readonly id: string;
  readonly icon?: string;
  readonly title: string;
  readonly description?: string;
  readonly timestamp?: string;
  readonly interactive?: boolean;
}

@Component({
  selector: 'lib-history-list',
  imports: [MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './history-list.html',
  styleUrl: './history-list.scss'
})
export class HistoryListComponent {
  readonly items = input<readonly HistoryListItem[]>([]);
  readonly density = input<HistoryListDensity>('default');
  readonly emptyText = input('No activity yet');
  readonly itemSelected = output<string>();
}
