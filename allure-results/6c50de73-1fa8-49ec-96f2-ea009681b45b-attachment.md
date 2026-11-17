# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Basic_Form_Elements.spec.js >> Basic Form Elements
- Location: tests\Basic_Form_Elements.spec.js:3:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://sreenidhirajakrishnan.in/
Call log:
  - navigating to "https://sreenidhirajakrishnan.in/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: Check if there is a typo in sreenidhirajakrishnan.in.
    - generic [ref=e9]:
      - paragraph
      - list [ref=e10]:
        - listitem [ref=e11]:
          - text: If spelling is correct,
          - link "try running Windows Network Diagnostics" [ref=e12] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
          - text: .
    - generic [ref=e13]: DNS_PROBE_FINISHED_NXDOMAIN
  - button "Reload" [ref=e16] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Basic Form Elements', async ({ page }) => {
> 4  |   await page.goto('https://sreenidhirajakrishnan.in/');
     |              ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://sreenidhirajakrishnan.in/
  5  |   await page.getByRole('button', { name: 'Interview Prep' }).hover();
  6  |   await page.getByRole('link', { name: 'Practice Hub', exact: true }).click();
  7  |   await expect(page).toHaveURL('https://sreenidhirajakrishnan.in/practice');
  8  | 
  9  |   // Section : 1
  10 |   // Basic Form Elements
  11 | 
  12 |   await page.getByPlaceholder('Enter your name').fill('Agilan');
  13 |   await page.getByPlaceholder('Enter password').fill('Agilan@123');
  14 |   await page.getByPlaceholder('Enter email').fill('Agilanmunisamy@gmail.com');
  15 |   await page.getByPlaceholder('Enter phone').fill('+91 9876543210');
  16 |   await page.getByPlaceholder('Tell us about yourself').fill('Welcome to magic world');
  17 | 
  18 |   await page.getByTestId('form-submit').click();
  19 | 
  20 |   await expect(page.getByTestId('form-result'))
  21 |     .toContainText('Form submitted successfully');
  22 | 
  23 |   // Reset the form
  24 |   await page.getByTestId('form-reset').click();
  25 | 
  26 |   await expect(page.getByTestId('form-result'))
  27 |     .toContainText('Form was reset');
  28 | 
  29 | 
  30 |   // check the all fileds are empty after reset 
  31 | 
  32 |   await expect(page.getByPlaceholder('Enter your name')).toHaveValue('');
  33 |   await expect(page.getByPlaceholder('Enter password')).toHaveValue('');
  34 |   await expect(page.getByPlaceholder('Enter email')).toHaveValue('');
  35 |   await expect(page.getByPlaceholder('Enter phone')).toHaveValue('');
  36 |   await expect(page.getByPlaceholder('Tell us about yourself')).toHaveValue('');
  37 | 
  38 | });
```