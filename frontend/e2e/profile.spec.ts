import { test } from '@playwright/test';
import { AppShell } from './pages/app-shell';
import { BoardsPage } from './pages/boards-page';
import { SettingsPage } from './pages/settings-page';
import { SignInPage } from './pages/sign-in-page';
import { createTestUser } from './support/test-users';

test('a signed-in user can update their profile', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'profile');
  const updatedUserName = `${user.userName}-updated`.slice(0, 50);
  const updatedDisplayName = `${user.displayName} Updated`;
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);
  const settingsPage = new SettingsPage(page);
  const appShell = new AppShell(page);

  await signInPage.goto();
  await signInPage.register(user);
  await boardsPage.expectVisible();

  await settingsPage.goto();
  await settingsPage.updateProfile(updatedUserName, updatedDisplayName);
  await appShell.expectSignedInAs(updatedDisplayName);
});

test('a signed-in user can delete their account', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'delete');
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);
  const settingsPage = new SettingsPage(page);

  await signInPage.goto();
  await signInPage.register(user);
  await boardsPage.expectVisible();

  await settingsPage.goto();
  await settingsPage.deleteAccount();
  await signInPage.expectVisible();
});

test('settings preferences persist after reload', async ({ page }, testInfo) => {
  const user = createTestUser(testInfo, 'prefs');
  const signInPage = new SignInPage(page);
  const boardsPage = new BoardsPage(page);
  const settingsPage = new SettingsPage(page);

  await signInPage.goto();
  await signInPage.register(user);
  await boardsPage.expectVisible();

  await settingsPage.goto();
  await settingsPage.setPreferenceAndExpectPersistence('Compact density', true);
});
