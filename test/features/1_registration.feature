Feature: Register on ParaBank

@this
  Scenario: Valid registration
    Given I am on the ParaBank registration page
    When I fill in the account information with fake data
    And I submit the account opening form
    Then I should see a success message

  Scenario: Invalid password confirmation
    Given I am on the ParaBank registration page
    When I fill in the account information with fake data with an unmatching password
    And I submit the account opening form
    Then I should see a not-matching password error message

  Scenario: Trying to register an existing user
    Given I am on the ParaBank registration page
    When I fill in the account information with fake data and an existing login
    And I submit the account opening form
    Then I should see an existing user error message
  