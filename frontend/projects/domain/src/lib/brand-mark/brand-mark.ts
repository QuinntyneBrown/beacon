import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type BrandMarkSize = 'compact' | 'default' | 'large';
export type BrandMarkColorMode = 'light' | 'dark' | 'contrast';

@Component({
  selector: 'lib-brand-mark',
  imports: [MatIconModule],
  templateUrl: './brand-mark.html',
  styleUrl: './brand-mark.scss'
})
export class BrandMarkComponent {
  readonly size = input<BrandMarkSize>('default');
  readonly colorMode = input<BrandMarkColorMode>('light');
  readonly compact = input(false);
}
