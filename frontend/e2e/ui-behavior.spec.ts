import { test } from '@playwright/test';
import { BoardsPage } from './pages/boards-page';
import { SignInPage } from './pages/sign-in-page';
import { createTestUser } from './support/test-users';

test('board search filters tiles and new action focuses the create form', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'ui');
  const boardName = `Searchable Board ${Date.now()}`;
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);

  await signInPage.goto();
  await signInPage.register(user);
  await boardsPage.expectVisible();

  await boardsPage.createBoard(boardName);
  await boardsPage.goto();
  await boardsPage.expectBoardVisible(boardName);
  await boardsPage.focusCreateFromNewAction();

  await boardsPage.search('no matching board');
  await boardsPage.expectBoardHidden(boardName);

  await boardsPage.search('Searchable');
  await boardsPage.expectBoardVisible(boardName);

  await boardsPage.deleteBoard(boardName);
});
