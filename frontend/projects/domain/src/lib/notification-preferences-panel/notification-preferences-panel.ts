import { Component, input, output } from '@angular/core';
import { SettingsRowComponent, SettingsSectionComponent, SwitchComponent } from 'components';
import { NotificationPreferences } from '../models/domain-ui-models';

export type NotificationPreferenceKey = keyof NotificationPreferences;

@Component({
  selector: 'lib-notification-preferences-panel',
  imports: [SettingsRowComponent, SettingsSectionComponent, SwitchComponent],
  templateUrl: './notification-preferences-panel.html',
  styleUrl: './notification-preferences-panel.scss'
})
export class NotificationPreferencesPanelComponent {
  readonly preferences = input<NotificationPreferences>({
    emailDigest: true,
    mentions: true,
    dueDateReminders: true,
    commentReplies: true
  });
  readonly saving = input(false);
  readonly disabledReasons = input<Partial<Record<NotificationPreferenceKey, string>>>({});
  readonly preferenceToggled = output<{ readonly key: NotificationPreferenceKey; readonly value: boolean }>();

  isDisabled(key: NotificationPreferenceKey): boolean {
    return this.saving() || !!this.disabledReasons()[key];
  }
}
