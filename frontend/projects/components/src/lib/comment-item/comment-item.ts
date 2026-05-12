import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AvatarComponent } from '../avatar/avatar';

export interface CommentItemAvatar {
  readonly label: string;
  readonly initials?: string;
  readonly imageUrl?: string | null;
}

export interface CommentItemAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'lib-comment-item',
  imports: [AvatarComponent, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss'
})
export class CommentItemComponent {
  readonly authorDisplay = input.required<string>();
  readonly avatar = input<CommentItemAvatar | null>(null);
  readonly timestamp = input('');
  readonly body = input('');
  readonly actions = input<readonly CommentItemAction[]>([]);
  readonly edited = input(false);
  readonly highlighted = input(false);
  readonly loading = input(false);
  readonly actionSelected = output<string>();
}
