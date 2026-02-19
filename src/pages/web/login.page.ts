import { Page, Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebLoginPage extends BasePage {
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
  }

  public async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}
