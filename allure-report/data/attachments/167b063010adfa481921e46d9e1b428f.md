# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Calenders_datepickers.spec.js >> Native HTML date inputs
- Location: tests\Calenders_datepickers.spec.js:4:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.playwrightautomation.com/practice.html#section-datepicker-native
Call log:
  - navigating to "https://www.playwrightautomation.com/practice.html#section-datepicker-native", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | 
  4  | test('Native HTML date inputs', async ({ page }) => {
> 5  |     await page.goto(
     |                ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.playwrightautomation.com/practice.html#section-datepicker-native
  6  |         'https://www.playwrightautomation.com/practice.html#section-datepicker-native'
  7  |     );
  8  | 
  9  |     const dateOfBirth = page.getByTestId('dp-native-dob');
  10 |     const issuedDate = page.getByTestId('dp-native-issued');
  11 |     const expiryDate = page.getByTestId('dp-native-passport');
  12 | 
  13 |     await dateOfBirth.fill('2003-07-24');
  14 |     await issuedDate.fill('2023-07-13');
  15 |     await expiryDate.fill('2030-08-05');
  16 | 
  17 |     await expect(dateOfBirth).toHaveValue('2003-07-24');
  18 |     await expect(issuedDate).toHaveValue('2023-07-13');
  19 |     await expect(expiryDate).toHaveValue('2030-08-05');
  20 | 
  21 | 
  22 |    
  23 | });
  24 | 
  25 | 
  26 | 
  27 | 
```