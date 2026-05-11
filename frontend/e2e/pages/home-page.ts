import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly signInForm: Locator;

  constructor(private readonly page: Page) {
    this.signInForm = page.locator('form').first();
    this.emailInput = this.signInForm.getByLabel('Email');
    this.passwordInput = this.signInForm.getByLabel('Password');
    this.signInButton = this.signInForm.getByRole('button', { name: 'Sign in' });
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
