import { Component, input, output } from '@angular/core';
import { SegmentedChipGroupComponent, SettingsRowComponent, SettingsSectionComponent, SwitchComponent } from 'components';
import { AppearancePreferences, ThemePreference } from '../models/domain-ui-models';

@Component({
  selector: 'lib-appearance-preferences-panel',
  imports: [SegmentedChipGroupComponent, SettingsRowComponent, SettingsSectionComponent, SwitchComponent],
  templateUrl: './appearance-preferences-panel.html',
  styleUrl: './appearance-preferences-panel.scss'
})
export class AppearancePreferencesPanelComponent {
  readonly preferences = input<AppearancePreferences>({
    theme: 'system',
    compactDensity: false
  });
  readonly availableThemes = input<readonly { readonly id: ThemePreference; readonly label: string; readonly icon?: string }[]>([
    { id: 'light', label: 'Light', icon: 'light_mode' },
    { id: 'dark', label: 'Dark', icon: 'dark_mode' },
    { id: 'system', label: 'System', icon: 'contrast' }
  ]);
  readonly saving = input(false);
  readonly themeChanged = output<ThemePreference>();
  readonly densityChanged = output<boolean>();
}
