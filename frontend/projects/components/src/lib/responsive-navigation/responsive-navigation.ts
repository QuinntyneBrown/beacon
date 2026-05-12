import { Component, computed, input, output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ResponsiveNavigationMode = 'bottom' | 'rail' | 'drawer';

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly badgeCount?: number;
  readonly badgeLabel?: string;
  readonly section?: string;
  readonly disabled?: boolean;
}

interface NavigationSection {
  readonly label: string;
  readonly items: readonly NavigationItem[];
}

@Component({
  selector: 'lib-responsive-navigation',
  imports: [MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './responsive-navigation.html',
  styleUrl: './responsive-navigation.scss'
})
export class ResponsiveNavigationComponent {
  readonly items = input<readonly NavigationItem[]>([]);
  readonly activeItemId = input<string | null>(null);
  readonly mode = input<ResponsiveNavigationMode>('drawer');
  readonly expanded = input(true);
  readonly createActionLabel = input('');
  readonly createActionIcon = input('add');
  readonly ariaLabel = input('Primary navigation');
  readonly itemSelected = output<string>();
  readonly createActionClicked = output<void>();

  readonly sections = computed<readonly NavigationSection[]>(() => {
    const sections = new Map<string, NavigationItem[]>();

    for (const item of this.items()) {
      const section = item.section || '';
      sections.set(section, [...(sections.get(section) ?? []), item]);
    }

    return Array.from(sections.entries()).map(([label, sectionItems]) => ({
      label,
      items: sectionItems
    }));
  });

  isActive(item: NavigationItem): boolean {
    return item.id === this.activeItemId();
  }

  selectItem(item: NavigationItem): void {
    if (!item.disabled) {
      this.itemSelected.emit(item.id);
    }
  }
}
