import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-settings-row',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './settings-row.html',
  styleUrl: './settings-row.scss'
})
export class SettingsRowComponent {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly icon = input<string | null>(null);
  readonly disabled = input(false);
  readonly warning = input(false);
  readonly interactive = input(false);
  readonly rowClicked = output<void>();
}
