import { Page } from '@playwright/test';

export class WebSearchResultsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async selectProductByName(name: string) {
    // Finds the specific link that contains the shirt name
    const productLink = this.page.getByRole('link', { name: name });
    await productLink.first().click();
  }
}
