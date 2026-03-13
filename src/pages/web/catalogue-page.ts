import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/base-page';
import { test } from '@fixtures/pages-fixture';
import { TranslationKey } from '@utils/i18n';

export class WebCataloguePage extends BasePage {
  private productByName(name: string): Locator {
    return this.page.getByTestId('product-name').filter({ hasText: name });
  }
  constructor(page: Page, t: (key: TranslationKey, count?: number) => string) {
    super(page, t);
  }

  public async selectProduct(name: string) {
    await test.step(`Select product: ${name}`, async () => {
      await this.productByName(name).click();
    });
  }
}
