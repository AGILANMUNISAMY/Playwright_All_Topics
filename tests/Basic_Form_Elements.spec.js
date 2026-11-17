import { test, expect } from '@playwright/test';

test('Basic Form Elements', async ({ page }) => {
  await page.goto('https://sreenidhirajakrishnan.in/');
  await page.getByRole('button', { name: 'Interview Prep' }).hover();
  await page.getByRole('link', { name: 'Practice Hub', exact: true }).click();
  await expect(page).toHaveURL('https://sreenidhirajakrishnan.in/practice');

  // Section : 1
  // Basic Form Elements

  await page.getByPlaceholder('Enter your name').fill('Agilan');
  await page.getByPlaceholder('Enter password').fill('Agilan@123');
  await page.getByPlaceholder('Enter email').fill('Agilanmunisamy@gmail.com');
  await page.getByPlaceholder('Enter phone').fill('+91 9876543210');
  await page.getByPlaceholder('Tell us about yourself').fill('Welcome to magic world');

  await page.getByTestId('form-submit').click();

  await expect(page.getByTestId('form-result'))
    .toContainText('Form submitted successfully');

  // Reset the form
  await page.getByTestId('form-reset').click();

  await expect(page.getByTestId('form-result'))
    .toContainText('Form was reset');


  // check the all fileds are empty after reset 

  await expect(page.getByPlaceholder('Enter your name')).toHaveValue('');
  await expect(page.getByPlaceholder('Enter password')).toHaveValue('');
  await expect(page.getByPlaceholder('Enter email')).toHaveValue('');
  await expect(page.getByPlaceholder('Enter phone')).toHaveValue('');
  await expect(page.getByPlaceholder('Tell us about yourself')).toHaveValue('');

});