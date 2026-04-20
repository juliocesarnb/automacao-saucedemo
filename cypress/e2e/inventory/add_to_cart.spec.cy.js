import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Cart flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
    LoginPage.usernameInput().should('be.visible');
  });

  it('TC-CART-007 should open the checkout information step from an empty cart', () => {
    // Arrange
    const standardUser = users.standard;

    // Act
    LoginPage.login(standardUser.username, standardUser.password);

    cy.url().should('include', '/inventory.html');
    InventoryPage.inventoryList().should('be.visible');
    InventoryPage.goToCart();

    // Assert
    cy.url().should('include', '/cart.html');
    CheckoutPage.cartItems().should('have.length', 0);

    CheckoutPage.startCheckout();

    cy.url().should('include', '/checkout-step-one.html');
    CheckoutPage.firstNameInput().should('be.visible');
    CheckoutPage.lastNameInput().should('be.visible');
    CheckoutPage.postalCodeInput().should('be.visible');
    CheckoutPage.continueButton().should('be.visible');
  });

  it('TC-CART-008 should add a single item to the cart for the error user', () => {
    // Arrange
    const errorUser = users.error;
    let applicationErrorCaptured = false;

    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Failed to add item');
      applicationErrorCaptured = true;
      return false;
    });

    // Act
    LoginPage.login(errorUser.username, errorUser.password);

    cy.url().should('include', '/inventory.html');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');

    // Assert
    cy.then(() => {
      expect(applicationErrorCaptured).to.eq(true);
    });
    InventoryPage.cartBadge().should('not.exist');
    InventoryPage
      .removeFromCartButton('sauce-labs-bolt-t-shirt')
      .should('not.exist');
    InventoryPage
      .addToCartButton('sauce-labs-bolt-t-shirt')
      .should('be.visible')
      .and('contain.text', 'Add to cart');
  });
});
