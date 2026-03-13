import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/base-page';
import { test } from '@fixtures/pages-fixture';
import { withToaster } from '../common/traits/with-toaster';
import { compose } from '@utils/compose';
import { TranslationKey } from '@utils/i18n';

const pageWithTraits = compose(BasePage, withToaster);

export class WebProductPage extends pageWithTraits {
  constructor(page: Page, t: (key: TranslationKey, count?: number) => string) {
    super(page, t);
  }

  private get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: this.t('BUTTONS.ADD_TO_CART') });
  }

  public async addToCart() {
    await test.step('Add product to cart', async () => {
      await this.addToCartButton.click();
    });
  }
}
