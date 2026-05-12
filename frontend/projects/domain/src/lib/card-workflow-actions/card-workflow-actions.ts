import { Component, input, output } from '@angular/core';
import { ButtonComponent, IconButtonComponent } from 'components';
import { CardPermissions } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-workflow-actions',
  imports: [ButtonComponent, IconButtonComponent],
  templateUrl: './card-workflow-actions.html',
  styleUrl: './card-workflow-actions.scss'
})
export class CardWorkflowActionsComponent {
  readonly cardStatus = input('');
  readonly watched = input(false);
  readonly permissions = input<CardPermissions>({});
  readonly busyActionId = input<string | null>(null);
  readonly watchToggled = output<boolean>();
  readonly moveRequested = output<void>();
  readonly markDoneRequested = output<void>();
  readonly shareRequested = output<void>();
  readonly menuActionSelected = output<string>();
}
