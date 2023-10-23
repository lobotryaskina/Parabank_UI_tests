Feature: User accounts overview

@NeedsAuth
  Scenario: Accounts overview
    Given I am on the ParaBank accounts page
    Then I see user accounts on the Account Overview page

@NeedsAuth
  Scenario: Open new account
    Given I am on the ParaBank Open New Account page
    When I choose account type "SAVINGS"
      And I click Open New Account
    Then I should see a successfull account creating message
      And I should see the created account number on the accounts page
    When I click on the account number
    Then The account type should be "SAVINGS"
