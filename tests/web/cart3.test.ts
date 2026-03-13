import { test, expect } from '@fixtures/base.fixture';
import { TAGS } from '@constants/tags';

test(
  'Add item to cart3 - Add to cart (Logged In & Out State)',
  { tag: [TAGS.REGRESSION, TAGS.MEMBER] },
  async ({ webCataloguePage, webProductPage, t, routes }) => {
    await webCataloguePage.open(routes.HOME);
    await webCataloguePage.navBar.verifyUserIsLoggedIn();
    await webCataloguePage.selectProduct('Combination Pliers');
    await webProductPage.addToCart();
    await webProductPage.verifyToasterMessage(t('TOASTER.PRODUCT_ADDED'));
    await expect(webProductPage.page).toHaveURL(/.*product/);
  }
);
