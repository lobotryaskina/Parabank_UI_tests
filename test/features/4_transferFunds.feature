Feature: Transfer funds

@NeedsAuth
  Scenario: Transfer funds
    Given I am on the ParaBank Transfer page
    When I choose a first account
      And I choose a second account
      And I enter the sum "500"
      And I click Transfer button
    Then I should see a successfull transfer message
      And The transferred sum should be "500"
