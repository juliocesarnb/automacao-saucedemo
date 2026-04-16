import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Login smoke flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
  });

  it('TC-LOGIN-001 should authenticate a standard user and open the inventory page', () => {
    LoginPage.login(users.standard.username, users.standard.password);

    cy.url().should('include', '/inventory.html');
    InventoryPage.pageTitle().should('be.visible').and('have.text', 'Products');
    InventoryPage.inventoryList().should('be.visible');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage.cartLink().should('be.visible');
  });

  it('TC-LOGIN-002 should display the exact locked user error message', () => {
    LoginPage.login(users.locked.username, users.locked.password);

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    LoginPage.errorMessage()
      .should('be.visible')
      .and(
        'have.text',
        'Epic sadface: Sorry, this user has been locked out.'
      );
  });
});
