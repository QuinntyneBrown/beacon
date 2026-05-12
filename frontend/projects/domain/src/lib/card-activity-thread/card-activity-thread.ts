import { Component, input, output } from '@angular/core';
import { CommentComposerComponent, CommentItemComponent, HistoryListComponent } from 'components';
import { ApiCardComment, CardActivityItem, CardPermissions, DomainAvatar } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-activity-thread',
  imports: [CommentComposerComponent, CommentItemComponent, HistoryListComponent],
  templateUrl: './card-activity-thread.html',
  styleUrl: './card-activity-thread.scss'
})
export class CardActivityThreadComponent {
  readonly activityItems = input<readonly CardActivityItem[]>([]);
  readonly comments = input<readonly ApiCardComment[]>([]);
  readonly currentUser = input<DomainAvatar | null>(null);
  readonly permissions = input<CardPermissions>({});
  readonly submitting = input(false);
  readonly commentSubmitted = output<string>();
  readonly commentActionSelected = output<{ readonly commentId: string; readonly actionId: string }>();
  readonly historyItemSelected = output<string>();
}
