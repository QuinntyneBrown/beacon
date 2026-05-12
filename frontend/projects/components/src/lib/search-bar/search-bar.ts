import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface SearchBarAction {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'lib-search-bar',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBarComponent {
  readonly value = input('');
  readonly placeholder = input('Search');
  readonly disabled = input(false);
  readonly trailingActions = input<readonly SearchBarAction[]>([]);
  readonly valueChanged = output<string>();
  readonly submitted = output<string>();
  readonly trailingActionClicked = output<string>();

  onValueInput(event: Event): void {
    this.valueChanged.emit((event.target as HTMLInputElement).value);
  }
}
