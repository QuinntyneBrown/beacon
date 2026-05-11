import { TestInfo } from '@playwright/test';

export interface TestUser {
  readonly email: string;
  readonly userName: string;
  readonly displayName: string;
  readonly password: string;
}

export function createTestUser(testInfo: TestInfo, label: string): TestUser {
  const safeLabel = label.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 12) || 'user';
  const suffix = `${Date.now().toString(36)}${testInfo.workerIndex}${testInfo.retry}${Math.random().toString(36).slice(2, 8)}`;
  const userName = `e2e-${label}-${suffix}`.slice(0, 50);

  return {
    email: `beacon.e2e.${safeLabel}.${suffix}@example.test`,
    userName,
    displayName: `E2E ${label} ${suffix}`.slice(0, 96),
    password: `E2ePassword12345!${suffix}`
  };
}
