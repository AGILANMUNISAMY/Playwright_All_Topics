import { test, expect } from '@playwright/test';

test('Keyboard Action', async ({ page }) => {
    await page.goto('https://www.playwrightautomation.com/practice.html#section-keyboard');

    // Keyboard Actions

    const department = page.getByTestId('keyboard-department-selector')

    for (const name of ['QA', 'Automation', 'DevOps', 'Data Science']) {
        await department.focus();
        await department.press('ArrowDown');
        await department.press('Enter');

        await expect(page.getByText(`Selected Department: ${name}`, { exact: true }));
        console.log(name);

    }

    // Copy paste challenge in keyboard
    const source = page.getByTestId('keyboard-copy-source');
    await expect(source).toHaveValue('Automation Testing is Awesome');

    const destination = page.getByPlaceholder(/Tab here, then Ctrl\+V/i);

    await source.focus();
    await source.press('Control+A');
    await source.press('Control+C');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Control+V');

    await expect(destination).toHaveValue(await source.inputValue());

    //scrolling

    const employee = page.getByText('EMP-125', { exact: true }).last();

    await employee.scrollIntoViewIfNeeded();
    await expect(employee).toBeVisible();


});