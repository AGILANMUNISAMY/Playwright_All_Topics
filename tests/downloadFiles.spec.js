import { test, expect } from '@playwright/test';

test('Download the course guide PDF', async ({ page }, testInfo) => {
    await page.goto(
        'https://www.playwrightautomation.com/practice.html#section-upload-downloads'
    );

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('link', { name: 'Download PDF' }).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename())
        .toBe('genxevo-profile-course-guide.pdf');

    await download.saveAs(
        testInfo.outputPath(download.suggestedFilename())
    );
});