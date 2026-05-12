import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from 'components';

@Component({
  selector: 'lib-create-board-tile',
  imports: [ButtonComponent, MatCardModule, MatIconModule],
  templateUrl: './create-board-tile.html',
  styleUrl: './create-board-tile.scss'
})
export class CreateBoardTileComponent {
  readonly creationAvailable = input(true);
  readonly disabledReason = input('');
  readonly templateHints = input<readonly string[]>([]);
  readonly loading = input(false);
  readonly createBoardRequested = output<void>();
}
