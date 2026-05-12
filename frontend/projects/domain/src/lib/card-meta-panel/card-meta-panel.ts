import { Component, input, output } from '@angular/core';
import { AvatarStackComponent, CardMetaItemComponent, ListItemComponent } from 'components';
import { CardMetaPanelModel, CardPermissions, DomainAvatar, RelatedLink } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-meta-panel',
  imports: [AvatarStackComponent, CardMetaItemComponent, ListItemComponent],
  templateUrl: './card-meta-panel.html',
  styleUrl: './card-meta-panel.scss'
})
export class CardMetaPanelComponent {
  readonly metadata = input<CardMetaPanelModel | null>(null);
  readonly relatedLinks = input<readonly RelatedLink[]>([]);
  readonly assignees = input<readonly DomainAvatar[]>([]);
  readonly reporter = input<DomainAvatar | null>(null);
  readonly permissions = input<CardPermissions>({});
  readonly statusChanged = output<string>();
  readonly assigneeChanged = output<string>();
  readonly dueDateChanged = output<string | null>();
  readonly linkedItemOpened = output<string>();
}
