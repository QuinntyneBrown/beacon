import { test } from '@playwright/test';
import { BoardsPage } from './pages/boards-page';
import { SignInPage } from './pages/sign-in-page';
import { createTestUser } from './support/test-users';

test('a user can create a board, move a card, and manage card detail content', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'cards');
  const boardName = `E2E Board ${Date.now()}`;
  const cardTitle = `E2E Card ${Date.now()}`;
  const cardDescription = 'Created from the Playwright board page.';
  const movedColumn = 'In Progress';
  const updatedTitle = `${cardTitle} Updated`;
  const updatedDescription = 'Updated through the card detail page.';
  const checklistText = `Checklist item ${Date.now()}`;
  const commentText = `Comment ${Date.now()}`;
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);

  await signInPage.goto();
  await signInPage.register(user);
  await boardsPage.expectVisible();

  const boardPage = await boardsPage.createBoard(boardName);
  await boardPage.createCard('Backlog', cardTitle, cardDescription);
  await boardPage.moveCard(cardTitle, movedColumn);
  await boardPage.expectCardInColumn(movedColumn, cardTitle);

  const cardPage = await boardPage.openCard(cardTitle);
  await cardPage.updateDetails(updatedTitle, updatedDescription);
  await cardPage.addChecklistItem(checklistText);
  await cardPage.completeChecklistItem(checklistText);
  await cardPage.addComment(commentText);

  await boardsPage.goto();
  await boardsPage.expectBoardVisible(boardName);
  await boardsPage.deleteBoard(boardName);
});
