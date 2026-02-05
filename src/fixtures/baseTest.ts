import { test as base } from '@playwright/test';
import { WebHomePage, WebProductDetailsPage, WebSearchResultsPage } from '@pages/web';
import path from 'path';
// ... import other pages

type MyFixtures = {
  webHomePage: WebHomePage;
  webSearchResultsPage: WebSearchResultsPage;
  webProductDetailsPage: WebProductDetailsPage;
};

export const test = base.extend<MyFixtures>({
  storageState: async ({}, use, testInfo) => {
    // This fixture handles authentication state for tests that require it, i.e. those project names that include 'member'. It loads a pre-saved storage state from a file based on the worker index, which allows for parallel test execution with different user accounts.
    if (testInfo.project.name.includes('member')) {
      const index = testInfo.workerIndex;

      // Logic for 2 shards x 2 workers = 4 users
      // This index will be 0 or 1 on each machine
      const fileName = `.auth/web-user-${index}.json`;

      await use(path.join(process.cwd(), fileName));
    }
    // For non-authenticated tests, we simply use an undefined storage state, which means the browser will start without any pre-set cookies or local storage.
    else {
      await use(undefined);
    }
  },
  webHomePage: async ({ page }, use) => {
    await use(new WebHomePage(page));
  },
  webProductDetailsPage: async ({ page }, use) => {
    await use(new WebProductDetailsPage(page));
  },
  webSearchResultsPage: async ({ page }, use) => {
    await use(new WebSearchResultsPage(page));
  },
});

export { expect } from '@playwright/test';
