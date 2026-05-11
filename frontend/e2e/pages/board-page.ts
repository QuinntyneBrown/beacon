import { expect, Locator, Page } from '@playwright/test';
import { expectSuccessfulResponse } from '../support/http';
import { CardPage } from './card-page';

export class BoardPage {
  constructor(private readonly page: Page) {}

  async expectBoardTitle(name: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name, exact: true }).first()).toBeVisible();
  }

  async createCard(columnName: string, title: string, description: string): Promise<void> {
    const column = this.column(columnName);
    await column.getByLabel('New card title').fill(title);
    await column.getByLabel('Description').fill(description);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/boards/cards') &&
        candidate.request().method() === 'POST'
    );

    await column.getByRole('button', { name: 'Add card' }).click();
    await expectSuccessfulResponse(response);
    await this.expectCardInColumn(columnName, title);
  }

  async moveCard(cardTitle: string, destinationColumnName: string): Promise<void> {
    const card = this.card(cardTitle);
    const destinationList = this.column(destinationColumnName).locator('.kanban-board__card-list');
    await card.scrollIntoViewIfNeeded();
    await destinationList.scrollIntoViewIfNeeded();

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/boards/cards/move') &&
        candidate.request().method() === 'POST'
    );

    const cardBox = await card.boundingBox();
    const destinationBox = await destinationList.boundingBox();
    if (!cardBox || !destinationBox) {
      throw new Error('Unable to calculate card drag coordinates.');
    }

    await this.page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(destinationBox.x + destinationBox.width / 2, destinationBox.y + destinationBox.height / 2, { steps: 20 });
    await this.page.mouse.up();

    await expectSuccessfulResponse(response);
    await this.expectCardInColumn(destinationColumnName, cardTitle);
  }

  async expectCardInColumn(columnName: string, cardTitle: string): Promise<void> {
    await expect(this.column(columnName).getByRole('link', { name: new RegExp(escapeRegExp(cardTitle)) })).toBeVisible();
  }

  async openCard(title: string): Promise<CardPage> {
    await this.card(title).getByRole('link', { name: new RegExp(escapeRegExp(title)) }).click();
    await expect(this.page).toHaveURL(/\/boards\/[0-9a-f-]+\/cards\/[0-9a-f-]+$/);

    const cardPage = new CardPage(this.page);
    await cardPage.expectLoaded(title);
    return cardPage;
  }

  private column(name: string): Locator {
    return this.page.locator('.kanban-board__column').filter({
      has: this.page.getByRole('heading', { name, exact: true })
    });
  }

  private card(title: string): Locator {
    return this.page.locator('.kanban-board__card').filter({ hasText: title }).first();
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
