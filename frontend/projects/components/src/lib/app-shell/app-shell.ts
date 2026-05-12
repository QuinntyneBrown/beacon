import { Component, input, output } from '@angular/core';
import {
  NavigationItem,
  ResponsiveNavigationComponent,
  ResponsiveNavigationMode
} from '../responsive-navigation/responsive-navigation';

export type AppShellBreakpointMode = 'auto' | 'mobile' | 'tablet' | 'desktop';

@Component({
  selector: 'lib-app-shell',
  imports: [ResponsiveNavigationComponent],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss'
})
export class AppShellComponent {
  readonly navigationItems = input<readonly NavigationItem[]>([]);
  readonly activeItemId = input<string | null>(null);
  readonly breakpointMode = input<AppShellBreakpointMode>('auto');
  readonly navigationExpanded = input(true);
  readonly createActionLabel = input('');
  readonly createActionIcon = input('add');
  readonly contentLabel = input('Main content');
  readonly navigationItemSelected = output<string>();
  readonly menuToggled = output<void>();
  readonly createActionClicked = output<void>();

  navigationModeForViewport(mode: ResponsiveNavigationMode): ResponsiveNavigationMode {
    return mode;
  }
}
