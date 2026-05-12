import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

export type LabelPillSize = 'small' | 'normal';

@Component({
  selector: 'lib-label-pill',
  imports: [MatChipsModule],
  templateUrl: './label-pill.html',
  styleUrl: './label-pill.scss'
})
export class LabelPillComponent {
  readonly label = input.required<string>();
  readonly colorToken = input('var(--beacon-color-primary-container, #b5f1f5)');
  readonly size = input<LabelPillSize>('normal');
  readonly muted = input(false);
}
