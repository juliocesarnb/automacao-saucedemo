import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CheckoutPage from '../../pages/CheckoutPage';
import {
  registerPageRouteAliases,
  waitForRoute,
} from '../../support/network';

describe('Cart flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    registerPageRouteAliases();
    LoginPage.visit();
    waitForRoute('@getLoginPage');
  });

  it('TC-CART-007 should keep the user on the cart page when checkout starts with an empty cart', () => {
    LoginPage.login(users.standard.username, users.standard.password);

    waitForRoute('@getInventoryPage');
    cy.url().should('include', '/inventory.html');
    InventoryPage.goToCart();

    waitForRoute('@getCartPage').then((interception) => {
      expect(interception.response.body).to.include('Your Cart');
    });

    cy.url().should('include', '/cart.html');
    CheckoutPage.cartItems().should('have.length', 0);

    CheckoutPage.startCheckout();

    waitForRoute('@getCheckoutStepOnePage');
    cy.url().should('include', '/checkout-step-one.html');
    cy.url().should('not.include', '/checkout-step-two.html');
    CheckoutPage.firstNameInput().should('be.visible');
    CheckoutPage.continueButton().should('be.visible');
  });

  it('TC-CART-008 should add a single item to the cart for the error user', () => {
    LoginPage.login(users.error.username, users.error.password);

    waitForRoute('@getInventoryPage');
    cy.url().should('include', '/inventory.html');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);

    InventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');

    InventoryPage.cartBadge().should('be.visible').and('have.text', '1');
    InventoryPage.removeFromCartButton('sauce-labs-bolt-t-shirt').should('be.visible');
  });
});
