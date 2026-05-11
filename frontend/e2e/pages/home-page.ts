import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel('Email').first();
    this.passwordInput = page.getByLabel('Password').first();
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async signInWithDemoAccount(): Promise<void> {
    await this.emailInput.fill('demo@beacon.local');
    await this.passwordInput.fill('Password12345!');
    await this.signInButton.click();
  }

  async expectBoardVisible(): Promise<void> {
    await expect(this.page.getByText('Demo Roadmap')).toBeVisible();
    await expect(this.page.getByText('Build auth flow')).toBeVisible();
  }
}
