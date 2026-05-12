import { Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

export type SectionBlockDensity = 'default' | 'compact';

@Component({
  selector: 'lib-section-block',
  imports: [MatDividerModule],
  templateUrl: './section-block.html',
  styleUrl: './section-block.scss'
})
export class SectionBlockComponent {
  readonly heading = input('');
  readonly density = input<SectionBlockDensity>('default');
  readonly divided = input(false);
}
