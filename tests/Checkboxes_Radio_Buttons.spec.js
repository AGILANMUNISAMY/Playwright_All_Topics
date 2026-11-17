import { test, expect } from '@playwright/test';

test('Checkboxes and Radio Buttons', async ({ page }) => {
  await page.goto('https://sreenidhirajakrishnan.in/');

  await page.getByRole('button', { name: 'Interview Prep' }).hover();
  await page.getByRole('link', { name: 'Practice Hub', exact: true }).click();
  await expect(page).toHaveURL('https://sreenidhirajakrishnan.in/practice');

  const selectAll = page.getByRole('checkbox', {
    name: 'Select all checkboxes',
  });
  const checkboxes = ['Checkbox A', 'Checkbox B', 'Checkbox C'].map(name =>
    page.getByRole('checkbox', { name })
  );

  await selectAll.check();

  for (const checkbox of checkboxes) {
    await expect(checkbox).toBeChecked();
  }

  await selectAll.uncheck();

  for (const checkbox of checkboxes) {
    await expect(checkbox).not.toBeChecked();
  }

  const radioOne = page.getByRole('radio', { name: 'Radio one' });
  const radioTwo = page.getByRole('radio', { name: 'Radio two' });

  await radioOne.check();
  await expect(radioOne).toBeChecked();
  await expect(page.getByTestId('radio-result')).toContainText('Selected: one');

  await radioTwo.check();
  await expect(radioTwo).toBeChecked();
  await expect(radioOne).not.toBeChecked();
  await expect(page.getByTestId('radio-result')).toContainText('Selected: two');

  await page.getByRole('checkbox', { name: 'Reveal checkbox' }).check();
  await expect(page.getByText('Hidden text is now visible!')).toBeVisible();
});