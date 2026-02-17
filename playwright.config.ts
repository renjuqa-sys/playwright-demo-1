import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { TAGS } from './src/constants/tags';
import path from 'path';

// Initialize dotenv
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // -- The flow is validate-env --> setup (web/mobile) --> tests --> teardown (web/mobile) --
  projects: [
    // ---VALIDATE ENV FILE FIRST ---
    {
      name: 'validate-env',
      testMatch: /validate-env\.setup\.ts/,
    },
    // --- WEB SETUP & TEARDOWN ---
    {
      name: 'setup-web',
      testMatch: /auth.setup.ts/,
      grep: /@web-auth/,
      dependencies: ['validate-env'],
      teardown: 'teardown-web',
    },
    {
      name: 'teardown-web',
      testMatch: /auth.teardown.ts/,
      grep: /@web-cleanup/,
    },

    // --- MOBILE SETUP & TEARDOWN ---
    {
      name: 'setup-mobile',
      testMatch: /auth.setup.ts/,
      grep: /@mobile-auth/,
      dependencies: ['validate-env'],
      teardown: 'teardown-mobile',
    },
    {
      name: 'teardown-mobile',
      testMatch: /auth.teardown.ts/,
      grep: /@mobile-cleanup/,
    },

    // --- 2. WEB REGRESSION ---
    {
      name: 'web-regression-guest',
      testDir: './tests/web',
      // Runs tests that are @regression but NOT @auth
      grep: [new RegExp(TAGS.REGRESSION)],
      grepInvert: [new RegExp(TAGS.AUTH)],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'web-regression-member',
      testDir: './tests/web',
      grep: [new RegExp(TAGS.REGRESSION), new RegExp(TAGS.AUTH)],
      dependencies: ['setup-web'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // --- 3. WEB SMOKE ---
    {
      name: 'web-smoke-guest',
      testDir: './tests/web',
      grep: [new RegExp(TAGS.SMOKE)],
      grepInvert: [new RegExp(TAGS.AUTH)],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'web-smoke-member',
      testDir: './tests/web',
      grep: [new RegExp(TAGS.SMOKE), new RegExp(TAGS.AUTH)],
      dependencies: ['setup-web'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // --- 4. MOBILE REGRESSION ---
    {
      name: 'mobile-regression-guest',
      testDir: './tests/mobile',
      grep: [new RegExp(TAGS.REGRESSION)],
      grepInvert: [new RegExp(TAGS.AUTH)],
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-regression-member',
      testDir: './tests/mobile',
      grep: [new RegExp(TAGS.REGRESSION), new RegExp(TAGS.AUTH)],
      dependencies: ['setup-mobile'],
      use: {
        ...devices['Pixel 7'],
      },
    },

    // --- 5. MOBILE SMOKE ---
    {
      name: 'mobile-smoke-guest',
      testDir: './tests/mobile',
      grep: [new RegExp(TAGS.SMOKE)],
      grepInvert: [new RegExp(TAGS.AUTH)],
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-smoke-member',
      testDir: './tests/mobile',
      grep: [new RegExp(TAGS.SMOKE), new RegExp(TAGS.AUTH)],
      dependencies: ['setup-mobile'],
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],
});
