import { Component, input, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export interface ChipGroupOption {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly count?: number;
  readonly disabled?: boolean;
}

@Component({
  selector: 'lib-chip-group',
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chip-group.html',
  styleUrl: './chip-group.scss'
})
export class ChipGroupComponent {
  readonly chips = input<readonly ChipGroupOption[]>([]);
  readonly selectedIds = input<readonly string[]>([]);
  readonly multiSelect = input(false);
  readonly disabled = input(false);
  readonly ariaLabel = input('Chip group');
  readonly selectionChanged = output<readonly string[]>();

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  onChipSelection(id: string, selected: boolean): void {
    if (this.disabled()) {
      return;
    }

    if (!this.multiSelect()) {
      this.selectionChanged.emit(selected ? [id] : []);
      return;
    }

    const nextIds = new Set(this.selectedIds());

    if (selected) {
      nextIds.add(id);
    } else {
      nextIds.delete(id);
    }

    this.selectionChanged.emit(Array.from(nextIds));
  }
}
