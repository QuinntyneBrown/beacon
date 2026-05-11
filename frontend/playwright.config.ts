import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'on-first-retry'
  },
  webServer: [
    {
      command: 'dotnet run --project ../backend/src/Beacon.Api/Beacon.Api.csproj --urls http://127.0.0.1:5078',
      cwd: '.',
      url: 'http://127.0.0.1:5078/openapi/v1.json',
      reuseExistingServer: true,
      timeout: 120000
    },
    {
      command: 'npm start -- --host 127.0.0.1 --port 4200',
      cwd: '.',
      url: 'http://127.0.0.1:4200',
      reuseExistingServer: true,
      timeout: 120000
    }
  ]
});
