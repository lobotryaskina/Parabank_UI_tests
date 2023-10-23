Feature: Bill payment

@NeedsAuth
  Scenario: Valid bill payment
    Given I am on the ParaBank bill payment page
    When I fill in the payee information with fake data
    And I submit the bill payment form
    Then I should see a successfull payment message
      And The payment payee should match the sent data
      And The payment amount should match the sent data
      #And The payment account should match the sent data

@NeedsAuth
  Scenario: The account numbers do not match
    Given I am on the ParaBank bill payment page
    When I fill in the account information with fake data with unmatching account numbers
    And I submit the bill payment form
    Then I should see a not-matching account numbers error message
    
@NeedsAuth
  Scenario: Empty amount field error
    Given I am on the ParaBank bill payment page
    When I fill in the account information with fake data but leave the amount empty
    And I submit the bill payment form
    Then I should see an empty amount field error message
  