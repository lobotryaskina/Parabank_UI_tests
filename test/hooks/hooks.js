const { chromium, Page, Browser, BrowserContext } = require("@playwright/test")
const { BeforeAll, Before, After, AfterAll, AfterStep } = require("@cucumber/cucumber");
const { pageFixture } = require('./pageFixture');

let browser;
let context;
let page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless:false });
})

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  pageFixture.page = page;
})

AfterStep(async function ({ pickle, result }){
  //screenshot on fail
  if (result.status == "FAILED") {
    img = await pageFixture.page.screenshot({ path: `test-results/screenshots/${pickle.name}.png`, type: "png" });
    await this.attach(img, "image/png");
  }
});

After(async function ({ pickle, result }) {
  img = await pageFixture.page.screenshot({ path: `test-results/screenshots/${pickle.name}.png`, type: "png" });
  await this.attach(img, "image/png");
  await pageFixture.page.close();
  await context.close();
})

AfterAll(async function () {
  await browser.close(); 
})