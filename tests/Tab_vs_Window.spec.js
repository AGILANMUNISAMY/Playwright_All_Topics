const { test, expect } = require('@playwright/test');

const tabWindowUrl =
  'https://www.playwrightautomation.com/practice.html#section-browser-tabwindow';

const contextHandlingUrl =
  'https://www.playwrightautomation.com/practice.html#section-browser-context-handling';

test('open and close documentation tab and external window', async ({ page }) => {
  await page.goto(tabWindowUrl);

  // Open Documentation Tab
  const [newTab] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('button', { name: 'Open Playwright Docs' }).click(),
  ]);

  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL('https://playwright.dev/');
  await newTab.close();

  // Open External Window
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'Open Mobilewright Window' }).click(),
  ]);

  await popup.waitForLoadState();
  await expect(popup).toHaveTitle(/Mobilewright/i);
  await popup.close();
});

test('open one random tab', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(contextHandlingUrl);

  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Open One Random Tab' }).click(),
  ]);

  await newTab.waitForLoadState();
  console.log('Tab URL:', newTab.url());

  await context.close();
});

test('open one random window', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(contextHandlingUrl);

  const [newWindow] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Open One Random Window' }).click(),
  ]);

  await newWindow.waitForLoadState();
  console.log('Window URL:', newWindow.url());

  await context.close();
});

test('open three tabs', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(contextHandlingUrl);

  const existingPages = context.pages();

  await page.getByRole('button', { name: 'Open Three Tabs at Once' }).click();
  await expect.poll(() => context.pages().length).toBe(4);

  const newTabs = context.pages().filter(tab => !existingPages.includes(tab));

  for (const tab of newTabs) {
    await tab.waitForLoadState();
    console.log('Tab URL:', tab.url());
  }

  await context.close();
});

test('open three windows', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(contextHandlingUrl);

  const existingPages = context.pages();

  await page.getByRole('button', { name: 'Open Three Windows at Once' }).click();
  await expect.poll(() => context.pages().length).toBe(4);

  const newWindows = context.pages().filter(win => !existingPages.includes(win));

  for (const win of newWindows) {
    await win.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('Window URL:', win.url());
  }

  await context.close();
});