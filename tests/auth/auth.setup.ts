import { test as setup } from '@fixtures/baseTest';
import { getCredentialForWorker } from '../../src/utils/user-manager';
import path from 'path';

const MAX_WORKERS = 4; // Number of unique accounts per platform

// --- WEB SETUP ---
for (let i = 0; i < MAX_WORKERS; i++) {
  setup(
    `authenticate web user ${i}`,
    { tag: '@web-auth' },
    async ({ webHomePage, page }) => {
      const user = getCredentialForWorker(i, 'web');
      const storagePath = path.join('.auth', `web-user-${i}.json`);

      await webHomePage.loginUser(user.email!, user.pass!);
      await page.context().storageState({ path: storagePath });
    }
  );
}

// --- MOBILE SETUP ---
for (let i = 0; i < MAX_WORKERS; i++) {
  setup(
    `authenticate mobile user ${i}`,
    { tag: '@mobile-auth' },
    async ({ webHomePage, page }) => {
      const user = getCredentialForWorker(i, 'mobile');
      const storagePath = path.join('.auth', `mobile-user-${i}.json`);

      await webHomePage.loginUser(user.email!, user.pass!);
      await page.context().storageState({ path: storagePath });
    }
  );
}
