import { test } from '@playwright/test';
import { VisualContractPage } from './pages/visual-contract-page';

test('desktop pages match the mock structural contract', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  const visual = new VisualContractPage(page);

  await visual.expectLoginMatchesMockStructure();
  await visual.signInAsDemo();
  await visual.expectAuthenticatedShellMatchesMockStructure();
  await visual.expectBoardsMatchesMockStructure();
  await visual.expectBoardMatchesMockStructure();
  await visual.expectCardMatchesMockStructure();
  await visual.expectSettingsMatchesMockStructure();
});

