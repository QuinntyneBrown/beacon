import { Component, computed, input } from '@angular/core';
import { FeatureListItemComponent } from 'components';
import { AuthHeroFeature } from '../models/domain-ui-models';
import { BrandMarkComponent } from '../brand-mark/brand-mark';

@Component({
  selector: 'lib-auth-hero-panel',
  imports: [BrandMarkComponent, FeatureListItemComponent],
  templateUrl: './auth-hero-panel.html',
  styleUrl: './auth-hero-panel.scss'
})
export class AuthHeroPanelComponent {
  private readonly defaultFeatures: readonly AuthHeroFeature[] = [
    { icon: 'bolt', title: 'Fast by default', description: 'Drag, drop, and keep the board moving.' },
    { icon: 'group', title: 'Built for teams', description: 'Shared context without heavy setup.' },
    { icon: 'design_services', title: 'Material polish', description: 'A calm interface across device sizes.' }
  ];

  readonly productHeadline = input('Kanban that gets out of your way.');
  readonly supportingCopy = input(
    'Beacon is a focused board for small project teams: clear columns, lightweight cards, and fewer distractions.'
  );
  readonly featureList = input<readonly AuthHeroFeature[]>([]);
  readonly visibleFeatures = computed(() => (this.featureList().length > 0 ? this.featureList() : this.defaultFeatures));
}
