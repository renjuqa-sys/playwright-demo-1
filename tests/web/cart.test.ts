import { test, expect } from '@fixtures/baseTest';
import { ROUTES } from 'src/constants/routes';
import { TAGS } from 'src/constants/tags';

test('add item to cart', { tag: [TAGS.SMOKE, TAGS.AUTH] }, async ({ webCataloguePage, webProductPage, t }) => {
  await webCataloguePage.open(ROUTES.HOME);
  await webCataloguePage.selectProduct('01KHP8Q3TS9EZCW1GP9S4JTSF5');
  await webProductPage.addToCart();
  await webProductPage.verifySuccessMessage(t('TOASTER.PRODUCT_ADDED'));
  expect(true).toBe(true);
});
