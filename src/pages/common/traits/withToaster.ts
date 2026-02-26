import { expect, test, Locator } from '@playwright/test';

// A trait is a function that takes a class and returns a new class with added powers
export const WithToaster = <TBase extends new (...args: any[]) => any>(Base: TBase) => {
  return class extends Base {
    private get toastMessage(): Locator {
      return this.page.getByRole('alert');
    }

    public async verifyToasterMessage(expectedText: string) {
      await test.step(`Verify toaster message: "${expectedText}"`, async () => {
        await expect(this.toastMessage).toContainText(expectedText.trim());
      });
    }
  };
};
