import { Component } from '@angular/core';
import { ProfilePanelComponent } from 'domain';

@Component({
  selector: 'app-settings-page',
  imports: [ProfilePanelComponent],
  template: `
    <section class="settings-page">
      <header class="settings-page__header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences.</p>
      </header>
      <lib-profile-panel />
    </section>
  `,
  styles: [`
    .settings-page {
      display: flex;
      flex-direction: column;
      gap: var(--beacon-space-5);
      max-width: 48rem;
      margin: 0 auto;
      padding: var(--beacon-space-5) var(--beacon-space-4);
    }
    .settings-page__header h1 {
      margin: 0;
      font: var(--mat-sys-headline-medium);
    }
    .settings-page__header p {
      margin: var(--beacon-space-1) 0 0;
      color: var(--beacon-color-on-surface-variant);
    }
  `]
})
export class SettingsPageComponent {}
