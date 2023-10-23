const { expect, Page } = require("@playwright/test");
require("dotenv").config();

exports.MainPage = class MainPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    username: '//input[@name="username"]',
    password: '//input[@name="password"]',
    loginButton: '//input[@value="Log In"]',
    welcomeText: '//b[normalize-space()="Welcome"]',
    emptyCredentialsError: '//p[@class="error"]',
  };

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await this.page.waitForLoadState("networkidle");
  }

  async fillUsername(value) {
    await this.page.locator(this.locators.username).fill(value);
  }

  async fillPassword(value) {
    await this.page.locator(this.locators.password).fill(value);
  }

  async clickLoginButton() {
    await this.page.locator(this.locators.loginButton).click();
    await this.page.waitForLoadState("networkidle");
  }

  async checkLocatorExists(name) {
    await expect(this.page.locator(name)).toBeVisible();
  }
};
