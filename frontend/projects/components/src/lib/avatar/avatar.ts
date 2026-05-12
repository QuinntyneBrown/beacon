import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type AvatarSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-avatar',
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class AvatarComponent {
  readonly imageUrl = input<string | null>(null);
  readonly initials = input('');
  readonly label = input('');
  readonly size = input<AvatarSize>('medium');
  readonly colorToken = input('var(--beacon-color-primary, #006782)');
  readonly interactive = input(false);
  readonly loading = input(false);
  readonly clicked = output<MouseEvent>();

  readonly displayInitials = computed(() => {
    const initials = this.initials().trim();

    if (initials) {
      return initials.slice(0, 3).toUpperCase();
    }

    return this.label()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.slice(0, 1).toUpperCase())
      .join('');
  });

  onClick(event: MouseEvent): void {
    if (this.interactive() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
