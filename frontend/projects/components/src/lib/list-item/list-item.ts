import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-list-item',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss'
})
export class ListItemComponent {
  readonly icon = input<string | null>(null);
  readonly label = input.required<string>();
  readonly supportingText = input('');
  readonly selected = input(false);
  readonly disabled = input(false);
  readonly dense = input(false);
  readonly interactive = input(true);
  readonly clicked = output<void>();
}
