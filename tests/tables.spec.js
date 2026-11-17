import { test, expect } from '@playwright/test';

test('static medal table totals are correct', async ({ page }) => {
  await page.goto(
    'https://www.playwrightautomation.com/practice.html#section-table-static'
  );

  // Scope the locator to the Static Web Table section.
  const section = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Static Web Table' }) });

  const table = section.getByRole('table');
  const headers = await table.locator('thead th').allTextContents();

  const column = name =>
    headers.findIndex(header => header.trim().toLowerCase() === name.toLowerCase());

  const goldCol = column('Gold');
  const silverCol = column('Silver');
  const bronzeCol = column('Bronze');
  const totalCol = column('Total Medals');

  expect([goldCol, silverCol, bronzeCol, totalCol]).not.toContain(-1);

  const rows = table.locator('tbody tr');
  await expect(rows).toHaveCount(6);

  for (const row of await rows.all()) {
    const cells = await row.locator('td').allTextContents();
    const country = cells[0].trim();

    const gold = Number(cells[goldCol].trim());
    const silver = Number(cells[silverCol].trim());
    const bronze = Number(cells[bronzeCol].trim());
    const total = Number(cells[totalCol].trim());

    expect(
      gold + silver + bronze,
      `${country}: medal sum should equal Total Medals`
    ).toBe(total);
  }
});