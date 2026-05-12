import { test } from '@playwright/test';
import { ExpandedMockContractPage } from './pages/expanded-mock-contract-page';

test('expanded pages match remaining mock controls and component coverage', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const visual = new ExpandedMockContractPage(page);

  await visual.expectMockClassAliases();
  await visual.expectExpandedShellContract();
  await visual.expectExpandedBoardsContract();
  await visual.expectExpandedBoardContract();
  await visual.expectExpandedCardContract();
  await visual.expectExpandedSettingsContract();
  await visual.expectComponentsContract();
  await visual.expectExpandedMobileShellContract();
});
