import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';
import {
  registerPageRouteAliases,
  waitForRoute,
} from '../../support/network';

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

    registerPageRouteAliases();
    LoginPage.visit();
    waitForRoute('@getLoginPage');
  });

  it('TC-CHECKOUT-001 should complete a purchase from inventory to confirmation', () => {
    LoginPage.login(users.standard.username, users.standard.password);

    waitForRoute('@getInventoryPage');
    cy.url().should('include', '/inventory.html');
    InventoryPage.addItemsToCart([
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
    ]);
    InventoryPage.cartBadge().should('be.visible').and('have.text', '2');

    InventoryPage.goToCart();

    waitForRoute('@getCartPage');
    cy.url().should('include', '/cart.html');
    CheckoutPage.cartItems().should('have.length', 2);

    CheckoutPage.startCheckout();

    waitForRoute('@getCheckoutStepOnePage');
    cy.url().should('include', '/checkout-step-one.html');
    CheckoutPage.fillCheckoutForm(checkoutData);
    CheckoutPage.continueCheckout();

    waitForRoute('@getCheckoutStepTwoPage');
    cy.url().should('include', '/checkout-step-two.html');
    CheckoutPage.finishCheckout();

    waitForRoute('@getCheckoutCompletePage').then((interception) => {
      expect(interception.response.body).to.include('Checkout: Complete!');
    });
    cy.url().should('include', '/checkout-complete.html');
    CheckoutPage.completeHeader()
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    CheckoutPage.completeText().should('be.visible');
  });
});
