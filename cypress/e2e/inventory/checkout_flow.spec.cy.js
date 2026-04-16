import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Checkout flow', () => {
  let users;

  const checkoutData = {
    firstName: 'Julio',
    lastName: 'Cesar',
    postalCode: '60000-000',
  };

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
  });

  it('TC-CHECKOUT-001 should complete a purchase from inventory to confirmation', () => {
    LoginPage.login(users.standard.username, users.standard.password);

    cy.url().should('include', '/inventory.html');
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
    CheckoutPage.finishCheckout();

    cy.url().should('include', '/checkout-complete.html');
    CheckoutPage.completeHeader()
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    CheckoutPage.completeText().should('be.visible');
  });
});
