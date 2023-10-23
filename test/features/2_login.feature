Feature: Login on Parabank

  Scenario: Successfull login
    Given I am on the ParaBank login page
    When I fill in the existing login and password
    And I submit the credentials
    Then I should be successfully logged in

  Scenario: Empty credentials login fail
    Given I am on the ParaBank login page
    When I submit the credentials
    Then I should see an empty credentials error

@NeedsAuth
  Scenario: Successfull log out
    Given I am on the ParaBank accounts page
    When I click log out button
    Then I should log out
