import { Page, Locator } from '@playwright/test';
import { WebAppRoute, ROUTES } from '@constants';

export class BasePage {
  private readonly globalLoader: Locator;
  protected readonly toastMessage: Locator;

  constructor(public readonly page: Page) {
    // This selector targets common loader classes like .loading-mask or .loader
    // You can add multiple selectors separated by commas if the site uses different ones
    this.globalLoader = page.locator('div[x-show="isLoading"]').filter({ visible: true });
    this.toastMessage = page.getByRole('alert');
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
   * @param path - The URL path (e.g., '/login')
   * @param timeout - Optional custom timeout in milliseconds (defaults to 30s)
   */
  public async open(path: WebAppRoute = ROUTES.HOME, timeout: number = 30000) {
    // We pass the timeout to Playwright's goto
    await this.page.goto(path, { timeout });

    // We also pass it to our loader check to ensure they match
    await this.waitForLoadersToDisappear(timeout);
  }
}
