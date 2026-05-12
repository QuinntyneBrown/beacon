import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-inline-link',
  imports: [MatButtonModule],
  templateUrl: './inline-link.html',
  styleUrl: './inline-link.scss'
})
export class InlineLinkComponent {
  readonly label = input.required<string>();
  readonly href = input<string | null>(null);
  readonly commandId = input('');
  readonly disabled = input(false);
  readonly clicked = output<string>();

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(this.commandId() || this.href() || this.label());
  }
}
