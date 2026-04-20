import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Edge user behaviors', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
    LoginPage.usernameInput().should('be.visible');
  });

  it('TC-PERF-010 should allow the performance glitch user to reach the inventory page', () => {
    // Arrange
    const performanceUser = users.performance;

    // Act
    LoginPage.login(performanceUser.username, performanceUser.password);

    // Assert
    cy.url().should('include', '/inventory.html');
    InventoryPage.pageTitle().should('be.visible').and('have.text', 'Products');
    InventoryPage.inventoryList().should('be.visible');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
  });

  it('TC-EDGE-011 should expose the wrong backpack image for the problem user', () => {
    // Arrange
    const problemUser = users.problem;

    // Act
    LoginPage.login(problemUser.username, problemUser.password);

    // Assert
    cy.url().should('include', '/inventory.html');
    InventoryPage.productImage(4)
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'sl-404');
  });
});
