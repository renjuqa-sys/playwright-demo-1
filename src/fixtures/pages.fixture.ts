import { test as baseTest } from '@playwright/test';
import { WebLoginPage, WebCataloguePage, WebProductPage } from '@pages/web';

type MyPages = {
  webLoginPage: WebLoginPage;
  webCataloguePage: WebCataloguePage;
  webProductPage: WebProductPage;
};

export const test = baseTest.extend<MyPages>({
  // storageState: async ({}, use, testInfo) => {
  //   // This fixture handles authentication state for tests that require it, i.e. those project names that include 'member'. It loads a pre-saved storage state from a file based on the worker index, which allows for parallel test execution with different user accounts.
  //   if (testInfo.project.name.includes('member')) {
  //     // Get Shard Index (defaults to 1 locally)
  //     const shardIndex = process.env.TEST_SHARD_INDEX ? parseInt(process.env.TEST_SHARD_INDEX) : 1;
  //     // get number of workers per shard  (defaults to 1 locally))
  //     const workersPerShard = testInfo.config.workers || 1;
  //     // calculate global index for user assignment across shards and its workers => (shard - 1) * workers_per_shard + local_worker_index
  //     const globalIndex = (shardIndex - 1) * workersPerShard + testInfo.parallelIndex;

  //     const fileName = `.auth/web-user-${globalIndex}.json`;
  //     await use(path.join(process.cwd(), fileName));
  //   }
  //   // For non-authenticated tests, we simply use an undefined storage state, which means the browser will start without any pre-set cookies or local storage.
  //   else {
  //     await use(undefined);
  //   }
  // },
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
