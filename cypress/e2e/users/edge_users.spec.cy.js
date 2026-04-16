import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Edge user behaviors', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    LoginPage.visit();
  });

  it('TC-PERF-010 should load the inventory page within an acceptable time for the performance glitch user', () => {
    const startedAt = Date.now();

    LoginPage.login(users.performance.username, users.performance.password);

    cy.url().should('include', '/inventory.html').then(() => {
      const duration = Date.now() - startedAt;

      cy.log(`Inventory page load took ${duration} ms`);
      expect(duration).to.be.lessThan(10000);
    });

    InventoryPage.inventoryItems().should('have.length.greaterThan', 0);
  });

  it('TC-EDGE-011 should expose the wrong backpack image for the problem user', () => {
    LoginPage.login(users.problem.username, users.problem.password);

    cy.url().should('include', '/inventory.html');
    InventoryPage.productImage(4)
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'sl-404');
  });
});
