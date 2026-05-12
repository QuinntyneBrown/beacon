import { Component, input, output } from '@angular/core';
import { ButtonComponent, ChipComponent, LabelPillComponent } from 'components';
import { CardLabel } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-label-list',
  imports: [ButtonComponent, ChipComponent, LabelPillComponent],
  templateUrl: './card-label-list.html',
  styleUrl: './card-label-list.scss'
})
export class CardLabelListComponent {
  readonly labels = input<readonly CardLabel[]>([]);
  readonly editable = input(false);
  readonly labelSelected = output<string>();
  readonly labelRemoved = output<string>();
  readonly editRequested = output<void>();
}
