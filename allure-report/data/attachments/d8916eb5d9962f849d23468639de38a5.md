# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloadFiles.spec.js >> Download the course guide PDF
- Location: tests\downloadFiles.spec.js:3:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.playwrightautomation.com/practice.html#section-upload-downloads
Call log:
  - navigating to "https://www.playwrightautomation.com/practice.html#section-upload-downloads", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: Check if there is a typo in www.playwrightautomation.com.
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
  3  | test('Download the course guide PDF', async ({ page }, testInfo) => {
> 4  |     await page.goto(
     |                ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.playwrightautomation.com/practice.html#section-upload-downloads
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