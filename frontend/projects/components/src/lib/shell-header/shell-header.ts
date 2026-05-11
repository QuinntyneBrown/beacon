import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-shell-header',
  imports: [CommonModule, MatButtonModule, MatChipsModule, MatToolbarModule],
  templateUrl: './shell-header.html',
  styleUrl: './shell-header.scss'
})
export class ShellHeaderComponent {
  readonly title = input.required<string>();
  readonly displayName = input('');
  readonly roles = input<readonly string[]>([]);
  readonly isAuthenticated = input(false);
  readonly signOutRequested = output<void>();
}
