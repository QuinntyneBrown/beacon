import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignInFormComponent } from 'domain';

@Component({
  selector: 'app-sign-in-page',
  imports: [SignInFormComponent],
  template: `
    <section class="sign-in-page">
      <lib-sign-in-form (authenticated)="onAuthenticated()" />
    </section>
  `,
  styles: [`
    .sign-in-page {
      display: flex;
      justify-content: center;
      padding: var(--beacon-space-6) var(--beacon-space-4);
      min-height: 100%;
    }
  `]
})
export class SignInPageComponent {
  private readonly router = inject(Router);

  onAuthenticated(): void {
    this.router.navigateByUrl('/boards');
  }
}
