import { test as baseTest } from '@playwright/test';
import { WebLoginPage, WebCataloguePage, WebProductPage } from '@pages/web';
import { UtilsFixtures } from '@fixtures/utils.fixtures';

type MyPages = {
  webLoginPage: WebLoginPage;
  webCataloguePage: WebCataloguePage;
  webProductPage: WebProductPage;
};

export const test = baseTest.extend<MyPages & UtilsFixtures>({
  webCataloguePage: async ({ page, t }, use) => {
    await use(new WebCataloguePage(page, t));
  },
  webProductPage: async ({ page, t }, use) => {
    await use(new WebProductPage(page, t));
  },
  webLoginPage: async ({ page, t }, use) => {
    await use(new WebLoginPage(page, t));
  },
});

export { expect } from '@playwright/test';
