import { test, expect } from '@playwright/test';

test('Dropdowns', async ({ page }) => {
  await page.goto(
    'https://www.playwrightautomation.com/practice.html#section-dropdowns'
  );

  // Native select dropdowns
  await page.locator('#country').selectOption({ label: 'India' });
  await page.getByTestId('dropdown-sorted').selectOption({ label: 'Dog' });

  // Custom Bootstrap dropdown
  await page.locator('.bd-select-trigger').click();
  await page.getByText('QA Engineer', { exact: true }).click();
  await expect(
    page.getByText('Selected: QA Engineer', { exact: true })
  ).toBeVisible();

  // Product autocomplete
  await page.getByPlaceholder('Search for Products').fill('Smart');
  const suggestions = page.locator('li.as-item');
  await expect(suggestions.first()).toBeVisible();
  console.log('Suggestions:', await suggestions.count());

  // Searchable custom dropdown: type, then choose a suggestion
  const skillsSearch = page.getByPlaceholder('Type to search skills…');
  await skillsSearch.fill('Playwright');
  await page.getByText('Playwright TypeScript', { exact: true }).click();

  // Dependent native dropdowns
  const state = page.getByTestId('dep-dropdown-state');
  const city = page.getByTestId('dep-dropdown-city');

  await page.getByTestId('dep-dropdown-country').selectOption({ label: 'India' });
  await expect(state).toBeEnabled();
  await state.selectOption({ label: 'Tamil Nadu' });

  await expect(city).toBeEnabled();
  await city.selectOption({ label: 'Chennai' });

  await expect(
    page.getByText('Selected: India → Tamil Nadu → Chennai', { exact: true })
  ).toBeVisible();
});