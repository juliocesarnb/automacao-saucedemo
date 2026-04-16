Cypress.Commands.add('getByDataTest', (value) => {
  return cy.get(`[data-test="${value}"]`);
});
