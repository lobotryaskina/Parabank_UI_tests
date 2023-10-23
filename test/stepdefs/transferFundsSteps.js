const { Given, When, Then } = require("@cucumber/cucumber");
const { expect, chromium, Page, Browser } = require("@playwright/test");
const { TransferPage } = require("../../src/pages/TransferPage");
const { pageFixture } = require("../hooks/pageFixture");

require("dotenv").config();

let transferPage = new TransferPage(pageFixture.page);

Given("I am on the ParaBank Transfer page", async function () {
  transferPage = new TransferPage(pageFixture.page);
  await transferPage.navigate();
});

When("I choose a first account", async () => {
  await transferPage.selectFirstAccount();
});

When("I choose a second account", async () => {
  await transferPage.selectSecondAccount();
});

When("I enter the sum {string}", async (sum) => {
  await transferPage.enterTransferSum(sum);
});

When("I click Transfer button", async () => {
  await transferPage.transferButtonClick();
});

Then("I should see a successfull transfer message", async () => {
  await transferPage.checkLocatorExists(
    transferPage.locators.successTransferMessage,
  );
});

Then("The transferred sum should be {string}", async (sum) => {
  await transferPage.checkTransferredSum(sum);
});
