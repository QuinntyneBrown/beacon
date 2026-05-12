import { Component, input, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

export interface SegmentedChipOption {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'lib-segmented-chip-group',
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './segmented-chip-group.html',
  styleUrl: './segmented-chip-group.scss'
})
export class SegmentedChipGroupComponent {
  readonly options = input<readonly SegmentedChipOption[]>([]);
  readonly selectedOption = input<string | null>(null);
  readonly disabled = input(false);
  readonly ariaLabel = input('Segmented options');
  readonly selectionChanged = output<string>();

  onSelectionChange(value: string): void {
    if (!this.disabled()) {
      this.selectionChanged.emit(value);
    }
  }
}
