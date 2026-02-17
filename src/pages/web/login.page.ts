import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WebLoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  public async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();

    // Industry Standard: Wait for a post-login element to ensure session is set
    await expect(this.logoutButton).toBeVisible();
  }
}
