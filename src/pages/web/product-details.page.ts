import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebProductDetailsPage extends BasePage {
  private readonly productTitle: Locator;
  private readonly productSku: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.getByRole('heading', {
      name: '2006 Argentina adidas Reissue',
    });
    this.productSku = page.locator('.value[itemprop="sku"]');
  }

  public async verifyProductDetails(expectedName: string) {
    await this.waitForLoadersToDisappear();
    await expect(this.productTitle).toContainText(expectedName);
  }
}
