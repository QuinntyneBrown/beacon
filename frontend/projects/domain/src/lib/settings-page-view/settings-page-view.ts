import { Component, input, output } from '@angular/core';
import { PageHeaderComponent, SnackbarComponent } from 'components';
import {
  AppearancePreferences,
  NotificationPreferences,
  ProfileFormModel,
  ProfileSummaryModel,
  SettingsNavSection
} from '../models/domain-ui-models';
import { AppearancePreferencesPanelComponent } from '../appearance-preferences-panel/appearance-preferences-panel';
import { DangerZonePanelComponent } from '../danger-zone-panel/danger-zone-panel';
import { NotificationPreferenceKey, NotificationPreferencesPanelComponent } from '../notification-preferences-panel/notification-preferences-panel';
import { ProfileSettingsFormComponent, ProfileField } from '../profile-settings-form/profile-settings-form';
import { ProfileSummaryComponent } from '../profile-summary/profile-summary';
import { SettingsNavComponent } from '../settings-nav/settings-nav';

@Component({
  selector: 'lib-settings-page-view',
  imports: [
    AppearancePreferencesPanelComponent,
    DangerZonePanelComponent,
    NotificationPreferencesPanelComponent,
    PageHeaderComponent,
    ProfileSettingsFormComponent,
    ProfileSummaryComponent,
    SettingsNavComponent,
    SnackbarComponent
  ],
  templateUrl: './settings-page-view.html',
  styleUrl: './settings-page-view.scss'
})
export class SettingsPageViewComponent {
  readonly currentUser = input<ProfileSummaryModel | null>(null);
  readonly profileModel = input<ProfileFormModel>({
    displayName: '',
    userName: '',
    email: '',
    bio: ''
  });
  readonly notificationPreferences = input<NotificationPreferences>({
    emailDigest: true,
    mentions: true,
    dueDateReminders: true,
    commentReplies: true
  });
  readonly appearancePreferences = input<AppearancePreferences>({
    theme: 'system',
    compactDensity: false
  });
  readonly workspaceContext = input<string>('');
  readonly activeSection = input('profile');
  readonly loading = input(false);
  readonly errorMessage = input('');
  readonly accountDeletionAvailable = input(true);
  readonly sections = input<readonly SettingsNavSection[]>([
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'billing', label: 'Billing', icon: 'credit_card' }
  ]);
  readonly saveRequested = output<ProfileFormModel>();
  readonly sectionSelected = output<string>();
  readonly profileFieldChanged = output<{ readonly field: ProfileField; readonly value: string }>();
  readonly preferenceChanged = output<{ readonly key: NotificationPreferenceKey | 'theme' | 'compactDensity'; readonly value: string | boolean }>();
  readonly accountDeletionRequested = output<void>();
}
