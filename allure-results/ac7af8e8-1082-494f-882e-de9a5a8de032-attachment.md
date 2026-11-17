# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Keyboard_Action_And_Scrolling.spec.js >> Keyboard Action
- Location: tests\Keyboard_Action_And_Scrolling.spec.js:3:5

# Error details

```
Error: locator.scrollIntoViewIfNeeded: Test ended.
Call log:
  - waiting for getByText('EMP-125', { exact: true }).last()

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Keyboard Action', async ({ page }) => {
  4  |     await page.goto('https://www.playwrightautomation.com/practice.html#section-keyboard');
  5  | 
  6  |     // Keyboard Actions
  7  | 
  8  |     const department = page.getByTestId('keyboard-department-selector')
  9  | 
  10 |     for (const name of ['QA', 'Automation', 'DevOps', 'Data Science']) {
  11 |         await department.focus();
  12 |         await department.press('ArrowDown');
  13 |         await department.press('Enter');
  14 | 
  15 |         await expect(page.getByText(`Selected Department: ${name}`, { exact: true }));
  16 |         console.log(name);
  17 | 
  18 |     }
  19 | 
  20 |     // Copy paste challenge in keyboard
  21 |     const source = page.getByTestId('keyboard-copy-source');
  22 |     await expect(source).toHaveValue('Automation Testing is Awesome');
  23 | 
  24 |     const destination = page.getByPlaceholder(/Tab here, then Ctrl\+V/i);
  25 | 
  26 |     await source.focus();
  27 |     await source.press('Control+A');
  28 |     await source.press('Control+C');
  29 |     await page.keyboard.press('Tab');
  30 |     await page.keyboard.press('Control+V');
  31 | 
  32 |     await expect(destination).toHaveValue(await source.inputValue());
  33 | 
  34 |     //scrolling
  35 | 
  36 |     const employee = page.getByText('EMP-125', { exact: true }).last();
  37 | 
> 38 |     await employee.scrollIntoViewIfNeeded();
     |                    ^ Error: locator.scrollIntoViewIfNeeded: Test ended.
  39 |     await expect(employee).toBeVisible();
  40 | 
  41 | 
  42 | });
```