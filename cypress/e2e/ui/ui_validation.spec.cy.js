import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('UI validation flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
    LoginPage.usernameInput().should('be.visible');
  });

  it('TC-UI-011 should render the main add to cart action for the visual user', () => {
    // Arrange
    const visualUser = users.visual;

    // Act
    LoginPage.login(visualUser.username, visualUser.password);

    // Assert
    cy.url().should('include', '/inventory.html');
    InventoryPage.pageTitle().should('be.visible').and('have.text', 'Products');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage
      .addToCartButton('sauce-labs-backpack')
      .should('be.visible')
      .and('contain.text', 'Add to cart');
    InventoryPage.cartLink().should('be.visible');
  });
});
