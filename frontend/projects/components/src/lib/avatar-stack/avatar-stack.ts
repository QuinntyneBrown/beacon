import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AvatarComponent, AvatarSize } from '../avatar/avatar';

export interface AvatarStackItem {
  readonly id: string;
  readonly label: string;
  readonly initials?: string;
  readonly imageUrl?: string | null;
  readonly colorToken?: string;
}

@Component({
  selector: 'lib-avatar-stack',
  imports: [AvatarComponent, MatButtonModule],
  templateUrl: './avatar-stack.html',
  styleUrl: './avatar-stack.scss'
})
export class AvatarStackComponent {
  readonly avatars = input<readonly AvatarStackItem[]>([]);
  readonly maxVisibleCount = input(4);
  readonly size = input<AvatarSize>('medium');
  readonly avatarClicked = output<AvatarStackItem>();
  readonly overflowClicked = output<readonly AvatarStackItem[]>();

  readonly visibleAvatars = computed(() => this.avatars().slice(0, Math.max(0, this.maxVisibleCount())));
  readonly overflowAvatars = computed(() => this.avatars().slice(Math.max(0, this.maxVisibleCount())));
  readonly overflowCount = computed(() => this.overflowAvatars().length);

  trackAvatar(_index: number, avatar: AvatarStackItem): string {
    return avatar.id;
  }
}
