import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AvatarStackComponent, BadgeComponent, IconButtonComponent } from 'components';
import { BoardTileModel } from '../models/domain-ui-models';

@Component({
  selector: 'lib-board-tile',
  imports: [AvatarStackComponent, BadgeComponent, IconButtonComponent, MatCardModule, MatIconModule],
  templateUrl: './board-tile.html',
  styleUrl: './board-tile.scss'
})
export class BoardTileComponent {
  readonly board = input.required<BoardTileModel>();
  readonly loading = input(false);
  readonly openBoard = output<string>();
  readonly favoriteToggled = output<string>();
  readonly contextMenuOpened = output<string>();
}
