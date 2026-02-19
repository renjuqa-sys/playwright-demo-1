import { Page, Locator, expect } from '@playwright/test';

export class NavigationBar {
  protected readonly signInButton: Locator;

  constructor(public readonly page: Page) {
    this.signInButton = page.getByTestId('nav-sign-in');
  }

  public async verifyUserIsLoggedIn() {
    await expect(this.signInButton).toBeHidden();
  }

  public async verifyUserIsLoggedOut() {
    await expect(this.signInButton).toBeVisible();
  }
}
