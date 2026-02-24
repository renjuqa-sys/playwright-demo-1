import { Page, Locator, expect, test } from '@playwright/test';

export class NavigationBar {
  constructor(public readonly page: Page) {}

  private get signInButton(): Locator {
    return this.page.getByTestId('nav-sign-in');
  }

  public async verifyUserIsLoggedIn() {
    await test.step('Verify user is logged in (Sign In button hidden)', async () => {
      // The button should disappear once logged in
      await expect(this.signInButton).toBeHidden();
    });
  }

  public async verifyUserIsLoggedOut() {
    await test.step('Verify user is logged out (Sign In button visible)', async () => {
      await expect(this.signInButton).toBeVisible();
    });
  }
}
