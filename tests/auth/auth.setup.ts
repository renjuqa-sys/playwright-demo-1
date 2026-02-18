// tests/auth/auth.setup.ts
import { test as setup } from '@fixtures/baseTest';
import { getCredentialForWorker } from '../../src/utils/user-manager';
import path from 'path';
import { ROUTES } from '@constants/routes';

const authDir = path.join(process.cwd(), '.auth');

// WEB AUTH SETUP
setup('authenticate web users', { tag: '@web-auth' }, async ({ webLoginPage }, testInfo) => {
  // Calculate Global Index
  // Get Shard Index (defaults to 1 locally)
  const shardIndex = process.env.TEST_SHARD_INDEX ? parseInt(process.env.TEST_SHARD_INDEX) : 1;
  // get number of workers per shard  (defaults to 1 locally))
  const workersPerShard = testInfo.config.workers || 1;
  // calculate global index for user assignment across shards and its workers => (shard - 1) * workers_per_shard + local_worker_index
  const globalIndex = (shardIndex - 1) * workersPerShard + testInfo.parallelIndex;

  // Get credentials and define file path
  const user = getCredentialForWorker(globalIndex, 'web');
  const authFile = path.join(path.join(process.cwd(), '.auth'), `web-user-${globalIndex}.json`);

  // Perform login
  await webLoginPage.open(ROUTES.LOGIN);
  await webLoginPage.login(user.email, user.password);
  await webLoginPage.page.context().storageState({ path: authFile });
});

// MOBILE AUTH SETUP (Same pattern)
setup('authenticate mobile users', { tag: '@mobile-auth' }, async ({ webLoginPage }, testInfo) => {
  const workerIndex = testInfo.workerIndex;
  const user = getCredentialForWorker(workerIndex, 'mobile');
  const authFile = path.join(authDir, `mobile-user-${workerIndex}.json`);

  await webLoginPage.open(ROUTES.LOGIN);
  await webLoginPage.login(user.email, user.password);
  await webLoginPage.page.context().storageState({ path: authFile });
});
