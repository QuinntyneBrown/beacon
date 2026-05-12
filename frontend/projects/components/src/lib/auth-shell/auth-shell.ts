import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export type AuthShellBreakpointMode = 'auto' | 'one-column' | 'split';

@Component({
  selector: 'lib-auth-shell',
  imports: [MatCardModule],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.scss'
})
export class AuthShellComponent {
  readonly breakpointMode = input<AuthShellBreakpointMode>('auto');
}
