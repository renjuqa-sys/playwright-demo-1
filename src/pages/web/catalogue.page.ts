import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebCataloguePage extends BasePage {
  //get element that has "name" as text and has data-test="product-name"
  protected readonly productByName = (name: string) => this.page.getByTestId('product-name').filter({ hasText: name });

  constructor(page: Page) {
    super(page);
  }

  public async selectProduct(name: string) {
    await this.productByName(name).click();
  }
}
