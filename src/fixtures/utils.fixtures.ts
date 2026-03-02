import { test as base } from '@playwright/test';
import { translate, type TranslationKey } from '@utils/i18n';
import { ROUTES } from '@constants/routes';
import { TAGS } from '@constants/tags';

export type UtilsFixtures = {
  t: (key: TranslationKey, count?: number) => string;
  routes: typeof ROUTES;
  tags: typeof TAGS;
};

export const test = base.extend<UtilsFixtures>({
  t: async ({}, use) => {
    // This allows you to use 't' directly in tests
    await use((key, count) => translate(key, count));
  },
  routes: async ({}, use) => {
    await use(ROUTES);
  },
  tags: async ({}, use) => {
    await use(TAGS);
  },
});

export { expect } from '@playwright/test';
