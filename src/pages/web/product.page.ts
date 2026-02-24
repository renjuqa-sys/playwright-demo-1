import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/base.page';
import { test } from '@fixtures/baseTest';

export class WebProductPage extends BasePage {
  private get addToCartButton(): Locator {
    return this.page.locator('[data-test="add-to-cart"]');
  }
  constructor(page: Page) {
    super(page);
  }

  public async addToCart() {
    await test.step('Add product to cart', async () => {
      await this.addToCartButton.click();
    });
  }
}
