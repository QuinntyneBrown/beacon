import { Component, input, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'lib-filter-chip',
  imports: [MatChipsModule],
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.scss'
})
export class FilterChipComponent {
  readonly label = input.required<string>();
  readonly selected = input(false);
  readonly count = input<number | null>(null);
  readonly disabled = input(false);
  readonly selectionChanged = output<boolean>();

  onSelectionChange(selected: boolean): void {
    if (!this.disabled()) {
      this.selectionChanged.emit(selected);
    }
  }
}
