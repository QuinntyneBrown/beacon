import { test } from '@playwright/test';
import { HomePage } from './pages/home-page';

test('demo user can sign in and see the seeded Kanban board', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.signInWithDemoAccount();
  await homePage.expectBoardVisible();
});
