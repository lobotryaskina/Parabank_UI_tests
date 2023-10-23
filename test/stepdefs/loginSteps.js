const { Given, When, Then } = require("@cucumber/cucumber");
const { expect, chromium, Page, Browser } = require("@playwright/test");
const { MainPage } = require("../../src/pages/MainPage");
const { AccountsPage } = require("../../src/pages/AccountsPage");
const { pageFixture } = require("../hooks/pageFixture");

require("dotenv").config();

let loginPage = new MainPage(pageFixture.page);
let accountsPage = new AccountsPage(pageFixture.page);

Given("I am on the ParaBank login page", async function () {
  loginPage = new MainPage(pageFixture.page);
  await loginPage.navigate();
});

When("I fill in the existing login and password", async () => {
  await loginPage.fillUsername(process.env.LOGIN);
  await loginPage.fillPassword(process.env.PASSWORD);
});

When("I submit the credentials", async () => {
  await loginPage.clickLoginButton();
});

When("I click log out button", async () => {
  accountsPage = new AccountsPage(pageFixture.page);
  await accountsPage.clickLogOutButton();
});

Then("I should be successfully logged in", async () => {
  await loginPage.checkLocatorExists(loginPage.locators.welcomeText);
});

Then("I should be on Accounts Overview page", async () => {
  await accountsPage.checkLocatorExists(accountsPage.locators.title);
});

Then("I should see an empty credentials error", async () => {
  await loginPage.checkLocatorExists(loginPage.locators.emptyCredentialsError);
});

Then("I should log out", async () => {
  loginPage = new MainPage(pageFixture.page);
  await loginPage.checkLocatorExists(loginPage.locators.username);
  await loginPage.checkLocatorExists(loginPage.locators.password);
});
