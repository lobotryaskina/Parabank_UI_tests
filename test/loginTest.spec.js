const { test, expect } = require('@playwright/test')

test("Home page login availability", async ({ page }) => {
    await page.goto("index.htm");
    await expect(page.locator('input[name="username"]')).toBeVisible;
    await expect(page.locator('input[name="password"]')).toBeVisible;
    await expect(page.locator('value=Log In')).toBeVisible;
});

test("Successful login", async ({ page }) => {
    await page.goto("index.htm");
    await page.locator('input[name="username"]').fill('testUsErr');
    await page.locator('input[name="password"]').fill('1355');
    await page.click('input.button');
    await expect(page.getByText('Account Services')).toBeVisible;
    await expect(page.locator('p.smallText')).toContainText('Welcome')
});

test("Empty credentials", async ({ page }) => {
    await page.goto("index.htm");
    await page.click('input.button');
    await expect(page.locator('p.error')).toContainText('Please enter a username and password.')
});