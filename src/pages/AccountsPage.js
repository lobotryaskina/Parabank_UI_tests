const { expect, Page } = require("@playwright/test");
require("dotenv").config();

exports.AccountsPage = class AccountsPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    title: '//h1[normalize-space()="Accounts Overview"]',
    logOutButton: 'a[href="/parabank/logout.htm"]',
    listOfAccounts: 'a[class="ng-binding"]',
    accountType: '//td[@id="accountType"]',
  };

  async navigate() {
    await this.page.goto(process.env.BASE_URL + process.env.ACCOUNTS_PAGE);
    await this.page.waitForLoadState("networkidle");
  }

  async checkLocatorExists(name) {
    await expect(this.page.locator(name)).toBeVisible();
  }

  async checkListOfAccounts() {
    let count = await this.page.locator(this.locators.listOfAccounts).count();
    await expect(count).toBeGreaterThan(0);
  }

  async clickLogOutButton() {
    await this.page.locator(this.locators.logOutButton).click();
    await this.page.waitForLoadState("networkidle");
  }

  async checkAccountNumber(number) {
    await expect(this.page.getByText(number)).toBeVisible();
  }

  async accountNumberClick() {
    await this.page.locator(this.locators.listOfAccounts).last().click();
    await this.page.waitForLoadState("networkidle");
  }

  async checkAccountType(type) {
    await expect(this.page.locator(this.locators.accountType)).toContainText(
      type,
    );
  }
};
