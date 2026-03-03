import { test, expect } from '@fixtures/base.fixture';
import { TAGS } from '@constants/tags';

test(
  'Add item to cart1',
  { tag: [TAGS.REGRESSION, TAGS.AUTH] },
  async ({ webCataloguePage, webProductPage, t, routes }) => {
    await webCataloguePage.open(routes.HOME);
    await webCataloguePage.navBar.verifyUserIsLoggedIn();
    await webCataloguePage.selectProduct('Combination Pliers');
    await webProductPage.addToCart();
    await webProductPage.verifyToasterMessage(t('TOASTER.PRODUCT_ADDED'));
    await expect(webProductPage.page).toHaveURL(/.*product/);
  }
);
