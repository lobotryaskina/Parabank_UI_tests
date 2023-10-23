const { expect, Page } = require("@playwright/test");
require("dotenv").config();

exports.TransferPage = class TransferPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    fromAccountsList: '//select[@id="fromAccountId"]',
    toAccountsList: '//select[@id="toAccountId"]',
    transferSumInput: '//input[@id="amount"]',
    transferButton: '//input[@value="Transfer"]',
    successTransferMessage: '//h1[contains(text(),"Complete")]',
    transferredSum: '//span[@id="amount"]',
  };

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
    await this.page.waitForLoadState("networkidle");
  }

  async checkLocatorExists(name) {
    await expect(this.page.locator(name)).toBeVisible();
  }

  async selectFirstAccount() {
    await this.page
      .locator(this.locators.fromAccountsList)
      .selectOption({ index: 0 });
  }

  async selectSecondAccount() {
    await this.page
      .locator(this.locators.toAccountsList)
      .selectOption({ index: 1 });
  }

  async enterTransferSum(sum) {
    await this.page.locator(this.locators.transferSumInput).fill(sum);
  }

  async transferButtonClick() {
    await this.page.locator(this.locators.transferButton).click();
  }

  async checkTransferredSum(sum) {
    await expect(this.page.locator(this.locators.transferredSum)).toContainText(
      sum,
    );
  }
};
