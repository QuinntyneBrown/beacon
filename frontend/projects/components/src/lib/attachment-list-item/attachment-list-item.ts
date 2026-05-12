import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-attachment-list-item',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './attachment-list-item.html',
  styleUrl: './attachment-list-item.scss'
})
export class AttachmentListItemComponent {
  readonly icon = input('insert_drive_file');
  readonly title = input.required<string>();
  readonly metadata = input('');
  readonly actionLabel = input('');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly actionClicked = output<void>();
  readonly rowClicked = output<void>();

  onRowClick(): void {
    if (!this.disabled()) {
      this.rowClicked.emit();
    }
  }

  onActionClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.disabled() && !this.loading()) {
      this.actionClicked.emit();
    }
  }
}
