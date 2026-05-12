import { Component, input, output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarComponent } from '../avatar/avatar';

export interface TopAppBarAction {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly badgeCount?: number;
  readonly disabled?: boolean;
}

@Component({
  selector: 'lib-top-app-bar',
  imports: [AvatarComponent, MatBadgeModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './top-app-bar.html',
  styleUrl: './top-app-bar.scss'
})
export class TopAppBarComponent {
  readonly title = input.required<string>();
  readonly brand = input('');
  readonly leadingIcon = input<string | null>(null);
  readonly leadingLabel = input('Menu');
  readonly actions = input<readonly TopAppBarAction[]>([]);
  readonly avatarImageUrl = input<string | null>(null);
  readonly avatarInitials = input('');
  readonly avatarLabel = input('');
  readonly sticky = input(true);
  readonly dense = input(false);
  readonly leadingActionClicked = output<void>();
  readonly toolbarActionClicked = output<string>();
  readonly avatarClicked = output<void>();
}
