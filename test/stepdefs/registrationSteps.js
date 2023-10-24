const { Given, When, Then } = require("@cucumber/cucumber");
const { expect, chromium, Page, Browser } = require("@playwright/test");
const { RegisterPage } = require("../../src/pages/RegisterPage");
const { pageFixture } = require("../hooks/pageFixture");
const { FakeUser } = require("../../src/helpers/FakeUser");

require("dotenv").config();

let registerPage = new RegisterPage(pageFixture.page);
let fakeUser = new FakeUser();

Given("I am on the ParaBank registration page", async function () {
  registerPage = new RegisterPage(pageFixture.page);
  await registerPage.navigate();
});

When("I fill in the account information with fake data", async () => {
  fakeUser = new FakeUser();
  user = fakeUser.makeUser();
  await registerPage.fillFirstName(user.firstName);
  await registerPage.fillLastName(user.lastName);
  await registerPage.fillStreet(user.street);
  await registerPage.fillCity(user.city);
  await registerPage.fillState(user.state);
  await registerPage.fillZipCode(user.zipCode);
  await registerPage.fillPhoneNumber(user.phoneNumber);
  await registerPage.fillSSN(user.ssn);
  await registerPage.fillUsername(user.username);
  await registerPage.fillPassword(user.username);
  await registerPage.fillRepeatedPassword(user.password);
});

When(
  "I fill in the account information with fake data with an unmatching password",
  async () => {
    fakeUser = new FakeUser();
    user = fakeUser.makeUser();
    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillStreet(user.street);
    await registerPage.fillCity(user.city);
    await registerPage.fillState(user.state);
    await registerPage.fillZipCode(user.zipCode);
    await registerPage.fillPhoneNumber(user.phoneNumber);
    await registerPage.fillSSN(user.ssn);
    await registerPage.fillUsername(user.username);
    await registerPage.fillPassword(user.password);
    await registerPage.fillRepeatedPassword(user.username);
  },
);

When(
  "I fill in the account information with fake data and an existing login",
  async () => {
    fakeUser = new FakeUser();
    user = fakeUser.makeUser();
    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillStreet(user.street);
    await registerPage.fillCity(user.city);
    await registerPage.fillState(user.state);
    await registerPage.fillZipCode(user.zipCode);
    await registerPage.fillPhoneNumber(user.phoneNumber);
    await registerPage.fillSSN(user.ssn);
    await registerPage.fillUsername("user");
    await registerPage.fillPassword(user.password);
    await registerPage.fillRepeatedPassword(user.password);
  },
);

When("I submit the account opening form", async () => {
  await registerPage.clickRegisterButton();
});

Then("I should see a success message", async () => {
  await registerPage.checkLocatorExists(registerPage.locators.successMessage);
});

Then("I should see a not-matching password error message", async () => {
  await registerPage.checkLocatorExists(
    registerPage.locators.matchingPassswordError,
  );
});

Then("I should see an existing user error message", async () => {
  await registerPage.checkLocatorExists(
    registerPage.locators.existingUserError,
  );
});
