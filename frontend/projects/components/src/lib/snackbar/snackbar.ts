import { Component, effect, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type SnackbarSeverity = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'lib-snackbar',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss'
})
export class SnackbarComponent {
  readonly message = input.required<string>();
  readonly actionLabel = input('');
  readonly duration = input(5000);
  readonly open = input(true);
  readonly severity = input<SnackbarSeverity>('info');
  readonly actionClicked = output<void>();
  readonly dismissed = output<void>();

  private readonly autoDismissEffect = effect((onCleanup) => {
    if (!this.open() || this.duration() <= 0) {
      return;
    }

    const timerId = setTimeout(() => this.dismissed.emit(), this.duration());
    onCleanup(() => clearTimeout(timerId));
  });
}
