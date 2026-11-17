import { test, expect } from '@playwright/test';

test('Upload a single file', async ({ page }) => {

    //Single File Upload
    await page.goto('https://www.playwrightautomation.com/practice.html#section-upload-standard');
    const resumePath = 'C:/Users/agila/Downloads/Practical_API_Testing_Postman_Playwright.pdf';
    await page.getByTestId('upload-single').setInputFiles(resumePath);
    await expect(page.getByTestId('upload-single-result')).toHaveText('Practical_API_Testing_Postman_Playwright.pdf');

    //Multiple File Upload
    const resumeFiles = [
        'C:/Users/agila/Downloads/Practical_API_Testing_Postman_Playwright.pdf',
        'C:/Users/agila/Downloads/AGILAN_ MUNISAMY_RESUME.pdf',
    ];

    //Multiple File upload
    await page.getByTestId('upload-multiple').setInputFiles(resumeFiles);

    const multipleResult = page.getByTestId('upload-multiple-result');
    await expect(multipleResult).toContainText('Practical_API_Testing_Postman_Playwright.pdf');
    await expect(multipleResult).toContainText('AGILAN_ MUNISAMY_RESUME.pdf');

    //Hidden Input Upload Challenge
    const pdfResume =
        'C:/Users/agila/Downloads/Practical_API_Testing_Postman_Playwright.pdf';

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByTestId('btn-upload-resume').click(),
    ]);

    await fileChooser.setFiles(pdfResume);

    await expect(page.getByTestId('upload-hidden-result'))
        .toContainText('Practical_API_Testing_Postman_Playwright.pdf');




});