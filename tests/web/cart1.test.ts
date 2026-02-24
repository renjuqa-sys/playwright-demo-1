import { test, expect } from '@fixtures/baseTest';
import { TAGS } from '@constants/tags';

// eslint-disable-next-line playwright/no-focused-test
test.only(
  'Add item to cart11',
  { tag: [TAGS.SMOKE, TAGS.AUTH] },
  async ({ webCataloguePage, webProductPage, t, routes }) => {
    await webCataloguePage.open(routes.HOME);
    await webCataloguePage.navBar.verifyUserIsLoggedIn();
    await webCataloguePage.selectProduct('Combination Pliers');
    await webProductPage.addToCart();
    await webProductPage.verifyToasterMessage(t('TOASTER.PRODUCT_ADDED'));
    await expect(webProductPage.page).toHaveURL(/.*product/);
  }
);
