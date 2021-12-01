import { Given, And, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'http://localhost:4200';

Given(`I visit blood pressure app`, () => {
  cy.visit(url);
});

And(`I enter a systolic pressure of 120`, () => {
  cy.get('[formControlName=systolicPressure]').then((elem) => {
    elem.val(120);
  });
});

And(`I enter a  diastolic pressure of 90`, () => {
  cy.get('[formControlName=diastolicPressure]').then((elem) => {
    elem.val(90);
});

Then(`I click calculate`, (value) => {
  cy.get('[type=submit]').click();
});

Then(`I see {string} on the page`, (value) => {
  cy.contains( value);
});

And(`I see {string} on the page`, (value) => {
  cy.contains(value);
});