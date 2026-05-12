import { Component, computed, input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';

export type BadgeSeverity = 'neutral' | 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'lib-badge',
  imports: [MatBadgeModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss'
})
export class BadgeComponent {
  readonly count = input<number | null>(null);
  readonly label = input('');
  readonly severity = input<BadgeSeverity>('neutral');
  readonly hidden = input(false);
  readonly dot = input(false);
  readonly max = input(99);

  readonly displayText = computed(() => {
    const label = this.label();

    if (label) {
      return label;
    }

    const count = this.count();

    if (count === null) {
      return '';
    }

    return count > this.max() ? `${this.max()}+` : `${count}`;
  });

  readonly accessibleLabel = computed(() => {
    if (this.dot()) {
      return `${this.severity()} notification`;
    }

    return this.displayText() || null;
  });
}
