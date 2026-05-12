import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BadgeComponent } from '../badge/badge';

@Component({
  selector: 'lib-section-heading',
  imports: [BadgeComponent, MatIconModule],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss'
})
export class SectionHeadingComponent {
  readonly icon = input<string | null>(null);
  readonly title = input.required<string>();
  readonly count = input<number | null>(null);
  readonly compact = input(false);
}
