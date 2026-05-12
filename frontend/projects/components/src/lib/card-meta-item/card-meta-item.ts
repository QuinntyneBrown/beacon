import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type CardMetaItemTone = 'default' | 'muted' | 'accent' | 'warning';

@Component({
  selector: 'lib-card-meta-item',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './card-meta-item.html',
  styleUrl: './card-meta-item.scss'
})
export class CardMetaItemComponent {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input('');
  readonly tone = input<CardMetaItemTone>('default');
  readonly interactive = input(false);
  readonly clicked = output<void>();
}
