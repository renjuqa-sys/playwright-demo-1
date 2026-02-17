import { test as base } from '@playwright/test';
import { WebLoginPage, WebCataloguePage, WebProductPage } from '@pages/web';
import path from 'path';
import { translate } from '@utils/i118n';
// ... import other pages

type MyFixtures = {
  webLoginPage: WebLoginPage;
  webCataloguePage: WebCataloguePage;
  webProductPage: WebProductPage;

  t: (key: string, count?: number) => string;
};

export const test = base.extend<MyFixtures>({
  storageState: async ({}, use, testInfo) => {
    // This fixture handles authentication state for tests that require it, i.e. those project names that include 'member'. It loads a pre-saved storage state from a file based on the worker index, which allows for parallel test execution with different user accounts.
    if (testInfo.project.name.includes('member')) {
      // Must use the SAME math as the setup
      const shardIndex = process.env.TEST_SHARD_INDEX ? parseInt(process.env.TEST_SHARD_INDEX) : 1;
      const workersPerShard = 2;
      const globalIndex = (shardIndex - 1) * workersPerShard + testInfo.parallelIndex;

      const fileName = `.auth/web-user-${globalIndex}.json`;
      await use(path.join(process.cwd(), fileName));
    }
    // For non-authenticated tests, we simply use an undefined storage state, which means the browser will start without any pre-set cookies or local storage.
    else {
      await use(undefined);
    }
  },
  t: async ({}, use) => {
    await use((key: string, count?: number) => translate(key, count));
  },
  webCataloguePage: async ({ page }, use) => {
    await use(new WebCataloguePage(page));
  },
  webProductPage: async ({ page }, use) => {
    await use(new WebProductPage(page));
  },
  webLoginPage: async ({ page }, use) => {
    await use(new WebLoginPage(page));
  },
});

export { expect } from '@playwright/test';
