import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'lib-feature-list-item',
  imports: [MatIconModule, MatListModule],
  templateUrl: './feature-list-item.html',
  styleUrl: './feature-list-item.scss'
})
export class FeatureListItemComponent {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input('');
  readonly compact = input(false);
}
