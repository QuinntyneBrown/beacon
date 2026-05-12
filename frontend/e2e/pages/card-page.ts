import { expect, Page } from '@playwright/test';
import { expectSuccessfulResponse } from '../support/http';

export class CardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(title: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
    await expect(this.page.getByLabel('Title')).toHaveValue(title);
  }

  async updateDetails(title: string, description: string): Promise<void> {
    await this.page.getByLabel('Title').fill(title);
    await this.page.getByLabel('Description').fill(description);

    const response = this.page.waitForResponse(
      (candidate) =>
        /\/api\/cards\/[0-9a-f-]+$/.test(candidate.url()) &&
        candidate.request().method() === 'PUT'
    );

    await this.page.getByRole('button', { name: 'Save changes' }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page.getByText('Card updated.')).toBeVisible();
    await this.expectLoaded(title);
    await expect(this.page.getByLabel('Description')).toHaveValue(description);
  }

  async addChecklistItem(text: string): Promise<void> {
    await this.page.getByLabel('Add item').fill(text);

    const response = this.page.waitForResponse(
      (candidate) =>
        /\/api\/cards\/[0-9a-f-]+\/checklist$/.test(candidate.url()) &&
        candidate.request().method() === 'POST'
    );

    await this.page.locator('.card-page__inline-form').getByRole('button').click();
    await expectSuccessfulResponse(response);
    await expect(this.page.getByRole('checkbox', { name: text })).toBeVisible();
  }

  async completeChecklistItem(text: string): Promise<void> {
    const response = this.page.waitForResponse(
      (candidate) =>
        /\/api\/cards\/[0-9a-f-]+\/checklist\/[0-9a-f-]+$/.test(candidate.url()) &&
        candidate.request().method() === 'PUT'
    );

    await this.page.getByRole('checkbox', { name: text }).check();
    await expectSuccessfulResponse(response);
    await expect(this.page.getByRole('checkbox', { name: text })).toBeChecked();
  }

  async addComment(body: string): Promise<void> {
    await this.page.getByLabel('Add comment').fill(body);

    const response = this.page.waitForResponse(
      (candidate) =>
        /\/api\/cards\/[0-9a-f-]+\/comments$/.test(candidate.url()) &&
        candidate.request().method() === 'POST'
    );

    await this.page.getByRole('button', { name: /Post comment/ }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page.getByText(body)).toBeVisible();
  }
}
