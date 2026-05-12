import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface BreadcrumbItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'lib-breadcrumb',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class BreadcrumbComponent {
  readonly items = input<readonly BreadcrumbItem[]>([]);
  readonly activeItemId = input<string | null>(null);
  readonly maxVisibleCount = input(4);
  readonly itemSelected = output<string>();

  readonly visibleItems = computed(() => {
    const items = this.items();
    const maxVisibleCount = Math.max(1, this.maxVisibleCount());

    if (items.length <= maxVisibleCount) {
      return items;
    }

    if (maxVisibleCount === 1) {
      return [items[items.length - 1]];
    }

    return [items[0], ...items.slice(-(maxVisibleCount - 1))];
  });

  readonly isTruncated = computed(() => this.visibleItems().length < this.items().length);

  selectItem(item: BreadcrumbItem): void {
    if (!item.disabled) {
      this.itemSelected.emit(item.id);
    }
  }
}
