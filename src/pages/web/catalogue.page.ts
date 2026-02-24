import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/base.page';
import { test } from '@fixtures/baseTest';

export class WebCataloguePage extends BasePage {
  private productByName(name: string): Locator {
    return this.page.getByTestId('product-name').filter({ hasText: name });
  }
  constructor(page: Page) {
    super(page);
  }

  public async selectProduct(name: string) {
    await test.step(`Select product: ${name}`, async () => {
      await this.productByName(name).click();
    });
  }
}
