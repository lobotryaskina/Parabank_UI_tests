const { expect, Page } = require("@playwright/test");
require("dotenv").config();

exports.OpenNewAccountPage = class OpenNewAccountPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    title: '//h1[normalize-space()="Accounts Overview"]',
    accountTypeDropdown: '//select[@id="type"]',
    openAccountButton: 'input[value^="Open"]',
    openAccountSuccessMessage: '//p[contains(text(),"Congratulations")]',
    newAccountNumber: '//a[@id="newAccountId"]',
  };

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
    await this.page.waitForLoadState("networkidle");
  }

  async checkLocatorExists(name) {
    await expect(this.page.locator(name)).toBeVisible();
  }

  async selectAccountType(type) {
    await this.page
      .locator(this.locators.accountTypeDropdown)
      .selectOption({ label: type });
  }

  async clickOpenAccountButton() {
    await this.page.locator(this.locators.openAccountButton).click();
  }

  async getNewAccountNumber() {
    console.log(
      await this.page.locator(this.locators.newAccountNumber).innerText(),
    );
    let number = await this.page
      .locator(this.locators.newAccountNumber)
      .innerText();
    return number;
  }
};
