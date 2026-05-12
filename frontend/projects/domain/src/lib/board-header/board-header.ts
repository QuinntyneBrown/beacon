import { Component, input, output } from '@angular/core';
import { AvatarStackComponent, ButtonComponent } from 'components';
import { BoardHeaderModel, DomainAvatar } from '../models/domain-ui-models';

@Component({
  selector: 'lib-board-header',
  imports: [AvatarStackComponent, ButtonComponent],
  templateUrl: './board-header.html',
  styleUrl: './board-header.scss'
})
export class BoardHeaderComponent {
  readonly board = input.required<BoardHeaderModel>();
  readonly invitePermission = input(true);
  readonly compact = input(false);
  readonly inviteClicked = output<string>();
  readonly memberOverflowClicked = output<readonly DomainAvatar[]>();
}
