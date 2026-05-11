import { expect, Page } from '@playwright/test';
import { SignInPage } from './sign-in-page';

export class VisualContractPage {
  constructor(private readonly page: Page) {}

  async signInAsDemo(): Promise<void> {
    const signIn = new SignInPage(this.page);
    await signIn.goto();
    await signIn.signIn('demo@beacon.local', 'Password12345!');
  }

  async expectLoginMatchesMockStructure(): Promise<void> {
    await this.page.goto('/sign-in');
    await expect(this.page.locator('body')).toHaveCSS('font-family', /Roboto Flex|Roboto/);
    await expect(this.page.locator('.auth-shell')).toBeVisible();
    await expect(this.page.locator('.auth-shell')).toHaveCSS('display', 'grid');
    await expect(this.page.locator('.auth-hero')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Kanban that gets out of your way.' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(this.page.getByText('Remember me')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
  }

  async expectAuthenticatedShellMatchesMockStructure(): Promise<void> {
    await expect(this.page.locator('.top-app-bar')).toBeVisible();
    await expect(this.page.locator('.nav-drawer')).toBeVisible();
    await expect(this.page.locator('.top-app-bar')).toHaveCSS('height', '64px');
    await expect(this.page.locator('.nav-drawer')).toHaveCSS('width', '280px');
    await expect(this.page.locator('.app-main')).toHaveCSS('padding-top', '32px');
    await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Notifications' })).toBeVisible();
  }

  async expectBoardsMatchesMockStructure(): Promise<void> {
    await this.page.goto('/boards');
    await expect(this.page.getByRole('heading', { name: 'Boards', exact: true })).toBeVisible();
    await expect(this.page.getByPlaceholder('Search boards, cards, members...')).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Filter/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Sort/ })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Starred' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'All boards' })).toBeVisible();
    await expect(this.page.locator('.board-tile').first()).not.toHaveCSS('background-color', 'rgb(247, 250, 249)');
  }

  async expectBoardMatchesMockStructure(): Promise<void> {
    await this.page.locator('.board-tile a, .boards-page__card a').first().click();
    await expect(this.page.locator('.board-toolbar')).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Board/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Filter/ })).toBeVisible();
    await expect(this.page.locator('.kanban-column').first()).toBeVisible();
    await expect(this.page.locator('.label-pill').first()).toBeVisible();
  }

  async expectCardMatchesMockStructure(): Promise<void> {
    await this.page.locator('.kanban-card a, .kanban-board__card a').first().click();
    await expect(this.page.locator('.card-detail-grid')).toBeVisible();
    await expect(this.page.getByLabel('Breadcrumb').getByRole('link', { name: 'Boards' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Watch/ })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Description' })).toBeVisible();
    await expect(this.page.locator('.side-meta')).toBeVisible();
  }

  async expectSettingsMatchesMockStructure(): Promise<void> {
    await this.page.goto('/settings');
    await expect(this.page.locator('.settings-grid')).toBeVisible();
    await expect(this.page.locator('.settings-nav')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Notifications' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Appearance' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Danger zone' })).toBeVisible();
  }
}
