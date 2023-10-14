import { test, expect } from '@playwright/test'

test("Home page register availability", async ({ page }) => {
    await page.goto("index.htm");
    await expect(page.getByRole('link', { name: /register/i })).toBeVisible;
});

//TODO
test("Register fields availability", async ({ page }) => {
    await page.goto("index.htm");
    await page.getByRole('link', { name: /register/i }).click();
    await expect(page.locator('//input[@id="customer.firstName"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.lastName"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.address.street"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.address.city"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.address.state"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.address.zipCode"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.phoneNumber"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.ssn"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.username"]')).toBeVisible;
    await expect(page.locator('//input[@id="customer.password"]')).toBeVisible;
    await expect(page.locator('//input[@id="repeatedPassword"]')).toBeVisible;
    await expect(page.locator('input[value="Register"]')).toBeVisible;
});
