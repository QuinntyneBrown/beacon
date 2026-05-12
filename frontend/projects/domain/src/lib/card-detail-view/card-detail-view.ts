import { Component, computed, input, output } from '@angular/core';
import { BreadcrumbComponent, PageHeaderComponent, SectionBlockComponent, SnackbarComponent } from 'components';
import {
  CardAttachment,
  CardDetailViewModel,
  CardLabel,
  CardMetaPanelModel,
  CardPermissions,
  DomainAvatar
} from '../models/domain-ui-models';
import { CardActivityThreadComponent } from '../card-activity-thread/card-activity-thread';
import { CardAttachmentListComponent } from '../card-attachment-list/card-attachment-list';
import { CardChecklistComponent } from '../card-checklist/card-checklist';
import { CardLabelListComponent } from '../card-label-list/card-label-list';
import { CardMetaPanelComponent } from '../card-meta-panel/card-meta-panel';
import { CardWorkflowActionsComponent } from '../card-workflow-actions/card-workflow-actions';

@Component({
  selector: 'lib-card-detail-view',
  imports: [
    BreadcrumbComponent,
    CardActivityThreadComponent,
    CardAttachmentListComponent,
    CardChecklistComponent,
    CardLabelListComponent,
    CardMetaPanelComponent,
    CardWorkflowActionsComponent,
    PageHeaderComponent,
    SectionBlockComponent,
    SnackbarComponent
  ],
  templateUrl: './card-detail-view.html',
  styleUrl: './card-detail-view.scss'
})
export class CardDetailViewComponent {
  readonly cardId = input<string | null>(null);
  readonly cardDetail = input<CardDetailViewModel | null>(null);
  readonly boardContext = input<{ readonly boardId: string; readonly boardName: string } | null>(null);
  readonly permissions = input<CardPermissions>({});
  readonly labels = input<readonly CardLabel[]>([]);
  readonly attachments = input<readonly CardAttachment[]>([]);
  readonly currentUser = input<DomainAvatar | null>(null);
  readonly loading = input(false);
  readonly saving = input(false);
  readonly errorMessage = input('');
  readonly cardUpdated = output<{ readonly cardId: string; readonly title: string; readonly description: string }>();
  readonly cardMoved = output<string>();
  readonly cardCompleted = output<string>();
  readonly watchToggled = output<boolean>();
  readonly commentAdded = output<string>();
  readonly attachmentDownloaded = output<string>();

  readonly metadata = computed<CardMetaPanelModel | null>(() => {
    const card = this.cardDetail();

    if (!card) {
      return null;
    }

    return (
      card.metadata ?? {
        status: card.completed ? 'done' : 'open',
        columnName: card.columnName,
        dueDateUtc: card.dueDateUtc,
        assignees: []
      }
    );
  });
}
