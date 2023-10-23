const { chromium, Page, Browser, BrowserContext } = require("@playwright/test");
const {
  BeforeAll,
  Before,
  After,
  AfterAll,
  AfterStep,
} = require("@cucumber/cucumber");
const { pageFixture } = require("./pageFixture");
const { MainPage } = require("../../src/pages/MainPage");
const { AccountsPage } = require("../../src/pages/AccountsPage");

require("dotenv").config();

let loginPage = new MainPage(pageFixture.page);
let accountsPage = new AccountsPage(pageFixture.page);
let browser;
let context;
let page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  pageFixture.page = page;
});

Before({ tags: "@NeedsAuth", timeout: 100 * 1000 }, async function () {
  loginPage = new MainPage(pageFixture.page);
  await loginPage.navigate();
  await loginPage.fillUsername('ourPreciousUser');
  await loginPage.fillPassword('129!hder3@#R');
  await loginPage.clickLoginButton();
  await loginPage.checkLocatorExists(loginPage.locators.welcomeText);
});

AfterStep(async function ({ pickle, result }) {
  //screenshot on fail
  if (result.status == "FAILED") {
    img = await pageFixture.page.screenshot({
      path: `test-results/screenshots/${pickle.name}.png`,
      type: "png"
    });
    await this.attach(img, "image/png");
  }
});

After(async function ({ pickle, result }) {
  img = await pageFixture.page.screenshot({
    path: `test-results/screenshots/${pickle.name}.png`,
    type: "png",
  });
  await this.attach(img, "image/png");
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
