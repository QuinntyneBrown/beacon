import { Component, input, output } from '@angular/core';
import { AttachmentListItemComponent, IconButtonComponent } from 'components';
import { CardAttachment, CardPermissions } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-attachment-list',
  imports: [AttachmentListItemComponent, IconButtonComponent],
  templateUrl: './card-attachment-list.html',
  styleUrl: './card-attachment-list.scss'
})
export class CardAttachmentListComponent {
  readonly attachments = input<readonly CardAttachment[]>([]);
  readonly permissions = input<CardPermissions>({});
  readonly downloadStates = input<readonly string[]>([]);
  readonly attachmentOpened = output<string>();
  readonly downloadRequested = output<string>();
  readonly attachmentRemoved = output<string>();

  isDownloading(attachmentId: string): boolean {
    return this.downloadStates().includes(attachmentId);
  }
}
