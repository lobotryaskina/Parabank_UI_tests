const { Given, When, Then } = require("@cucumber/cucumber");
const { expect, chromium, Page, Browser } = require("@playwright/test");
const { MainPage } = require("../../src/pages/MainPage");
const { AccountsPage } = require("../../src/pages/AccountsPage");
const { OpenNewAccountPage } = require("../../src/pages/OpenNewAccountPage");
const { pageFixture } = require("../hooks/pageFixture");

require("dotenv").config();

let loginPage = new MainPage(pageFixture.page);
let accountsPage = new AccountsPage(pageFixture.page);
let openNewAccountPage = new OpenNewAccountPage(pageFixture.page);
let number;

Given("I am on the ParaBank accounts page", async function () {
  accountsPage = new AccountsPage(pageFixture.page);
  await accountsPage.navigate();
});

Given("I am on the ParaBank Open New Account page", async function () {
  openNewAccountPage = new OpenNewAccountPage(pageFixture.page);
  await openNewAccountPage.navigate();
});

When("I choose account type {string}", async (type) => {
  await openNewAccountPage.selectAccountType(type);
});

When("I click Open New Account", async () => {
  await openNewAccountPage.clickOpenAccountButton();
});

When("I click on the account number", async () => {
  await accountsPage.accountNumberClick();
});

Then("I see user accounts on the Account Overview page", async () => {
  await accountsPage.checkListOfAccounts();
});

Then("I should see a successfull account creating message", async () => {
  await openNewAccountPage.checkLocatorExists(
    openNewAccountPage.locators.openAccountSuccessMessage,
  );
});

Then("I should see the new account number", async () => {
  number = await openNewAccountPage.getNewAccountNumber();
});

Then(
  "I should see the created account number on the accounts page",
  async () => {
    number = await openNewAccountPage.getNewAccountNumber();
    accountsPage = new AccountsPage(pageFixture.page);
    await accountsPage.navigate();
    await accountsPage.checkAccountNumber(number);
  },
);

Then("I should see the created account", async () => {
  await accountsPage.checkAccountNumber(number);
});

Then("The account type should be {string}", async (type) => {
  await accountsPage.checkAccountType(type);
});
