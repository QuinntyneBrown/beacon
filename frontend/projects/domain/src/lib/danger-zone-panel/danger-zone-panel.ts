import { Component, input, output } from '@angular/core';
import { ButtonComponent, SettingsSectionComponent } from 'components';

export type DangerZoneConfirmationState = 'idle' | 'confirmation-required' | 'deleting' | 'disabled';

@Component({
  selector: 'lib-danger-zone-panel',
  imports: [ButtonComponent, SettingsSectionComponent],
  templateUrl: './danger-zone-panel.html',
  styleUrl: './danger-zone-panel.scss'
})
export class DangerZonePanelComponent {
  readonly accountDeletionAvailable = input(true);
  readonly warningText = input('Deleting your account removes your profile and workspace access.');
  readonly confirmationState = input<DangerZoneConfirmationState>('idle');
  readonly deleteAccountRequested = output<void>();
  readonly confirmationAccepted = output<void>();
  readonly confirmationCanceled = output<void>();
}
