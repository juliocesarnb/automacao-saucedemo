import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Checkout flow', () => {
  let users;

  const checkoutData = {
    firstName: 'Donald',
    lastName: 'Trump',
    postalCode: '60000-000',
  };

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
    LoginPage.usernameInput().should('be.visible');
  });

  it('TC-CHECKOUT-001 should complete a purchase from inventory to confirmation', () => {
    // Arrange
    const standardUser = users.standard;

    // Act
    LoginPage.login(standardUser.username, standardUser.password);

    cy.url().should('include', '/inventory.html');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage.addItemsToCart([
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
    ]);
    InventoryPage.cartBadge().should('be.visible').and('have.text', '2');

    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    CheckoutPage.cartItems().should('have.length', 2);

    CheckoutPage.startCheckout();
    cy.url().should('include', '/checkout-step-one.html');
    CheckoutPage.fillCheckoutForm(checkoutData);
    CheckoutPage.continueCheckout();

    cy.url().should('include', '/checkout-step-two.html');
    CheckoutPage.finishButton().should('be.visible');
    CheckoutPage.finishCheckout();

    // Assert
    cy.url().should('include', '/checkout-complete.html');
    CheckoutPage.completeHeader()
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    CheckoutPage.completeText().should('be.visible');
  });
});
