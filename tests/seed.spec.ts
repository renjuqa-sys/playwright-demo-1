import { test, expect } from '@fixtures/baseTest';

test('seed template', async ({ webLoginPage }) => {
  await webLoginPage.open('/');
  // This shows the AI we use Page Objects, not raw page.click()
  await expect(webLoginPage.page).toHaveURL(/.*classicfootballshirts/);
});
