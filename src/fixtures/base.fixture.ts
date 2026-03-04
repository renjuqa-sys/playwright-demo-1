import { mergeExpects, mergeTests } from '@playwright/test';
import { test as pageTest, expect as pageExpect } from '@fixtures/pages.fixture';
import { test as utilTest, expect as utilExpect } from '@fixtures/utils.fixtures';

type DebugFixtures = {
  logAuthPath: void;
};
// Merge everything into one super-test and super-expect
export const test = mergeTests(pageTest, utilTest).extend<DebugFixtures>({
  logAuthPath: [
    async ({}, use, testInfo) => {
      // Pull the ACTUAL path assigned to this specific worker project
      const actualPath = testInfo.project.use.storageState;

      // 2. Log it with clear formatting
      if (typeof actualPath === 'string') {
        // eslint-disable-next-line no-console
        console.log(`\x1b[32m[Worker ${testInfo.workerIndex}]\x1b[0m 📁 Active Auth File: ${actualPath}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`\x1b[31m[Worker ${testInfo.workerIndex}]\x1b[0m ⚠️ No storageState found for this project.`);
      }

      await use();
    },
    { auto: true },
  ],
});
export const expect = mergeExpects(pageExpect, utilExpect);
