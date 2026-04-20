import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import {
  registerPageRouteAliases,
  waitForRoute,
} from '../../support/network';

describe('UI validation flow', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    registerPageRouteAliases();
    LoginPage.visit();
    waitForRoute('@getLoginPage');
  });

  it('TC-UI-011 should keep the main add to cart action visible for the visual user', () => {
    LoginPage.login(users.visual.username, users.visual.password);

    waitForRoute('@getInventoryPage');
    cy.url().should('include', '/inventory.html');
    InventoryPage.pageTitle().should('be.visible').and('have.text', 'Products');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
    InventoryPage
      .addToCartButton('sauce-labs-backpack')
      .should('be.visible')
      .and('contain.text', 'Add to cart')
      .and('have.css', 'padding', '8px 16px');

    waitForRoute('@getImageAsset').then((interception) => {
      expect(interception.request.method).to.eq('GET');
      expect(interception.response?.statusCode).to.eq(200);
    });
  });
});
