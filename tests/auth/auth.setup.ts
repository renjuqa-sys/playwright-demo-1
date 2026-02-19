// tests/auth/auth.setup.ts
import { test as setup } from '@fixtures/baseTest';
import { getCredentialForRole } from '../../src/utils/user-manager';
import { ROUTES } from '@constants/routes';

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

setup('authenticate WEB multi-role users', { tag: '@web-auth' }, async ({ webLoginPage, page }) => {
  const workerIndex = parseInt(process.env.TEST_PARALLEL_INDEX || '0');

  // --- SETUP CUSTOMER SESSION ---
  const customer = getCredentialForRole('customer', workerIndex);
  await webLoginPage.open(ROUTES.LOGIN);
  await webLoginPage.login(customer.email, customer.password);
  await webLoginPage.navBar.verifyUserIsLoggedIn();
  await page.context().storageState({
    path: `.auth/customer-${workerIndex}.json`,
  });

  // --- SETUP ADMIN SESSION ---
  // 1. Clear state
  await page.context().clearCookies();
  await page.evaluate(() => window.localStorage.clear()); // Clear local storage too
  // 2. FORCE navigation back to login page to see the email field again
  await webLoginPage.open(ROUTES.LOGIN);
  const admin = getCredentialForRole('admin', workerIndex);
  await webLoginPage.login(admin.email, admin.password);
  await webLoginPage.navBar.verifyUserIsLoggedIn();
  await page.context().storageState({
    path: `.auth/admin-${workerIndex}.json`,
  });
});

// MOBILE AUTH SETUP (Same pattern)
setup('authenticate mobile users', { tag: '@mobile-auth' }, async ({}) => {});
