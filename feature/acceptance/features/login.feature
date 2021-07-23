@all
Feature: Login to Credify

  @login
  Scenario: Verify login page when redirect to serviceX dashboard
    Given I redirect to login page
    Then I can see Credify logo
    And I can see the login form
    And I can see footer in Login page

  @login
  Scenario Outline: Verify user can login with valid account
    Given As User, I am on login page of serviceX
    When I fullfill a valid <roles> account into login form
    And I click the login button
    Then I am on serviceX dashboard
    Examples:
      | roles           |
      | market          |
      | serviceProvider |

  @login
  Scenario: Verify user cannot login with invalid account
    Given As User, I am on login page of serviceX
    When I fullfill a invalid account into login form
    And I click the login button
    Then I can see error message return

  @login
  Scenario Outline: Verify the validation when user input credential in login form
    Given As User, I am on login page of serviceX
    When I fill invalid <field> format
    And I click the login button
    Then I can see the validation error is displayed in <field>

    Examples:
      | field    |
      | email    |
      | password |

  @login @dev
  Scenario: As user, I already logined after I check Remember me checkbox
    Given As User, I am on login page of serviceX
    When I fullfill a Market account into login form
    And I check Remember me checkbox
    And I click the login button
    And I am on serviceX dashboard
    And I go to another url
    And I use back button on browser
    Then I am on serviceX dashboard






