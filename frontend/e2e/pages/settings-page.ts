import { expect, Page } from '@playwright/test';
import { expectSuccessfulResponse } from '../support/http';

export class SettingsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/settings');
    await this.expectVisible();
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Account' })).toBeVisible();
  }

  async updateProfile(userName: string, displayName: string): Promise<void> {
    await this.page.getByLabel('User name').fill(userName);
    await this.page.getByLabel('Display name').fill(displayName);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/profile') &&
        candidate.request().method() === 'PUT'
    );

    await this.page.getByRole('button', { name: 'Save profile' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page.getByText('Profile updated.')).toBeVisible();
    await expect(this.page.getByText(displayName)).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/profile') &&
        candidate.request().method() === 'DELETE'
    );

    await this.page.getByRole('button', { name: 'Delete account' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page).toHaveURL(/\/sign-in$/);
  }
}
