import { test, expect } from '@playwright/test';

test('Handle alerts and prompts', async ({ page }) => {
  await page.goto(
    'https://www.playwrightautomation.com/practice.html#section-alerts'
  );

  async function acceptDialog(button, expectedType, expectedMessage, response) {
    let info;

    page.once('dialog', async dialog => {
      info = {
        type: dialog.type(),
        message: dialog.message(),
      };

      if (response === undefined) {
        await dialog.accept();
      } else {
        await dialog.accept(response);
      }
    });

    await button.click();

    expect(info.type).toBe(expectedType);
    if (expectedMessage) {
      expect(info.message).toBe(expectedMessage);
    }
  }

  await acceptDialog(
    page.getByTestId('btn-simple-alert'),
    'alert',
    'I am an alert box!'
  );

  await acceptDialog(
    page.getByRole('button', { name: 'Confirmation Alert' }),
    'confirm'
  );

  await acceptDialog(
    page.getByRole('button', { name: 'Prompt Alert' }),
    'prompt',
    'Please enter your name:',
    'Rajesh'
  );
});