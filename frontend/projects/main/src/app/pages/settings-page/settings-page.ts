import { Component, signal } from '@angular/core';
import { ProfilePanelComponent } from 'domain';

type PreferenceKey = 'emailNotifications' | 'pushNotifications' | 'compactCards' | 'highContrast';

@Component({
  selector: 'app-settings-page',
  imports: [ProfilePanelComponent],
  template: `
    <section class="settings-page">
      <header class="settings-page__header page-header">
        <div class="titles">
          <p class="page-kicker label">Workspace</p>
          <h1 class="page-title">Settings</h1>
          <p class="page-subtitle body-medium">Manage your profile, workspace, and notifications</p>
        </div>
        <div class="settings-page__header-actions trailing">
          <button type="button" class="settings-page__help icon-btn" aria-label="Help">
            <span class="material-symbols-rounded" aria-hidden="true">help</span>
          </button>
          <button type="button" class="settings-page__save btn btn-filled with-icon">
            <span class="material-symbols-rounded" aria-hidden="true">save</span>
            Save changes
          </button>
        </div>
      </header>

      <div class="settings-grid">
        <nav class="settings-nav card outlined" aria-label="Settings sections">
          <a href="#account" class="list-item is-active active">
            <span class="leading"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">person</span></span></span>
            <span class="meta"><span class="headline">Profile</span></span>
          </a>
          <a href="#notifications" class="list-item">
            <span class="leading"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">notifications</span></span></span>
            <span class="meta"><span class="headline">Notifications</span></span>
          </a>
          <a href="#appearance" class="list-item">
            <span class="leading"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">palette</span></span></span>
            <span class="meta"><span class="headline">Appearance</span></span>
          </a>
          <a href="#workspace" class="list-item">
            <span class="leading"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">workspaces</span></span></span>
            <span class="meta"><span class="headline">Workspace</span></span>
          </a>
          <a href="#security" class="list-item">
            <span class="leading"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">vpn_key</span></span></span>
            <span class="meta"><span class="headline">Security</span></span>
          </a>
          <a href="#billing" class="list-item">
            <span class="leading"><span class="icon-wrap"><span class="material-symbols-rounded" aria-hidden="true">credit_card</span></span></span>
            <span class="meta"><span class="headline">Billing</span></span>
          </a>
        </nav>

        <div class="settings-page__content">
          <section id="account" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title title-medium"><span class="material-symbols-rounded" aria-hidden="true">person</span>Profile</h2>
              <span class="label-pill">Profile</span>
            </div>
            <lib-profile-panel />
            <div class="settings-page__profile-extra">
              <label class="text-field outlined">
                <span class="field">
                  <input aria-label="Email" type="email" value="demo@beacon.local" />
                  <span class="floating-label">Email</span>
                </span>
                <span class="supporting">Used for sign-in and notifications.</span>
              </label>
              <label class="text-field outlined">
                <span class="field">
                  <textarea aria-label="Bio" rows="3">Engineer working on the Beacon kanban experience. Coffee, kayaks, kanban.</textarea>
                  <span class="floating-label">Bio</span>
                </span>
              </label>
              <p class="settings-page__supporting">Engineer working on the Beacon kanban experience.</p>
            </div>
          </section>

          <section id="notifications" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title title-medium"><span class="material-symbols-rounded" aria-hidden="true">notifications</span>Notifications</h2>
              <span class="label-pill">Synced locally</span>
            </div>
            <div class="settings-page__option settings-row">
              <div class="meta">
                <div class="headline">Email digest</div>
                <p class="supporting">A weekly summary of board activity, sent Monday morning.</p>
              </div>
              <label class="settings-page__switch switch">
                <input
                  type="checkbox"
                  aria-label="Email updates"
                  [checked]="preference('emailNotifications')"
                  (change)="setPreference('emailNotifications', $any($event.target).checked)" />
                <span class="track"><span class="thumb"></span></span>
              </label>
            </div>
            <div class="settings-page__option settings-row">
              <div class="meta">
                <div class="headline">Mentions and assignments</div>
                <p class="supporting">Push notifications when you're @mentioned or assigned a card.</p>
              </div>
              <label class="settings-page__switch switch">
                <input
                  type="checkbox"
                  aria-label="Push notifications"
                  [checked]="preference('pushNotifications')"
                  (change)="setPreference('pushNotifications', $any($event.target).checked)" />
                <span class="track"><span class="thumb"></span></span>
              </label>
            </div>
          </section>

          <section id="appearance" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title title-medium"><span class="material-symbols-rounded" aria-hidden="true">palette</span>Appearance</h2>
              <span class="label-pill">Device ready</span>
            </div>
            <div class="settings-page__segmented" aria-label="Theme">
              <button type="button" class="chip is-active active selected" aria-label="Light">
                <span class="material-symbols-rounded" aria-hidden="true">light_mode</span>
                Light
              </button>
              <button type="button" class="chip" aria-label="Dark">
                <span class="material-symbols-rounded" aria-hidden="true">dark_mode</span>
                Dark
              </button>
              <button type="button" class="chip" aria-label="System">
                <span class="material-symbols-rounded" aria-hidden="true">contrast</span>
                System
              </button>
            </div>
            <div class="settings-page__option settings-row">
              <div class="meta">
                <div class="headline">Compact density</div>
                <p class="supporting">Show more cards per column on large screens.</p>
              </div>
              <label class="settings-page__switch switch">
                <input
                  type="checkbox"
                  aria-label="Compact cards"
                  [checked]="preference('compactCards')"
                  (change)="setPreference('compactCards', $any($event.target).checked)" />
                <span class="track"><span class="thumb"></span></span>
              </label>
            </div>
            <div class="settings-page__option settings-row">
              <div class="meta">
                <div class="headline">High contrast</div>
                <p class="supporting">Increase outlines and label contrast.</p>
              </div>
              <label class="settings-page__switch switch">
                <input
                  type="checkbox"
                  aria-label="High contrast"
                  [checked]="preference('highContrast')"
                  (change)="setPreference('highContrast', $any($event.target).checked)" />
                <span class="track"><span class="thumb"></span></span>
              </label>
            </div>
          </section>

          <section id="security" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title title-medium"><span class="material-symbols-rounded" aria-hidden="true">shield</span>Security</h2>
              <span class="label-pill">Protected</span>
            </div>
            <p class="settings-page__supporting">Manage sessions, recovery options, and workspace access.</p>
          </section>

          <section id="billing" class="section-block settings-page__section">
            <div class="settings-page__section-heading">
              <h2 class="section-title title-medium"><span class="material-symbols-rounded" aria-hidden="true">receipt_long</span>Billing</h2>
              <span class="label-pill">Workspace</span>
            </div>
            <p class="settings-page__supporting">Plan details and invoices appear here for paid workspaces.</p>
          </section>

          <section id="danger" class="section-block settings-page__section settings-page__section--danger">
            <div class="settings-page__section-heading">
              <h2 class="section-title title-medium"><span class="material-symbols-rounded" aria-hidden="true">warning</span>Danger zone</h2>
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
      display: inline-flex;
      align-items: center;
      gap: var(--beacon-space-2);
      min-height: 2.5rem;
      border: 0;
      border-radius: 999px;
      padding: 0 var(--beacon-space-4);
      color: #fff;
      background: var(--beacon-color-primary);
      font-weight: 700;
      cursor: pointer;
    }

    .settings-page__header-actions {
      display: flex;
      gap: var(--beacon-space-2);
      flex-wrap: wrap;
    }

    .settings-page__help {
      display: inline-grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      min-height: 2.5rem;
      border: 1px solid var(--beacon-color-outline);
      border-radius: 50%;
      padding: 0;
      color: var(--beacon-color-primary);
      background: transparent;
      cursor: pointer;
    }

    .settings-page__header .titles {
      min-width: 0;
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

    .settings-nav .list-item {
      display: flex;
      align-items: center;
      gap: var(--beacon-space-3);
      flex: 0 0 auto;
      min-height: 2.5rem;
      border-radius: 999px;
      padding: 0.65rem var(--beacon-space-3);
      color: var(--beacon-color-on-surface-variant);
      font-weight: 650;
      text-decoration: none;
    }

    .settings-nav .is-active,
    .settings-nav .list-item:hover {
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-primary-container);
    }

    .settings-nav .leading,
    .settings-nav .icon-wrap {
      display: inline-grid;
      place-items: center;
    }

    .settings-nav .icon-wrap {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }

    .settings-nav .headline {
      font-weight: 650;
    }

    .settings-page__content {
      display: grid;
      gap: var(--beacon-space-4);
      min-width: 0;
    }

    .settings-page__profile-extra {
      display: grid;
      gap: var(--beacon-space-3);
      padding-top: var(--beacon-space-2);
      border-top: 1px solid color-mix(in srgb, var(--beacon-color-outline) 55%, transparent);
    }

    .settings-page__profile-extra label {
      display: grid;
      gap: 0.25rem;
      color: var(--beacon-color-on-surface-variant);
      font-size: 0.8125rem;
      font-weight: 650;
    }

    .settings-page .text-field.outlined .field {
      position: relative;
      display: block;
    }

    .settings-page__profile-extra input,
    .settings-page__profile-extra textarea {
      width: 100%;
      border: 1px solid var(--beacon-color-outline);
      border-radius: var(--beacon-radius-sm);
      padding: 1.35rem var(--beacon-space-3) var(--beacon-space-2);
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-surface);
      font: inherit;
    }

    .settings-page .floating-label {
      position: absolute;
      top: 0.35rem;
      left: var(--beacon-space-3);
      color: var(--beacon-color-primary);
      font-size: 0.75rem;
      line-height: 1;
      pointer-events: none;
    }

    .settings-page .supporting {
      color: var(--beacon-color-on-surface-variant);
      font-size: 0.8125rem;
      line-height: 1.35;
    }

    .settings-page__segmented {
      display: flex;
      gap: var(--beacon-space-2);
      width: fit-content;
      flex-wrap: wrap;
      margin-bottom: var(--beacon-space-4);
    }

    .settings-page__segmented button {
      display: inline-flex;
      align-items: center;
      gap: var(--beacon-space-2);
      min-height: 2.5rem;
      border: 1px solid var(--beacon-color-outline);
      border-radius: 999px;
      padding: 0 var(--beacon-space-4);
      color: var(--beacon-color-primary);
      background: transparent;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .settings-page__segmented .is-active {
      color: var(--beacon-color-on-surface);
      background: var(--beacon-color-primary-container);
    }

    .settings-row .headline {
      color: var(--beacon-color-on-surface);
      font-weight: 700;
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

    .settings-page__section-heading h2 {
      display: inline-flex;
      align-items: center;
      gap: var(--beacon-space-2);
    }

    .settings-page__section-heading .material-symbols-rounded {
      color: var(--beacon-color-primary);
      font-size: 1.25rem;
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
    .settings-page__section--danger p,
    .settings-page__supporting {
      margin-top: 0.25rem;
      color: var(--beacon-color-on-surface-variant);
    }

    .settings-page__supporting {
      margin-bottom: 0;
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

    .settings-page__switch .track {
      width: 100%;
      border-radius: 999px;
      background: var(--beacon-color-surface-container-highest);
      transition: background 160ms ease;
    }

    .settings-page__switch .thumb {
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

    .settings-page__switch input:checked + .track {
      background: var(--beacon-color-primary);
    }

    .settings-page__switch input:checked + .track .thumb {
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
