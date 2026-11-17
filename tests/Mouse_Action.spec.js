import { test, expect } from '@playwright/test';

test('Mouse Actions', async ({ page }) => {


    //Mouse Action
    await page.goto('https://www.playwrightautomation.com/practice.html#section-mouse');

    await page.getByRole('button', { name: 'Point Me' }).hover();

    for (const item of ['Mobiles', 'Laptops', 'Tablets']) {
        await expect(page.getByRole('link', { name: item, exact: true }))
            .toBeVisible();
    }

    //Right Click Me
    const result = page.getByTestId('context-menu-result');

    for (const option of ['Edit', 'Copy', 'Delete', 'Properties']) {
        await page.getByRole('button', { name: 'Right Click Me' })
            .click({ button: 'right' });

        await page.getByText(option, { exact: true }).click();
        await expect(result).toContainText(option);
    }

    //Drag and Drop

    await page.getByText('Rome', { exact: true }).dragTo(page.getByText('Italy', { exact: true }));
    await expect(page.getByText('Matched: 1 / 3')).toBeVisible();

    await page.getByTestId('drag-washington').dragTo(page.getByTestId('drop-usa'));
    await expect(page.getByText('Matched: 2 / 3')).toBeVisible();

    await page.getByTestId('drag-paris', { exact: true }).dragTo(page.getByTestId('drop-france', { exact: true }));
    await expect(page.getByText('Matched: 3 / 3')).toBeVisible();

    //Slider

    const slider = page.getByRole('slider').first();

    await expect(slider).toHaveValue('500');

    await slider.focus();
    await slider.press('ArrowLeft');

    const newValue = await slider.inputValue();
    await expect(slider).not.toHaveValue('1000');
    await expect(page.getByText(`Current Value: $${newValue}`)).toBeVisible();




});
