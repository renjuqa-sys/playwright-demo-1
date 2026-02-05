import { Page, Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebHomePage extends BasePage {
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('button', { name: 'Search' }).filter({ visible: true });
  }

  public async goto() {
    await this.open('/');
  }

  public async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.waitForLoadersToDisappear();
  }

  public async loginUser(term: string) {
    await this.goto();
    await this.page.getByRole('banner').getByRole('link', { name: 'My Account' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail Address*' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail Address*' }).fill(term);
    await this.page.getByRole('textbox', { name: 'Password*' }).click();
    await this.page.getByRole('textbox', { name: 'Password*' }).fill(term);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.waitForLoadersToDisappear();
  }
}
