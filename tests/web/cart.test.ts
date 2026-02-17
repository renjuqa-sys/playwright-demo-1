import { test, expect } from '@fixtures/baseTest';
import { TAGS } from '@constants/tagsss';

test('add item to cart', { tag: [TAGS.SMOKE, TAGS.AUTH] }, async ({ webCataloguePage, webProductPage, t, routes }) => {
  await webCataloguePage.open(routes.HOME);
  await webCataloguePage.selectProduct('01KHP8Q3TS9EZCW1GP9S4JTSF5');
  await webProductPage.addToCart();
  await webProductPage.verifyToasterMessage(t('TOASTER.PRODUCT_ADDED'));
  expect(true).toBe(true);
});
