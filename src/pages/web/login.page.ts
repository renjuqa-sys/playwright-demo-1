import { Locator } from '@playwright/test';
import { BasePage } from '../common/base.page';
import { test } from '@fixtures/baseTest';

export class WebLoginPage extends BasePage {
  // Use getters instead of constructor variables
  private get emailInput(): Locator {
    return this.page.getByTestId('email');
  }
  private get passwordInput(): Locator {
    return this.page.getByTestId('password');
  }
  private get loginButton(): Locator {
    return this.page.getByTestId('login-submit');
  }

  constructor(page: any) {
    super(page);
  }

  public async login(email: string, pass: string) {
    // This makes the report show "Step: Login to the application"
    await test.step('Login to the application', async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(pass);
      await this.loginButton.click();
    });
  }
}
