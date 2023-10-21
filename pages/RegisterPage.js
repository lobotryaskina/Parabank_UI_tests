const { expect, Page } = require('@playwright/test');

exports.RegisterPage = class RegisterPage {
    
    constructor(page) { 
      this.page = page;
    }

    locators = {
      firstName: '//input[@id="customer.firstName"]',
      lastName: '//input[@id="customer.lastName"]',
      street: '//input[@id="customer.address.street"]',
      city: '//input[@id="customer.address.city"]',
      state: '//input[@id="customer.address.state"]',
      zipCode: '//input[@id="customer.address.zipCode"]',
      phoneNumber: '//input[@id="customer.phoneNumber"]',
      ssn: '//input[@id="customer.ssn"]',
      username: '//input[@id="customer.username"]',
      password: '//input[@id="customer.password"]',
      repeatedPassword: '//input[@id="repeatedPassword"]',
      registerButton: 'input[value="Register"]',
      successMessage: '//p[contains(text(),"Your account was created successfully")]',
      matchingPassswordError: '//span[@id="repeatedPassword.errors"]',
      existingUserError: '//span[@id="customer.username.errors"]'
    }

    async navigate() {
      await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
      await this.page.waitForLoadState('networkidle');
    }

    async clickRegisterButton() {
      await this.page.locator(this.locators.registerButton).click();
    }

    async fillFirstName(value) {
      await this.page.locator(this.locators.firstName).fill(value);
    }

    async fillLastName(value) {
      await this.page.locator(this.locators.lastName).fill(value);
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

    async fillSSN(value) {
      await this.page.locator(this.locators.ssn).fill(value);
    }

    async fillUsername(value) {
      await this.page.locator(this.locators.username).fill(value);
    }

    async fillPassword(value) {
      await this.page.locator(this.locators.password).fill(value);
    }

    async fillRepeatedPassword(value) {
      await this.page.locator(this.locators.repeatedPassword).fill(value);
    }

    async checkLocatorExists(name) {
      await expect(this.page.locator(name)).toBeVisible();
    }

}