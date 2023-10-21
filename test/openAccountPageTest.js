/*const { chromium } = require('playwright');
const OpenAccountPage = require('./OpenAccountPage');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.navigate();

  const customerInfo = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Example City',
    state: 'CA',
    zipCode: '12345',
    phoneNumber: '555-555-5555',
    ssn: '123-45-6789',
    username: 'johndoe',
    password: 'password123',
  };

  await openAccountPage.fillForm(customerInfo);

  const successMessage = await openAccountPage.getSuccessMessage();
  console.log('Success Message:', successMessage);

  await browser.close();
})();
*/