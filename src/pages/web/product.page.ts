import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebProductPage extends BasePage {
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }

  public async addToCart() {
    await this.addToCartButton.click();
  }
  public async verifySuccessMessage(expectedText: string) {
    await expect(this.toastMessage).toHaveText(expectedText);
  }
}
