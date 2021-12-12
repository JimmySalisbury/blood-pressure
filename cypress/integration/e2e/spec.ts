describe('Blood Pressure App Testing', () => {
  it('shows the landing page', () => {
    cy.visit('/');
    cy.contains('Blood Pressure Monitor');
  });

  it('should fill in form and return Pre-High Blood Pressure', () => {
    cy.visit('/');
    cy.get('[formControlName=systolicPressure]').then((elem) => {
      elem.val(130);
    });
    cy.get('[formControlName=diastolicPressure]').then((elem) => {
      elem.val(80);
    });
    cy.get('[type=submit]').click();
    cy.contains('Your Blood Pressure Value is: 96.67mmHg');
    cy.contains('Your Blood Pressure Category is: Pre-High Blood Pressure');
  });

  it('should visit Privacy page and return to home', () => {
    cy.visit('/');
    cy.get('[id=privacy-button]').click();
    cy.contains('Privacy');

    cy.get('[id=privacy-back-button]').click();
    cy.contains('Blood Pressure Monitor');
  });

  //new feature tests
  it('shows the graph exists on page', () => {
    cy.visit('/');
    cy.get('canvas');
  });
});
