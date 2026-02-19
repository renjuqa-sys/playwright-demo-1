import { Page, Locator, expect } from '@playwright/test';
import { WebAppRoute, ROUTES } from '@constants/routes';
import { NavigationBar } from './navigation-bar.page';

export class BasePage {
  // common LOCATORS used across multiple pages
  protected readonly globalLoader: Locator;
  protected readonly toastMessage: Locator;

  // common COMPONENTS like header, footer, navBar etc
  public readonly navBar: NavigationBar;

  constructor(public readonly page: Page) {
    this.globalLoader = page.locator('div[x-show="isLoading"]').filter({ visible: true });
    this.toastMessage = page.getByRole('alert');
    this.navBar = new NavigationBar(page);
  }

  /**
   * Reusable function to wait until all loading icons are hidden or removed from the DOM.
   */
  public async waitForLoadersToDisappear(timeout: number = 30000) {
    await this.globalLoader.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Centralized navigation method.
   * It appends the path to the baseURL from playwright.config.ts
   * @param path - Must be a valid WebAppRoute defined in routes.ts
   * @param timeout - Optional custom timeout in milliseconds (defaults to 30s)
   */
  public async open(path: WebAppRoute = ROUTES.HOME, timeout: number = 30000) {
    await this.page.goto(path, { timeout });
    await this.waitForLoadersToDisappear(timeout);
  }

  public async verifyToasterMessage(expectedText: string) {
    await expect(this.toastMessage).toHaveText(expectedText);
  }
}
