import { Page, Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebHomePage extends BasePage {
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('button', { name: 'Search' }).filter({ visible: true });
  }

  public async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.waitForLoadersToDisappear();
  }
}
