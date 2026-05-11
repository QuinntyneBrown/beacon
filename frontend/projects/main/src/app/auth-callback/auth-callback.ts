import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SESSION_SERVICE } from 'domain';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.scss'
})
export class AuthCallbackComponent {
  readonly errorMessage = signal('');

  private readonly sessionService = inject(SESSION_SERVICE);
  private readonly router = inject(Router);

  constructor() {
    void this.completeSignIn();
  }

  private async completeSignIn(): Promise<void> {
    try {
      await this.sessionService.completeOidcSignIn(globalThis.location.search);
      await this.router.navigateByUrl('/');
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : 'OIDC sign-in failed.');
    }
  }
}
