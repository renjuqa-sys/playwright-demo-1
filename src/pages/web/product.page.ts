import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/base.page';
import { test } from '@fixtures/baseTest';
import { WithToaster } from '../common/traits/withToaster';
import { compose } from '@utils/compose';

const PageWithTraits = compose(BasePage, WithToaster);

export class WebProductPage extends PageWithTraits {
  private get addToCartButton(): Locator {
    return this.page.getByTestId('add-to-cart');
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
