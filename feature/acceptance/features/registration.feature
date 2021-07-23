@all
Feature: Registration
  @reg
  Scenario: As users, I can register new organization account
    Given As User, I am on login page of serviceX
    When I can see footer in Login page
    And I click to register new organization account
    And I can see the register form is displayed
    And I full fill my information to register account
    And I click to submit button in Registration form
    Then I can see register successully popup is displayed.
    And I can see message to notify user need to wait Admin approve for registration.
