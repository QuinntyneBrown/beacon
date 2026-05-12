import { Component, signal } from '@angular/core';
import { PageHeaderComponent, SectionBlockComponent } from 'components';
import {
  AppearancePreferences,
  AppearancePreferencesPanelComponent,
  NotificationPreferenceKey,
  NotificationPreferences,
  NotificationPreferencesPanelComponent,
  ProfilePanelComponent,
  SettingsNavComponent,
  SettingsNavSection,
  ThemePreference
} from 'domain';

@Component({
  selector: 'app-settings-page',
  imports: [
    AppearancePreferencesPanelComponent,
    NotificationPreferencesPanelComponent,
    PageHeaderComponent,
    ProfilePanelComponent,
    SectionBlockComponent,
    SettingsNavComponent
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPageComponent {
  readonly sections: readonly SettingsNavSection[] = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' }
  ];
  readonly activeSection = signal('profile');
  readonly notificationPreferences = signal<NotificationPreferences>({
    emailDigest: this.loadBooleanPreference('emailDigest', true),
    mentions: this.loadBooleanPreference('mentions', true),
    dueDateReminders: this.loadBooleanPreference('dueDateReminders', true),
    commentReplies: this.loadBooleanPreference('commentReplies', true)
  });
  readonly appearancePreferences = signal<AppearancePreferences>({
    theme: this.loadThemePreference(),
    compactDensity: this.loadBooleanPreference('compactDensity', false)
  });

  selectSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    globalThis.document?.getElementById(`settings-${sectionId}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  setNotificationPreference(key: NotificationPreferenceKey, value: boolean): void {
    this.notificationPreferences.update((preferences) => ({ ...preferences, [key]: value }));
    this.storePreference(key, value);
  }

  setThemePreference(theme: ThemePreference): void {
    this.appearancePreferences.update((preferences) => ({ ...preferences, theme }));
    this.storePreference('theme', theme);
  }

  setCompactDensity(value: boolean): void {
    this.appearancePreferences.update((preferences) => ({ ...preferences, compactDensity: value }));
    this.storePreference('compactDensity', value);
  }

  private loadBooleanPreference(key: NotificationPreferenceKey | 'compactDensity', fallback: boolean): boolean {
    const stored = globalThis.localStorage?.getItem(`beacon.settings.${key}`);
    return stored === null || stored === undefined ? fallback : stored === 'true';
  }

  private loadThemePreference(): ThemePreference {
    return globalThis.localStorage?.getItem('beacon.settings.theme') ?? 'system';
  }

  private storePreference(key: NotificationPreferenceKey | 'compactDensity' | 'theme', value: boolean | string): void {
    globalThis.localStorage?.setItem(`beacon.settings.${key}`, String(value));
  }
}
