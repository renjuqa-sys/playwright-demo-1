import { Locator, Page, test } from '@playwright/test';
import { WebAppRoute, ROUTES } from '@constants/routes';
import { NavigationBar } from './navigation-bar.page';
import { translate, TranslationKey } from '@utils/i18n';
export class BasePage {
  // common COMPONENTS like header, footer, navBar etc
  public readonly navBar: NavigationBar;

  constructor(public readonly page: Page) {
    this.navBar = new NavigationBar(page);
  }

  /**
   * Returns the localized string for a translation key. Use for locators and assertions
   * that depend on user-facing text. Supports pluralization when count is provided.
   * @param key - Type-safe translation key (e.g. 'TOASTER.PRODUCT_ADDED', 'BUTTONS.ADD_TO_CART')
   * @param count - Optional count for pluralized messages (_zero, _one, _other)
   * @returns The translated string for the current locale
   */
  protected t(key: TranslationKey, count?: number) {
    return translate(key, count);
  }

  private get globalLoader(): Locator {
    return this.page.locator('div[x-show="isLoading"]').filter({ visible: true });
  }

  /**
   * Reusable function to wait until all loading icons are hidden or removed from the DOM.
   */
  public async waitForLoadersToDisappear(timeout: number = 30000) {
    await test.step('Wait for global loaders to disappear', async () => {
      await this.globalLoader.waitFor({ state: 'hidden', timeout });
    });
  }
  /**
   * Centralized navigation method.
   * It appends the path to the baseURL from playwright.config.ts
   * @param path - Must be a valid WebAppRoute defined in routes.ts
   * @param timeout - Optional custom timeout in milliseconds (defaults to 30s)
   */
  public async open(path: WebAppRoute = ROUTES.HOME, timeout: number = 30000) {
    await test.step(`Open page: ${path}`, async () => {
      await this.page.goto(path, { timeout });
      await this.waitForLoadersToDisappear(timeout);
    });
  }
}
