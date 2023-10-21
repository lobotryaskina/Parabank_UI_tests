const { expect, Page } = require("@playwright/test");


exports.BasePage = class BasePage {
    constructor(page) {
    }

    locators = {
      title: '.title'
    }

    async navigate(pageUrl) {
      await this.page.goto(this.pageUrl);
      await this.page.waitForLoadState('networkidle');
    }

    async checkTitle(pageName) {
      await expect(this.locators.title).toContainText(pageName);
    }
};