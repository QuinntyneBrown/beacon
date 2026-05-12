import { expect, Page } from '@playwright/test';
import { expectSuccessfulResponse } from '../support/http';

export class AppShell {
  constructor(private readonly page: Page) {}

  async expectSignedInAs(displayName: string): Promise<void> {
    await expect(this.page.locator('.app__user-name')).toHaveText(displayName);
    await expect(this.page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  }

  async signOut(): Promise<void> {
    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/auth/sign-out') &&
        candidate.request().method() === 'POST'
    );

    await this.page.getByRole('button', { name: 'Sign out' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page).toHaveURL(/\/sign-in$/);
  }
}
