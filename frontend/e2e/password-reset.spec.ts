import { test } from '@playwright/test';
import { AppShell } from './pages/app-shell';
import { BoardsPage } from './pages/boards-page';
import { SignInPage } from './pages/sign-in-page';
import { createTestUser } from './support/test-users';

test('a local user can reset their password and sign in with the new password', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'reset');
  const newPassword = `${user.password}Reset`;
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);
  const appShell = new AppShell(page);

  await signInPage.goto();
  await signInPage.register(user);
  await boardsPage.expectVisible();
  await appShell.signOut();

  const resetToken = await signInPage.requestResetToken(user.email);
  await signInPage.resetPassword(resetToken, newPassword);
  await signInPage.signIn(user.email, newPassword);

  await boardsPage.expectVisible();
  await appShell.expectSignedInAs(user.displayName);
});
