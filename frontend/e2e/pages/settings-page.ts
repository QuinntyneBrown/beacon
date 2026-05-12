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
    await expect(this.page.locator('.app__user-name')).toHaveText(displayName);
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

  async setPreferenceAndExpectPersistence(name: string, checked: boolean): Promise<void> {
    const checkbox = this.page.getByRole('switch', { name });
    await checkbox.setChecked(checked);
    if (checked) {
      await expect(checkbox).toBeChecked();
    } else {
      await expect(checkbox).not.toBeChecked();
    }

    await this.page.reload();
    await this.expectVisible();
    const reloadedCheckbox = this.page.getByRole('switch', { name });
    if (checked) {
      await expect(reloadedCheckbox).toBeChecked();
    } else {
      await expect(reloadedCheckbox).not.toBeChecked();
    }
  }
}
