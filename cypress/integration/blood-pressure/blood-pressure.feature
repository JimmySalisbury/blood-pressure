Feature: Check Blood Pressure

    I want to get my blood pressure

    @focus
    Scenario: Getting my blood pressure
        Given I visit blood pressure app
        And I enter a systolic pressure of 120
        And I enter a  diastolic pressure of 90
        Then I click calculate
        Then I see "100mmHg" on the page
        And I see "Pre-High Blood Pressure" on the page

    @focus
    Scenario: I see the blood pressure graph
        Given I visit blood pressure app
        And I enter a systolic pressure of 120
        And I enter a  diastolic pressure of 90
        Then I click calculate
        Then I see "Blood Pressure Record" on the page

