import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import {
  registerPageRouteAliases,
  waitForRoute,
} from '../../support/network';

describe('Edge user behaviors', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    registerPageRouteAliases();
    LoginPage.visit();
    waitForRoute('@getLoginPage');
  });

  it('TC-PERF-010 should load the inventory page within an acceptable time for the performance glitch user', () => {
    const startedAt = Date.now();

    LoginPage.login(users.performance.username, users.performance.password);

    waitForRoute('@getInventoryPage').then((interception) => {
      const duration = Date.now() - startedAt;

      expect(interception.response?.statusCode).to.eq(200);
      cy.log(`Inventory page load took ${duration} ms`);
      expect(duration).to.be.lessThan(10000);
    });

    cy.url().should('include', '/inventory.html');
    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
  });

  it('TC-EDGE-011 should expose the wrong backpack image for the problem user', () => {
    LoginPage.login(users.problem.username, users.problem.password);

    waitForRoute('@getInventoryPage');
    cy.url().should('include', '/inventory.html');
    InventoryPage.productImage(4)
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'sl-404');

    waitForRoute('@getImageAsset').then((interception) => {
      expect(interception.request.url).to.include('.jpg');
      expect(interception.response?.statusCode).to.eq(200);
    });
  });
});
