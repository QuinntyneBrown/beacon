import { expect, Page } from '@playwright/test';
import { expectSuccessfulResponse } from '../support/http';
import { TestUser } from '../support/test-users';

export class SignInPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/sign-in');
    await this.expectVisible();
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await this.expectDefaultMockControls();
  }

  async expectDefaultMockControls(): Promise<void> {
    const authCardButtons = this.page.locator('.auth-card button');
    await expect(authCardButtons).toHaveCount(3);
    await expect(authCardButtons.nth(0)).toHaveAccessibleName('Sign in');
    await expect(authCardButtons.nth(1)).toHaveAccessibleName('Google');
    await expect(authCardButtons.nth(2)).toHaveAccessibleName('GitHub');
    await expect(this.page.locator('.auth-card input')).toHaveCount(2);
    await expect(this.page.locator('.auth-card .row-between')).toBeVisible();
    await expect(this.page.locator('.auth-card .floating-label').filter({ hasText: 'Email address' })).toBeVisible();
    await expect(this.page.locator('.auth-card .text-field.focused')).toBeVisible();
    await expect(this.page.locator('.auth-hero .title-medium').first()).toBeVisible();
    await expect(this.page.locator('.auth-hero .body-medium').first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Register' })).toHaveCount(0);
    await expect(this.page.getByRole('button', { name: 'Reset password' })).toHaveCount(0);
    await expect(this.page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Create an account' })).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.switchToSignIn();
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/auth/sign-in') &&
        candidate.request().method() === 'POST'
    );

    await this.activeForm().getByRole('button', { name: 'Sign in' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page).toHaveURL(/\/boards$/);
  }

  async signInExpectingError(email: string, password: string, message: string): Promise<void> {
    await this.switchToSignIn();
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/auth/sign-in') &&
        candidate.request().method() === 'POST'
    );

    await this.activeForm().getByRole('button', { name: 'Sign in' }).click();
    expect((await response).status()).toBe(401);
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async register(user: TestUser): Promise<void> {
    await this.page.getByRole('link', { name: 'Create an account' }).click();
    await expect(this.activeForm().getByRole('button', { name: 'Create account' })).toBeVisible();
    await this.activeForm().getByLabel('Email').fill(user.email);
    await this.activeForm().getByLabel('User name').fill(user.userName);
    await this.activeForm().getByLabel('Display name').fill(user.displayName);
    await this.activeForm().getByLabel('Password').fill(user.password);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/auth/register') &&
        candidate.request().method() === 'POST'
    );

    await this.page.getByRole('button', { name: 'Create account' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page).toHaveURL(/\/boards$/);
  }

  async requestResetToken(email: string): Promise<string> {
    await this.page.getByRole('link', { name: 'Forgot password?' }).click();
    await expect(this.activeForm().getByRole('button', { name: 'Request reset token' })).toBeVisible();
    await this.activeForm().getByLabel('Email').fill(email);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/auth/request-password-reset') &&
        candidate.request().method() === 'POST'
    );

    await this.activeForm().getByRole('button', { name: 'Request reset token' }).click();
    await expectSuccessfulResponse(response);

    const helper = this.page.locator('.sign-in-form__helper');
    await expect(helper).toContainText('Development reset token:');
    const text = (await helper.textContent()) ?? '';
    return text.replace('Development reset token:', '').trim();
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    await this.page.getByLabel('Reset token').fill(resetToken);
    await this.page.getByLabel('New password').fill(newPassword);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/auth/reset-password') &&
        candidate.request().method() === 'POST'
    );

    await this.activeForm().getByRole('button', { name: 'Reset password' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page.getByText('Password updated. Sign in with the new password.')).toBeVisible();
  }

  private async switchToSignIn(): Promise<void> {
    if (await this.activeForm().getByRole('button', { name: 'Sign in' }).isVisible()) {
      return;
    }
    await this.page.getByRole('link', { name: 'Sign in' }).click();
  }

  private activeForm() {
    return this.page.locator('form.sign-in-form__panel');
  }
}
