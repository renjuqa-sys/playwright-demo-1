import { test as baseTest } from '@playwright/test';
import { translate, type TranslationKey } from '@utils/i18n';
import { ROUTES } from '@constants/routes';
import { TAGS } from '@constants/tags';

export type UtilsFixtures = {
  t: (key: TranslationKey, count?: number) => string;
  routes: typeof ROUTES;
  tags: typeof TAGS;
};

export const test = baseTest.extend<UtilsFixtures>({
  t: async ({}, use) => {
    // Determine the locale once per test context
    const locale = process.env.APP_LOCALE || 'en';
    // Inject a version of 't' that is ALREADY locked to this locale and count parameters
    await use((key, count) => translate(key, locale, count));
  },
  routes: async ({}, use) => {
    await use(ROUTES);
  },
  tags: async ({}, use) => {
    await use(TAGS);
  },
});

export { expect } from '@playwright/test';
