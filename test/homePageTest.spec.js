const { test, expect } = require('@playwright/test')

test("Home page availability", async ({ page }) => {
    await page.goto("index.htm");
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
});