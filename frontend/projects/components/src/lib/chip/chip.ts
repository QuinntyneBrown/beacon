import { Component, input, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-chip',
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chip.html',
  styleUrl: './chip.scss'
})
export class ChipComponent {
  readonly label = input.required<string>();
  readonly icon = input<string | null>(null);
  readonly colorToken = input('');
  readonly selected = input(false);
  readonly disabled = input(false);
  readonly interactive = input(false);
  readonly selectionChanged = output<boolean>();

  onSelectionChange(selected: boolean): void {
    if (!this.disabled()) {
      this.selectionChanged.emit(selected);
    }
  }
}
