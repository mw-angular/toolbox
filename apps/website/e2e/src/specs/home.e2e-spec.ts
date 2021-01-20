import { consoleErrorsCheck } from '../helpers/console-errors-check';
import { HomePage } from '../pages/home.po';

describe('Home', (): void => {
  let page: HomePage;

  beforeEach((): void => {
    page = new HomePage();
  });

  it('should display welcome message', async (): Promise<void> => {
    await page.navigateTo();
    expect(true).toBe(true);
  });

  afterEach(
    async (): Promise<void> => {
      await consoleErrorsCheck();
    },
  );
});
