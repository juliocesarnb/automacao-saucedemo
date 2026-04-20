import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import {
  registerPageRouteAliases,
  waitForRoute,
} from '../../support/network';

describe('Login smoke flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    registerPageRouteAliases();
    LoginPage.visit();
    waitForRoute('@getLoginPage');
  });

  it('TC-LOGIN-001 should authenticate a standard user and open the inventory page', () => {
    LoginPage.login(users.standard.username, users.standard.password);

    waitForRoute('@getInventoryPage').then((interception) => {
      expect(interception.request.method).to.eq('GET');
      expect(interception.response.body).to.include('Swag Labs');
    });

    cy.url().should('include', '/inventory.html');
    InventoryPage.pageTitle().should('be.visible').and('have.text', 'Products');
    InventoryPage.inventoryList().should('be.visible');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage.cartLink().should('be.visible');
  });

  it('TC-LOGIN-002 should display the exact locked user error message', () => {
    LoginPage.login(users.locked.username, users.locked.password);

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('@getInventoryPage.all').should('have.length', 0);
    LoginPage.errorMessage()
      .should('be.visible')
      .and(
        'have.text',
        'Epic sadface: Sorry, this user has been locked out.'
      );
  });
});
