import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellHeaderComponent } from 'components';
import { SESSION_SERVICE } from 'domain';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShellHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly session = inject(SESSION_SERVICE).session;

  private readonly sessionService = inject(SESSION_SERVICE);

  signOut(): void {
    this.sessionService.signOut().subscribe();
  }
}
