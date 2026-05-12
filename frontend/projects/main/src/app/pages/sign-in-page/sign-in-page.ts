import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignInFormComponent } from 'domain';

@Component({
  selector: 'app-sign-in-page',
  imports: [SignInFormComponent],
  template: `
    <section class="auth-shell">
      <aside class="auth-hero">
        <div class="auth-hero__brand brand">
          <span class="auth-hero__logo logo ico" aria-hidden="true">B</span>
          <span>Beacon</span>
        </div>
        <div class="auth-hero__copy pitch">
          <h1>Kanban that gets out of your way.</h1>
          <p class="sub supporting">Beacon is a radically simple board for small project teams. No bloat. No setup fatigue. Just the columns, cards, and clarity you actually need to ship.</p>
        </div>
        <ul class="auth-hero__features features">
          <li class="feat">
            <span class="ico material-symbols-rounded" aria-hidden="true">bolt</span>
            <div>
              <strong class="title-medium">Fast by default</strong>
              <p class="body-medium">Drag, drop, done. Zero modal madness.</p>
            </div>
          </li>
          <li class="feat">
            <span class="ico material-symbols-rounded" aria-hidden="true">group</span>
            <div>
              <strong class="title-medium">Built for small teams</strong>
              <p class="body-medium">Up to 10 collaborators per board, free forever.</p>
            </div>
          </li>
          <li class="feat">
            <span class="ico material-symbols-rounded" aria-hidden="true">design_services</span>
            <div>
              <strong class="title-medium">Material 3 polish</strong>
              <p class="body-medium">A calm, consistent interface across every device.</p>
            </div>
          </li>
        </ul>
      </aside>

      <div class="auth-shell__form auth-form-wrap">
        <lib-sign-in-form (authenticated)="onAuthenticated()" />
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .auth-shell {
      display: grid;
      min-height: 100vh;
      padding: var(--beacon-space-4);
      background:
        radial-gradient(circle at 10% 10%, rgba(58, 207, 245, 0.3), transparent 18rem),
        linear-gradient(135deg, rgba(181, 241, 245, 0.85), rgba(248, 250, 251, 0.96) 48%, #f3f3f3);
    }

    .auth-hero {
      display: none;
      min-width: 0;
      color: var(--beacon-color-on-surface);
    }

    .auth-hero__brand {
      display: flex;
      align-items: center;
      gap: var(--beacon-space-2);
      font-weight: 800;
    }

    .auth-hero__logo {
      display: inline-grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: var(--beacon-radius-md);
      color: #fff;
      background: linear-gradient(135deg, var(--beacon-color-primary), var(--beacon-color-tertiary));
      box-shadow: var(--beacon-shadow-2);
    }

    .auth-hero__copy {
      max-width: 35rem;
    }

    .auth-hero__copy h1 {
      margin: 0;
      font-size: clamp(3rem, 6vw, 5.75rem);
      line-height: 0.95;
      font-weight: 700;
    }

    .auth-hero__copy p:last-child {
      max-width: 32rem;
      margin: var(--beacon-space-4) 0 0;
      color: var(--beacon-color-on-surface-variant);
      font-size: 1.125rem;
      line-height: 1.6;
    }

    .auth-hero__features {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--beacon-space-3);
      width: min(100%, 54rem);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .auth-hero__features li {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: var(--beacon-space-3);
      padding: var(--beacon-space-4);
      border: 1px solid color-mix(in srgb, var(--beacon-color-outline) 65%, transparent);
      border-radius: var(--beacon-radius-lg);
      background: rgba(248, 250, 251, 0.72);
      box-shadow: var(--beacon-shadow-1);
    }

    .auth-hero__features span {
      font-family: 'Material Icons';
      color: var(--beacon-color-primary);
      font-size: 1.35rem;
    }

    .auth-hero__features strong,
    .auth-hero__features p {
      margin: 0;
    }

    .auth-hero__features p {
      margin-top: var(--beacon-space-1);
      color: var(--beacon-color-on-surface-variant);
      font-size: 0.875rem;
      line-height: 1.45;
    }

    .auth-hero__footer {
      margin: 0;
      color: var(--beacon-color-muted);
      font-size: 0.875rem;
    }

    .auth-shell__form {
      display: grid;
      align-items: center;
      justify-items: center;
      min-width: 0;
    }

    @media (min-width: 56.25rem) {
      .auth-shell {
        grid-template-columns: minmax(0, 1.15fr) minmax(24rem, 28rem);
        gap: clamp(2rem, 5vw, 5rem);
        padding: clamp(2rem, 5vw, 4.5rem);
      }

      .auth-hero {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--beacon-space-6);
      }
    }
  `]
})
export class SignInPageComponent {
  private readonly router = inject(Router);

  onAuthenticated(): void {
    this.router.navigateByUrl('/boards');
  }
}
