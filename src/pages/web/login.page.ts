import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebLoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.signInButton = page.getByTestId('login-submit');
  }

  public async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();

    // Check that sign in button is not visisble after login, which indicates a successful login.
    await expect(this.signInButton).toBeHidden();
  }
}
