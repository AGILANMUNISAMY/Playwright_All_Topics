# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloadFiles.spec.js >> Download the course guide PDF
- Location: tests\downloadFiles.spec.js:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://www.playwrightautomation.com/practice.html#section-upload-downloads", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Download the course guide PDF', async ({ page }, testInfo) => {
> 4  |     await page.goto(
     |                ^ Error: page.goto: Target page, context or browser has been closed
  5  |         'https://www.playwrightautomation.com/practice.html#section-upload-downloads'
  6  |     );
  7  | 
  8  |     const downloadPromise = page.waitForEvent('download');
  9  | 
  10 |     await page.getByRole('link', { name: 'Download PDF' }).click();
  11 | 
  12 |     const download = await downloadPromise;
  13 |     expect(download.suggestedFilename())
  14 |         .toBe('genxevo-profile-course-guide.pdf');
  15 | 
  16 |     await download.saveAs(
  17 |         testInfo.outputPath(download.suggestedFilename())
  18 |     );
  19 | });
```