# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Tab_vs_Window.spec.js >> open three windows
- Location: tests\Tab_vs_Window.spec.js:88:1

# Error details

```
Error: page.waitForLoadState: Navigation failed because page crashed!
```

# Test source

```ts
  2   | 
  3   | const tabWindowUrl =
  4   |   'https://www.playwrightautomation.com/practice.html#section-browser-tabwindow';
  5   | 
  6   | const contextHandlingUrl =
  7   |   'https://www.playwrightautomation.com/practice.html#section-browser-context-handling';
  8   | 
  9   | test('open and close documentation tab and external window', async ({ page }) => {
  10  |   await page.goto(tabWindowUrl);
  11  | 
  12  |   // Open Documentation Tab
  13  |   const [newTab] = await Promise.all([
  14  |     page.context().waitForEvent('page'),
  15  |     page.getByRole('button', { name: 'Open Playwright Docs' }).click(),
  16  |   ]);
  17  | 
  18  |   await newTab.waitForLoadState();
  19  |   await expect(newTab).toHaveURL('https://playwright.dev/');
  20  |   await newTab.close();
  21  | 
  22  |   // Open External Window
  23  |   const [popup] = await Promise.all([
  24  |     page.waitForEvent('popup'),
  25  |     page.getByRole('button', { name: 'Open Mobilewright Window' }).click(),
  26  |   ]);
  27  | 
  28  |   await popup.waitForLoadState();
  29  |   await expect(popup).toHaveTitle(/Mobilewright/i);
  30  |   await popup.close();
  31  | });
  32  | 
  33  | test('open one random tab', async ({ browser }) => {
  34  |   const context = await browser.newContext();
  35  |   const page = await context.newPage();
  36  | 
  37  |   await page.goto(contextHandlingUrl);
  38  | 
  39  |   const [newTab] = await Promise.all([
  40  |     context.waitForEvent('page'),
  41  |     page.getByRole('button', { name: 'Open One Random Tab' }).click(),
  42  |   ]);
  43  | 
  44  |   await newTab.waitForLoadState();
  45  |   console.log('Tab URL:', newTab.url());
  46  | 
  47  |   await context.close();
  48  | });
  49  | 
  50  | test('open one random window', async ({ browser }) => {
  51  |   const context = await browser.newContext();
  52  |   const page = await context.newPage();
  53  | 
  54  |   await page.goto(contextHandlingUrl);
  55  | 
  56  |   const [newWindow] = await Promise.all([
  57  |     context.waitForEvent('page'),
  58  |     page.getByRole('button', { name: 'Open One Random Window' }).click(),
  59  |   ]);
  60  | 
  61  |   await newWindow.waitForLoadState();
  62  |   console.log('Window URL:', newWindow.url());
  63  | 
  64  |   await context.close();
  65  | });
  66  | 
  67  | test('open three tabs', async ({ browser }) => {
  68  |   const context = await browser.newContext();
  69  |   const page = await context.newPage();
  70  | 
  71  |   await page.goto(contextHandlingUrl);
  72  | 
  73  |   const existingPages = context.pages();
  74  | 
  75  |   await page.getByRole('button', { name: 'Open Three Tabs at Once' }).click();
  76  |   await expect.poll(() => context.pages().length).toBe(4);
  77  | 
  78  |   const newTabs = context.pages().filter(tab => !existingPages.includes(tab));
  79  | 
  80  |   for (const tab of newTabs) {
  81  |     await tab.waitForLoadState();
  82  |     console.log('Tab URL:', tab.url());
  83  |   }
  84  | 
  85  |   await context.close();
  86  | });
  87  | 
  88  | test('open three windows', async ({ browser }) => {
  89  |   const context = await browser.newContext();
  90  |   const page = await context.newPage();
  91  | 
  92  |   await page.goto(contextHandlingUrl);
  93  | 
  94  |   const existingPages = context.pages();
  95  | 
  96  |   await page.getByRole('button', { name: 'Open Three Windows at Once' }).click();
  97  |   await expect.poll(() => context.pages().length).toBe(4);
  98  | 
  99  |   const newWindows = context.pages().filter(win => !existingPages.includes(win));
  100 | 
  101 |   for (const win of newWindows) {
> 102 |     await win.waitForLoadState('domcontentloaded', { timeout: 15000 });
      |               ^ Error: page.waitForLoadState: Navigation failed because page crashed!
  103 |     console.log('Window URL:', win.url());
  104 |   }
  105 | 
  106 |   await context.close();
  107 | });
```