import { browser } from 'protractor';

export class HomePage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }
}
