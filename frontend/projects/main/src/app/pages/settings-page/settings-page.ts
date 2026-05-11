import { Component, signal } from '@angular/core';
import { ProfilePanelComponent } from 'domain';

type PreferenceKey = 'emailNotifications' | 'pushNotifications' | 'compactCards' | 'highContrast';

@Component({
  selector: 'app-settings-page',
  imports: [ProfilePanelComponent],
  template: `
    <section class="settings-page">
      <header class="settings-page__header page-header">
        <div>
          <p class="page-kicker">Workspace</p>
          <h1 class="page-title">Settings</h1>
          <p class="page-subtitle">Manage account details and workspace preferences.</p>
        </div>
        <button type="button" class="settings-page__save">Save changes</button>
      </header>

      <div class="settings-grid">
        <nav class="settings-nav" aria-label="Settings sections">
          <a href="#account" class="is-active">Account</a>
          <a href="#notifications">Notifications</a>
          <a href="#appearance">Appearance</a>
          <a href="#danger">Danger zone</a>
        </nav>

        <div class="settings-page__content">
          <section id="account" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title">Profile</h2>
              <span class="label-pill">Profile</span>
            </div>
            <lib-profile-panel />
          </section>

          <section id="notifications" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title">Notifications</h2>
              <span class="label-pill">Synced locally</span>
            </div>
            <div class="settings-page__option">
              <div>
                <strong>Email updates</strong>
                <p>Card assignments, mentions, and board activity.</p>
              </div>
              <label class="settings-page__switch">
                <input
                  type="checkbox"
                  aria-label="Email updates"
                  [checked]="preference('emailNotifications')"
                  (change)="setPreference('emailNotifications', $any($event.target).checked)" />
                <span></span>
              </label>
            </div>
            <div class="settings-page__option">
              <div>
                <strong>Push notifications</strong>
                <p>Browser alerts for urgent board updates.</p>
              </div>
              <label class="settings-page__switch">
                <input
                  type="checkbox"
                  aria-label="Push notifications"
                  [checked]="preference('pushNotifications')"
                  (change)="setPreference('pushNotifications', $any($event.target).checked)" />
                <span></span>
              </label>
            </div>
          </section>

          <section id="appearance" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title">Appearance</h2>
              <span class="label-pill">Device ready</span>
            </div>
            <div class="settings-page__option">
              <div>
                <strong>Compact cards</strong>
                <p>Reduce card spacing on dense boards.</p>
              </div>
              <label class="settings-page__switch">
                <input
                  type="checkbox"
                  aria-label="Compact cards"
                  [checked]="preference('compactCards')"
                  (change)="setPreference('compactCards', $any($event.target).checked)" />
                <span></span>
              </label>
            </div>
            <div class="settings-page__option">
              <div>
                <strong>High contrast</strong>
                <p>Increase outlines and label contrast.</p>
              </div>
              <label class="settings-page__switch">
                <input
                  type="checkbox"
                  aria-label="High contrast"
                  [checked]="preference('highContrast')"
                  (change)="setPreference('highContrast', $any($event.target).checked)" />
                <span></span>
              </label>
            </div>
          </section>

          <section id="danger" class="section-block settings-page__section settings-page__section--danger">
            <div class="settings-page__section-heading">
              <h2 class="section-title">Danger zone</h2>
              <span class="label-pill">Irreversible</span>
            </div>
            <p>Account deletion is available from the Account panel after confirmation.</p>
          </section>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .settings-page {
      display: grid;
      gap: var(--beacon-space-5);
      max-width: 76rem;
      margin: 0 auto;
    }

    .settings-page__save {
      min-height: 2.5rem;
      border: 0;
      border-radius: 999px;
      padding: 0 var(--beacon-space-4);
      color: #fff;
      background: var(--beacon-color-primary);
      font-weight: 700;
      cursor: pointer;
    }

    .settings-grid {
      display: grid;
      gap: var(--beacon-space-4);
    }

    .settings-nav {
      display: flex;
      gap: var(--beacon-space-2);
      overflow-x: auto;
      padding: var(--beacon-space-2);
      border: 1px solid color-mix(in srgb, var(--beacon-color-outline) 70%, transparent);
      border-radius: var(--beacon-radius-lg);
      background: var(--beacon-color-surface);
      box-shadow: var(--beacon-shadow-1);
    }

    .settings-nav a {
      flex: 0 0 auto;
      min-height: 2.5rem;
      border-radius: 999px;
      padding: 0.65rem var(--beacon-space-3);
      color: var(--beacon-color-on-surface-variant);
      font-weight: 650;
      text-decoration: none;
    }

    .settings-nav .is-active,
    .settings-nav a:hover {
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-primary-container);
    }

    .settings-page__content {
      display: grid;
      gap: var(--beacon-space-4);
      min-width: 0;
    }

    .settings-page__section {
      min-width: 0;
    }

    .settings-page__section-heading,
    .settings-page__option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--beacon-space-4);
    }

    .settings-page__option {
      padding-block: var(--beacon-space-2);
      border-top: 1px solid color-mix(in srgb, var(--beacon-color-outline) 55%, transparent);
    }

    .settings-page__option:first-of-type {
      border-top: 0;
    }

    .settings-page__option strong,
    .settings-page__option p,
    .settings-page__section--danger p {
      margin: 0;
    }

    .settings-page__option p,
    .settings-page__section--danger p {
      margin-top: 0.25rem;
      color: var(--beacon-color-on-surface-variant);
    }

    .settings-page__switch {
      position: relative;
      display: inline-flex;
      flex: 0 0 auto;
      width: 3.25rem;
      height: 2rem;
      cursor: pointer;
    }

    .settings-page__switch input {
      position: absolute;
      opacity: 0;
    }

    .settings-page__switch span {
      width: 100%;
      border-radius: 999px;
      background: var(--beacon-color-surface-container-highest);
      transition: background 160ms ease;
    }

    .settings-page__switch span::after {
      content: '';
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: #fff;
      box-shadow: var(--beacon-shadow-1);
      transition: transform 160ms ease;
    }

    .settings-page__switch input:checked + span {
      background: var(--beacon-color-primary);
    }

    .settings-page__switch input:checked + span::after {
      transform: translateX(1.25rem);
    }

    .settings-page__section--danger {
      border-color: color-mix(in srgb, var(--beacon-color-danger) 34%, var(--beacon-color-outline));
      background: color-mix(in srgb, var(--beacon-color-danger-container) 32%, var(--beacon-color-surface));
    }

    @media (min-width: 58rem) {
      .settings-grid {
        grid-template-columns: 14rem minmax(0, 1fr);
        align-items: start;
      }

      .settings-nav {
        position: sticky;
        top: 5rem;
        display: grid;
      }
    }
  `]
})
export class SettingsPageComponent {
  private readonly preferences = signal<Record<PreferenceKey, boolean>>({
    emailNotifications: this.loadPreference('emailNotifications', true),
    pushNotifications: this.loadPreference('pushNotifications', false),
    compactCards: this.loadPreference('compactCards', false),
    highContrast: this.loadPreference('highContrast', false)
  });

  preference(key: PreferenceKey): boolean {
    return this.preferences()[key];
  }

  setPreference(key: PreferenceKey, value: boolean): void {
    this.preferences.update((preferences) => ({ ...preferences, [key]: value }));
    globalThis.localStorage?.setItem(`beacon.settings.${key}`, String(value));
  }

  private loadPreference(key: PreferenceKey, fallback: boolean): boolean {
    const stored = globalThis.localStorage?.getItem(`beacon.settings.${key}`);
    return stored === null || stored === undefined ? fallback : stored === 'true';
  }
}
