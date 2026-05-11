import { test } from '@playwright/test';
import { AppShell } from './pages/app-shell';
import { BoardsPage } from './pages/boards-page';
import { SignInPage } from './pages/sign-in-page';
import { createTestUser } from './support/test-users';

test('private routes redirect to sign-in and local auth supports register, sign-out, and sign-in', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'auth');
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);
  const appShell = new AppShell(page);

  await page.goto('/boards');
  await signInPage.expectVisible();

  await signInPage.register(user);
  await boardsPage.expectVisible();
  await appShell.expectSignedInAs(user.displayName);

  await appShell.signOut();
  await signInPage.expectVisible();

  await signInPage.signIn(user.email, user.password);
  await boardsPage.expectVisible();
  await appShell.expectSignedInAs(user.displayName);
});

test('invalid sign-in shows the backend credential error', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.goto();
  await signInPage.signInExpectingError('missing-user@example.test', 'WrongPassword123!', 'Invalid credentials.');
});
