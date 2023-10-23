const { faker } = require("@faker-js/faker");

exports.FakePayment = class FakePayment {
  constructor() {}

  makePayment() {
    return {
      payeeName: faker.person.firstName(),
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phoneNumber: faker.phone.number(),
      accountNumber: faker.finance.accountNumber(6),
      amount: faker.finance.amount(10, 100, 0),
    };
  }
};
