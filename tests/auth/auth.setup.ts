/* eslint-disable no-console */
// tests/auth/auth.setup.ts
import { test as setup } from '@fixtures/baseTest';
import { getCredentialForRole } from '../../src/utils/user-manager';
import { ROUTES } from '@constants/routes';
import { UserRole } from '@constants/user-role';

// const authDir = path.join(process.cwd(), '.auth');
// WEB AUTH SETUP
// setup('authenticate web users', { tag: '@web-auth' }, async ({ webLoginPage }, testInfo) => {
//   // Calculate Global Index
//   // Get Shard Index (defaults to 1 locally)
//   const shardIndex = process.env.TEST_SHARD_INDEX ? parseInt(process.env.TEST_SHARD_INDEX) : 1;
//   // get number of workers per shard  (defaults to 1 locally))
//   const workersPerShard = testInfo.config.workers || 1;
//   // calculate global index for user assignment across shards and its workers => (shard - 1) * workers_per_shard + local_worker_index
//   const globalIndex = (shardIndex - 1) * workersPerShard + testInfo.parallelIndex;

//   // Get credentials and define file path
//   const user = getCredentialForWorker(globalIndex, 'web');
//   const authFile = path.join(path.join(process.cwd(), '.auth'), `web-user-${globalIndex}.json`);

//   // Perform login
//   await webLoginPage.open(ROUTES.LOGIN);
//   await webLoginPage.login(user.email, user.password);
//   // Save auth state for later use in tests and teardwon
//   await webLoginPage.page.context().storageState({ path: authFile });
// });

setup('Authenticate WEB multi-role users', { tag: '@web-auth' }, async ({ webLoginPage, page }) => {
  const workerIndex = parseInt(process.env.TEST_PARALLEL_INDEX || '0');

  // Utility to handle the repetitive "Login and Save" flow
  const authenticateRole = async (role: UserRole, fileName: string) => {
    const credentials = getCredentialForRole(role, workerIndex);

    await setup.step(`Authenticate as ${role}`, async () => {
      await webLoginPage.open(ROUTES.LOGIN);
      await webLoginPage.login(credentials.email, credentials.password);
      await webLoginPage.navBar.verifyUserIsLoggedIn();
      await page.context().storageState({ path: `.auth/${fileName}-${workerIndex}.json` });
      console.log(`Saved auth state for role ${role} in file ${fileName}-${workerIndex}.json.`);
    });
  };

  // Setup customer sessiom
  await authenticateRole(UserRole.CUSTOMER, 'web-customer');

  // 2. Clear and Setup Admin (Gold Standard: ensure full isolation)
  await setup.step('Clear session for next role', async () => {
    await page.context().clearCookies(); //  Clear state to ensure clean login for admin
    await page.evaluate(() => {
      window.localStorage.clear(); // Clear local storage
      window.sessionStorage.clear(); // Clear sesssion storage as well, just to eb safe
    });
    console.log(`Cleared session for next role setup.`);
  });

  // Setup admin sessiom
  await authenticateRole(UserRole.ADMIN, 'web-admin');
});

// MOBILE AUTH SETUP (Same pattern)
setup('Authenticate mobile users', { tag: '@mobile-auth' }, async ({}) => {});
