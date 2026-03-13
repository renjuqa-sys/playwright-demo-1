/* eslint-disable no-console */
// tests/auth/auth.setup.ts
import { test as setup } from '@fixtures/base-fixture';
import { getCredentialForRole } from '../../src/utils/user-manager';
import { ROUTES } from '@constants/routes';
import { USER_ROLES, UserRole } from '@constants/user-role';

// Calculate total pool size: 4 Shards * 2 Workers = 8 Users
const SHARDS = parseInt(process.env.TOTAL_SHARDS || '1');
const WORKERS = parseInt(process.env.WORKERS_PER_SHARD || '1');
const TOTAL_USERS_NEEDED = SHARDS * WORKERS;

// Create 8 users. These will be shared by BOTH Web and Mobile projects.
for (let i = 0; i < TOTAL_USERS_NEEDED; i++) {
  setup(`Authenticate User Slot ${i}`, { tag: '@web-auth' }, async ({ webLoginPage, page }) => {
    const authenticateRole = async (role: UserRole, prefix: string) => {
      const credentials = getCredentialForRole(role, i);

      await setup.step(`Login as ${role} for Global User Slot ${i}`, async () => {
        await webLoginPage.open(ROUTES.LOGIN);
        await webLoginPage.login(credentials.email, credentials.password);
        // Save to: .auth/web-customer-0.json, .auth/web-customer-1.json, etc.
        await page.context().storageState({ path: `.auth/${prefix}-${role}-${i}.json` });
        console.log(`Saved: .auth/${prefix}-${role}-${i}.json`);
      });
    };

    // Setup both roles for this global index
    await authenticateRole(USER_ROLES.CUSTOMER, 'web');

    await setup.step('Cleanup for next role', async () => {
      await page.context().clearCookies(); //  Clear state to ensure clean login for admin
      await page.evaluate(() => {
        window.localStorage.clear(); // Clear local storage
        window.sessionStorage.clear(); // Clear sesssion storage as well, just to eb safe
      });
      console.log(`Cleared session for next role setup.`);
    });

    await authenticateRole(USER_ROLES.ADMIN, 'web');
  });
}
