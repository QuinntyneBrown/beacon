import { Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-settings-section',
  imports: [MatDividerModule, MatIconModule],
  templateUrl: './settings-section.html',
  styleUrl: './settings-section.scss'
})
export class SettingsSectionComponent {
  readonly icon = input<string | null>(null);
  readonly title = input.required<string>();
  readonly description = input('');
  readonly compact = input(false);
  readonly divided = input(false);
}
