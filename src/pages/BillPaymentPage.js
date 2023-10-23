const { expect, Page } = require("@playwright/test");
require("dotenv").config();

exports.BillPaymentPage = class BillPaymentPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    payeeName: '//input[@name="payee.name"]',
    street: '//input[@name="payee.address.street"]',
    city: '//input[@name="payee.address.city"]',
    state: '//input[@name="payee.address.state"]',
    zipCode: '//input[@name="payee.address.zipCode"]',
    phoneNumber: '//input[@name="payee.phoneNumber"]',
    accountNumber: '//input[@name="payee.accountNumber"]',
    repeatedAccountNumber: '//input[@name="verifyAccount"]',
    amount: '//input[@name="amount"]',
    fromAccount: '//select[@name="fromAccountId"]',
    sendPaymentButton: '//input[@class="button"]',
    successMessage: '//h1[contains(text(),"Bill Payment Complete")]',
    successPayee: '//span[@id="payeeName"]',
    successAmount: '//span[@id="amount"]',
    successAccount: '//span[@id="fromAccountId"]',
    matchingAccountsError:
      '//span[contains(text(),"The account numbers do not match")]',
    emptyAmountError: '//span[contains(text(),"The amount cannot be empty")]',
  };

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/billpay.htm');
    await this.page.waitForLoadState("networkidle");
  }

  async clickSendPaymentButton() {
    await this.page.locator(this.locators.sendPaymentButton).click();
  }

  async fillPayeeName(value) {
    await this.page.locator(this.locators.payeeName).fill(value);
  }

  async fillStreet(value) {
    await this.page.locator(this.locators.street).fill(value);
  }

  async fillCity(value) {
    await this.page.locator(this.locators.city).fill(value);
  }

  async fillState(value) {
    await this.page.locator(this.locators.state).fill(value);
  }

  async fillZipCode(value) {
    await this.page.locator(this.locators.zipCode).fill(value);
  }

  async fillPhoneNumber(value) {
    await this.page.locator(this.locators.phoneNumber).fill(value);
  }

  async fillAccountNumber(value) {
    await this.page.locator(this.locators.accountNumber).fill(value);
  }

  async fillRepeatedAccountNumber(value) {
    await this.page.locator(this.locators.repeatedAccountNumber).fill(value);
  }

  async fillAmount(value) {
    await this.page.locator(this.locators.amount).fill(value);
  }

  async checkLocatorExists(name) {
    await expect(this.page.locator(name)).toBeVisible();
  }

  async checkPayeeValue(value) {
    await expect(this.page.locator(this.locators.successPayee)).toContainText(
      value,
    );
  }

  async checkAmountValue(value) {
    await expect(this.page.locator(this.locators.successAmount)).toContainText(
      value,
    );
  }

  async checkAccountValue(value) {
    await expect(this.page.locator(this.locators.successAccount)).toContainText(
      value,
    );
  }
};
