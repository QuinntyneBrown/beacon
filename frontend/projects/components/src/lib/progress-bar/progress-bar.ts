import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'lib-progress-bar',
  imports: [DecimalPipe, MatProgressBarModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss'
})
export class ProgressBarComponent {
  readonly value = input(0);
  readonly max = input(100);
  readonly label = input('');
  readonly color = input<ProgressBarColor>('primary');
  readonly indeterminate = input(false);
  readonly compact = input(false);

  readonly percent = computed(() => {
    const max = this.max();

    if (max <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, (this.value() / max) * 100));
  });
}
