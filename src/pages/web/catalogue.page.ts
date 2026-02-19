import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebCataloguePage extends BasePage {
  protected readonly productByName = (name: string) => this.page.getByTestId(`product-${name}`);

  constructor(page: Page) {
    super(page);
  }

  public async selectProduct(name: string) {
    await this.productByName(name).click();
  }
}
