import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppShellComponent, ButtonComponent, NavigationItem, TopAppBarComponent } from 'components';
import { SESSION_SERVICE } from 'domain';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent, ButtonComponent, RouterOutlet, TopAppBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly session = inject(SESSION_SERVICE).session;
  readonly navigationItems: readonly NavigationItem[] = [
    { id: 'boards', label: 'Boards', icon: 'dashboard', section: 'Workspace' },
    { id: 'settings', label: 'Settings', icon: 'tune', section: 'Workspace' }
  ];

  private readonly sessionService = inject(SESSION_SERVICE);
  private readonly router = inject(Router);

  signOut(): void {
    this.sessionService.signOut().subscribe(() => this.router.navigateByUrl('/sign-in'));
  }

  createActionLabel(): string {
    return /^\/boards\/[^/]+/.test(this.router.url) ? 'New card' : 'New board';
  }

  activeNavigationId(): string {
    return this.router.url.startsWith('/settings') ? 'settings' : 'boards';
  }

  navigateTo(itemId: string): void {
    if (itemId === 'settings') {
      this.router.navigateByUrl('/settings');
      return;
    }

    this.router.navigateByUrl('/boards');
  }

  handleCreateAction(): void {
    this.router.navigateByUrl('/boards');
  }
}
