import { Component, input, output } from '@angular/core';
import { AvatarComponent, ButtonComponent } from 'components';
import { ProfileSummaryModel } from '../models/domain-ui-models';

export type ProfilePhotoState = 'idle' | 'uploading' | 'removing';

@Component({
  selector: 'lib-profile-summary',
  imports: [AvatarComponent, ButtonComponent],
  templateUrl: './profile-summary.html',
  styleUrl: './profile-summary.scss'
})
export class ProfileSummaryComponent {
  readonly userProfile = input.required<ProfileSummaryModel>();
  readonly photoState = input<ProfilePhotoState>('idle');
  readonly canUploadPhoto = input(true);
  readonly canRemovePhoto = input(true);
  readonly uploadRequested = output<void>();
  readonly photoRemoved = output<void>();
}
