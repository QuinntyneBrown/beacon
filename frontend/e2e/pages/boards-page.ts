import { expect, Page } from '@playwright/test';
import { expectSuccessfulResponse } from '../support/http';
import { BoardPage } from './board-page';

export class BoardsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/boards');
    await this.expectVisible();
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Boards', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Create board/ })).toBeVisible();
    await this.expectMockDetails();
  }

  async expectMockDetails(): Promise<void> {
    await expect(this.page.locator('.top-app-bar.scrolled')).toBeVisible();
    await expect(this.page.locator('.boards-page__header .titles')).toBeVisible();
    await expect(this.page.locator('.boards-page__header .body-medium')).toBeVisible();
    await expect(this.page.locator('.boards-page__chips .chip.selected.active').filter({ hasText: /check\s*All/ })).toBeVisible();
    await expect(this.page.locator('.boards-page__search input[aria-label="Search boards, cards, members..."]')).toBeVisible();
    await expect(this.page.locator('.board-tile .avatar.sm').first()).toBeVisible();
  }

  async expectBoardVisible(name: string): Promise<void> {
    await expect(this.boardCard(name)).toBeVisible();
  }

  async expectBoardHidden(name: string): Promise<void> {
    await expect(this.boardCard(name)).toHaveCount(0);
  }

  async createBoard(name: string): Promise<BoardPage> {
    await this.page.getByLabel('New board name').fill(name);

    const response = this.page.waitForResponse(
      (candidate) =>
        candidate.url().endsWith('/api/boards') &&
        candidate.request().method() === 'POST'
    );

    await this.page.getByRole('button', { name: /Create board/ }).click();
    await expectSuccessfulResponse(response);
    await expect(this.page).toHaveURL(/\/boards\/[0-9a-f-]+$/);

    const boardPage = new BoardPage(this.page);
    await boardPage.expectBoardTitle(name);
    return boardPage;
  }

  async openBoard(name: string): Promise<BoardPage> {
    await this.boardCard(name).getByRole('link', { name: new RegExp(escapeRegExp(name)) }).click();
    await expect(this.page).toHaveURL(/\/boards\/[0-9a-f-]+$/);

    const boardPage = new BoardPage(this.page);
    await boardPage.expectBoardTitle(name);
    return boardPage;
  }

  async deleteBoard(name: string): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());

    const response = this.page.waitForResponse(
      (candidate) =>
        /\/api\/boards\/[0-9a-f-]+$/.test(candidate.url()) &&
        candidate.request().method() === 'DELETE'
    );

    await this.boardCard(name).getByRole('button', { name: 'Delete board' }).click();
    await expectSuccessfulResponse(response);
    await this.expectBoardHidden(name);
  }

  async search(term: string): Promise<void> {
    await this.page.getByPlaceholder('Search boards, cards, members...').fill(term);
  }

  async focusCreateFromNewAction(): Promise<void> {
    await this.page.getByRole('button', { name: 'New', exact: true }).click();
    await expect(this.page.getByLabel('New board name')).toBeFocused();
  }

  private boardCard(name: string) {
    return this.page.locator('.boards-page__card').filter({ hasText: name });
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
