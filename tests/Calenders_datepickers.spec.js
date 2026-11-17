import { test, expect } from '@playwright/test';


test('Native HTML date inputs', async ({ page }) => {
    await page.goto(
        'https://www.playwrightautomation.com/practice.html#section-datepicker-native'
    );

    const dateOfBirth = page.getByTestId('dp-native-dob');
    const issuedDate = page.getByTestId('dp-native-issued');
    const expiryDate = page.getByTestId('dp-native-passport');

    await dateOfBirth.fill('2003-07-24');
    await issuedDate.fill('2023-07-13');
    await expiryDate.fill('2030-08-05');

    await expect(dateOfBirth).toHaveValue('2003-07-24');
    await expect(issuedDate).toHaveValue('2023-07-13');
    await expect(expiryDate).toHaveValue('2030-08-05');


   
});



