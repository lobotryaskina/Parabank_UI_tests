const { Given, When, Then } = require("@cucumber/cucumber");
const { expect, chromium, Page, Browser } = require("@playwright/test");
const { BillPaymentPage } = require("../../src/pages/BillPaymentPage");
const { pageFixture } = require("../hooks/pageFixture");
const { FakePayment } = require("../../src/helpers/FakePayment");

require("dotenv").config();

let billPaymentPage = new BillPaymentPage(pageFixture.page);
let fakePayment = new FakePayment();
let payment = fakePayment.makePayment();

Given("I am on the ParaBank bill payment page", async function () {
  billPaymentPage = new BillPaymentPage(pageFixture.page);
  await billPaymentPage.navigate();
});

When("I fill in the payee information with fake data", async () => {
  await billPaymentPage.fillPayeeName(payment.payeeName);
  await billPaymentPage.fillStreet(payment.street);
  await billPaymentPage.fillCity(payment.city);
  await billPaymentPage.fillState(payment.state);
  await billPaymentPage.fillZipCode(payment.zipCode);
  await billPaymentPage.fillPhoneNumber(payment.phoneNumber);
  await billPaymentPage.fillAccountNumber(payment.accountNumber);
  await billPaymentPage.fillRepeatedAccountNumber(payment.accountNumber);
  await billPaymentPage.fillAmount(payment.amount);
});

When(
  "I fill in the account information with fake data with unmatching account numbers",
  async () => {
    await billPaymentPage.fillPayeeName(payment.payeeName);
    await billPaymentPage.fillStreet(payment.street);
    await billPaymentPage.fillCity(payment.city);
    await billPaymentPage.fillState(payment.state);
    await billPaymentPage.fillZipCode(payment.zipCode);
    await billPaymentPage.fillPhoneNumber(payment.phoneNumber);
    await billPaymentPage.fillAccountNumber(payment.accountNumber);
    await billPaymentPage.fillRepeatedAccountNumber(payment.amount);
    await billPaymentPage.fillAmount(payment.amount);
  },
);

When(
  "I fill in the account information with fake data but leave the amount empty",
  async () => {
    await billPaymentPage.fillPayeeName(payment.payeeName);
    await billPaymentPage.fillStreet(payment.street);
    await billPaymentPage.fillCity(payment.city);
    await billPaymentPage.fillState(payment.state);
    await billPaymentPage.fillZipCode(payment.zipCode);
    await billPaymentPage.fillPhoneNumber(payment.phoneNumber);
    await billPaymentPage.fillAccountNumber(payment.accountNumber);
    await billPaymentPage.fillRepeatedAccountNumber(payment.phoneNumber);
  },
);

When("I submit the bill payment form", async () => {
  await billPaymentPage.clickSendPaymentButton();
});

Then("I should see a successfull payment message", async () => {
  await billPaymentPage.checkLocatorExists(
    billPaymentPage.locators.successMessage,
  );
});

Then("The payment payee should match the sent data", async () => {
  await billPaymentPage.checkPayeeValue(payment.payeeName);
});

Then("The payment account should match the sent data", async () => {
  await billPaymentPage.checkAccountValue(payment.accountNumber);
});

Then("The payment amount should match the sent data", async () => {
  await billPaymentPage.checkAmountValue(payment.amount);
});

Then("I should see a not-matching account numbers error message", async () => {
  await billPaymentPage.checkLocatorExists(
    billPaymentPage.locators.matchingAccountsError,
  );
});

Then("I should see an empty amount field error message", async () => {
  await billPaymentPage.checkLocatorExists(
    billPaymentPage.locators.emptyAmountError,
  );
});
