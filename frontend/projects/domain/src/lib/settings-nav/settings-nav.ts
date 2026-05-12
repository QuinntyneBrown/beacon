import { Component, input, output } from '@angular/core';
import { ListItemComponent } from 'components';
import { SettingsNavSection } from '../models/domain-ui-models';

@Component({
  selector: 'lib-settings-nav',
  imports: [ListItemComponent],
  templateUrl: './settings-nav.html',
  styleUrl: './settings-nav.scss'
})
export class SettingsNavComponent {
  readonly sections = input<readonly SettingsNavSection[]>([]);
  readonly activeSection = input<string | null>(null);
  readonly sectionSelected = output<string>();
}
