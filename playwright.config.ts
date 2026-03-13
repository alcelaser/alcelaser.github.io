import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests in each file in parallel; files themselves run in parallel via workers
  fullyParallel: true,

  // Retry once on CI; locally no retries so failures surface immediately
  retries: process.env.CI ? 1 : 0,

  // Limit parallelism to 4 workers so the preview server isn't overwhelmed
  workers: process.env.CI ? 2 : 4,

  // Per-test timeout: 30 s locally, 45 s on CI (GitHub Actions can be slower)
  timeout: process.env.CI ? 45_000 : 30_000,

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  use: {
    baseURL: 'http://localhost:4321',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    // Give navigation a bit more slack
    navigationTimeout: 15_000,
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'mobile-portrait',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'mobile-small',
      use: {
        ...devices['Galaxy S8'],
        viewport: { width: 375, height: 667 },
      },
    },
  ],

  // Boot the preview server before running any tests.
  // `reuseExistingServer: true` lets you run `astro preview` manually first.
  webServer: {
    command: 'npx astro preview --port 4321',
    port: 4321,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
});
