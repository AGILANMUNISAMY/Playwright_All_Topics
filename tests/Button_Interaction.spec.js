import { test, expect } from '@playwright/test';

test('Button interactions', async ({ page }) => {
    await page.goto('https://sreenidhirajakrishnan.in/');
    await page.getByRole('button', { name: 'Interview Prep' }).hover();
    await page.getByRole('link', { name: 'Practice Hub', exact: true }).click();
    await expect(page).toHaveURL('https://sreenidhirajakrishnan.in/practice');

    // Single Click
    await page.getByRole('button', { name: 'Single Click' }).click();
    await expect(page.getByTestId('single-click-result')).toContainText('Single clicked!');

    //Double Click
    await page.getByRole('button', { name: 'Double Click' }).dblclick();
    await expect(page.getByTestId('double-click-result')).toContainText('Double clicked!');

    //Right Click
    await page.getByRole('button', { name: 'Right click button' }).click({ button: 'right' });
    await expect(page.getByText('Right click captured (context menu blocked)', { exact: true })).toBeVisible();
    
    //Check Button is disabled
    await page.getByTestId('disabled-btn').isDisabled();
    
    //Timer Button
    await page.getByRole('button', { name: 'Start delay' }).click();

    const delayedButton = page.getByRole('button', {
        name: 'Delayed enable button',
    });

    await expect(delayedButton).toBeEnabled();
    await expect(page.getByText('Now Enabled', { exact: true })).toBeVisible();

    //Orginal Label Button
    await page.getByRole('button', { name: 'Relabel button' }).click();
    await expect(page.getByTestId('relabel-btn')).toContainText('Clicked Label');




});