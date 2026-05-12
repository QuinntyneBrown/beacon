import { Component, input, output } from '@angular/core';
import { ButtonComponent, OutlinedTextFieldComponent } from 'components';
import { ProfileFormModel, SaveState } from '../models/domain-ui-models';

export type ProfileField = 'displayName' | 'userName' | 'email' | 'bio';

@Component({
  selector: 'lib-profile-settings-form',
  imports: [ButtonComponent, OutlinedTextFieldComponent],
  templateUrl: './profile-settings-form.html',
  styleUrl: './profile-settings-form.scss'
})
export class ProfileSettingsFormComponent {
  readonly profileFormModel = input<ProfileFormModel>({
    displayName: '',
    userName: '',
    email: '',
    bio: ''
  });
  readonly validationErrors = input<Partial<Record<ProfileField, readonly string[]>>>({});
  readonly savingState = input<SaveState>('clean');
  readonly fieldChanged = output<{ readonly field: ProfileField; readonly value: string }>();
  readonly saveRequested = output<ProfileFormModel>();
  readonly validationSurfaced = output<ProfileField>();

  errorsFor(field: ProfileField): readonly string[] {
    return this.validationErrors()[field] ?? [];
  }

  save(): void {
    this.saveRequested.emit(this.profileFormModel());
  }
}
