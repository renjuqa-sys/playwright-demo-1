// tests/auth/auth.setup.ts
import { test as setup } from '@fixtures/baseTest';
import { getCredentialForWorker } from '../../src/utils/user-manager';
import path from 'path';
import { ROUTES } from 'src/constants/routes';

const authDir = path.join(process.cwd(), '.auth');

// WEB AUTH SETUP
setup('authenticate web users', { tag: '@web-auth' }, async ({ webLoginPage }, testInfo) => {
  const workerIndex = testInfo.workerIndex;
  const user = getCredentialForWorker(workerIndex, 'web');
  const authFile = path.join(authDir, `web-user-${workerIndex}.json`);
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
