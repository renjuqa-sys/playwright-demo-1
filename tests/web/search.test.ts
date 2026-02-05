import { expect, test } from '@fixtures/baseTest';
import { TAGS } from '@utils/tags';

test(
  'Verify Messi Argentina shirt details from search',
  { tag: [TAGS.SMOKE, TAGS.AUTH] },
  async ({ webHomePage, webSearchResultsPage, webProductDetailsPage }) => {
    const shirtName = '2006 Argentina adidas Reissue Home Shirt Messi #19';

    await webHomePage.goto();
    await webHomePage.searchFor(shirtName);
    await webSearchResultsPage.selectProductByName(shirtName);
    await webProductDetailsPage.verifyProductDetails(shirtName);
    expect(true).toBeTruthy();
  }
);
