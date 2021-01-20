import { browser, logging } from 'protractor';

/**
 * Assert that there are no errors emitted from the browser
 */
export async function consoleErrorsCheck(): Promise<void> {
  const logs: object = await browser.manage().logs().get(logging.Type.BROWSER);

  expect(logs).not.toContain(
    jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry),
  );
}
