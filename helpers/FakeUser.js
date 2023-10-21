const { faker } = require('@faker-js/faker');

exports.FakeUser = class FakeUser {

    constructor () { }

    makeUser() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            street: faker.location.street(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            phoneNumber:  faker.phone.number(),
            ssn: faker.finance.accountNumber(9),
            username: faker.internet.userName(),
            password: faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9_$%#!@]/, prefix: '_' })
        }
    }
}