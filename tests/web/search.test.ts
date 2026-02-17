import { expect, test } from '@fixtures/baseTest';
import { ROUTES } from 'src/constants/routes';
import { TAGS } from 'src/constants/tags';

test(
  'Verify Messi Argentina shirt details from search',
  { tag: [TAGS.SMOKE, TAGS.AUTH] },
  async ({ webHomePage, webSearchResultsPage, webProductDetailsPage }) => {
    const shirtName = '2006 Argentina adidas Reissue Home Shirt Messi #19';

    await webHomePage.open(ROUTES.HOME);
    await webHomePage.searchFor(shirtName);
    await webSearchResultsPage.selectProductByName(shirtName);
    await webProductDetailsPage.verifyProductDetails(shirtName);
    expect(true).toBeTruthy();
  }
);
