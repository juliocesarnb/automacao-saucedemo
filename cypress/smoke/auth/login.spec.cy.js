import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Login smoke flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
    LoginPage.usernameInput().should('be.visible');
    LoginPage.passwordInput().should('be.visible');
    LoginPage.loginButton().should('be.visible').and('contain.text', 'Login');
  });

  it('TC-LOGIN-001 should authenticate a standard user and open the inventory page', () => {
    // Arrange
    const standardUser = users.standard;

    // Act
    LoginPage.login(standardUser.username, standardUser.password);

    // Assert
    cy.url().should('include', '/inventory.html');
    InventoryPage.pageTitle().should('be.visible').and('have.text', 'Products');
    InventoryPage.inventoryList().should('be.visible');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage.cartLink().should('be.visible');
  });

  it('TC-LOGIN-002 should display the exact locked user error message', () => {
    // Arrange
    const lockedUser = users.locked;

    // Act
    LoginPage.login(lockedUser.username, lockedUser.password);

    // Assert
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    LoginPage.errorMessage()
      .should('be.visible')
      .and(
        'have.text',
        'Epic sadface: Sorry, this user has been locked out.'
      );
    InventoryPage.inventoryList().should('not.exist');
  });
});
