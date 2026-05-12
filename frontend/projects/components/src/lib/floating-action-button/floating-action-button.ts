import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type FloatingActionButtonPosition = 'inline' | 'bottom-end' | 'bottom-start' | 'top-end';
export type FloatingActionButtonVisibility = 'always' | 'mobile-only' | 'tablet-up' | 'desktop-up';

@Component({
  selector: 'lib-floating-action-button',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './floating-action-button.html',
  styleUrl: './floating-action-button.scss'
})
export class FloatingActionButtonComponent {
  readonly label = input('');
  readonly icon = input('add');
  readonly color = input<'primary' | 'surface' | 'tertiary'>('primary');
  readonly position = input<FloatingActionButtonPosition>('inline');
  readonly visibilityBreakpoint = input<FloatingActionButtonVisibility>('always');
  readonly extended = input(false);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly clicked = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
