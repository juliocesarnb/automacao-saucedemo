import {
  mockCheckoutApiSuccess,
  mockInventoryApiEmpty,
  mockInventoryApiError,
  mockInventoryApiSlow,
  mockInventoryApiSuccess,
} from '../../support/network';

describe('API control with cy.intercept', () => {
  beforeEach(() => {
    cy.visit('about:blank');
  });

  it('TC-API-001 should mock the inventory API with fixture data', () => {
    mockInventoryApiSuccess();

    cy.window().then((win) => {
      win.fetch('https://mock-api.local/api/inventory');
    });

    cy.wait('@getProducts').then((interception) => {
      expect(interception.request.method).to.eq('GET');
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.items).to.have.length.greaterThan(0);
      expect(interception.response.body.items[0].name).to.eq(
        'Sauce Labs Backpack'
      );
    });
  });

  it('TC-API-002 should return an empty catalog when the inventory API is mocked as empty', () => {
    mockInventoryApiEmpty();

    cy.window().then((win) => {
      win.fetch('https://mock-api.local/api/inventory');
    });

    cy.wait('@getProductsEmpty').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.items).to.have.length(0);
    });
  });

  it('TC-API-003 should simulate a 500 error from the inventory API', () => {
    mockInventoryApiError();

    cy.window().then((win) => {
      win.fetch('https://mock-api.local/api/inventory');
    });

    cy.wait('@getProductsError').then((interception) => {
      expect(interception.response.statusCode).to.eq(500);
      expect(interception.response.body.message).to.eq('Internal Server Error');
    });
  });

  it('TC-API-004 should simulate a slow inventory API without using cy.wait(time)', () => {
    mockInventoryApiSlow();

    cy.window().then((win) => {
      win.fetch('https://mock-api.local/api/inventory');
    });

    cy.wait('@getProductsSlow').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.items).to.have.length(3);
    });
  });

  it('TC-API-005 should validate the mocked checkout request and response payload', () => {
    mockCheckoutApiSuccess();

    cy.window().then((win) => {
      win.fetch('https://mock-api.local/api/checkout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: 1,
              quantity: 1,
            },
            {
              id: 2,
              quantity: 1,
            },
          ],
          shipping: {
            firstName: 'Julio',
            lastName: 'Cesar',
            postalCode: '60000-000',
          },
        }),
      });
    });

    cy.wait('@postCheckout').then((interception) => {
      const requestBody =
        typeof interception.request.body === 'string'
          ? JSON.parse(interception.request.body)
          : interception.request.body;

      expect(interception.request.method).to.eq('POST');
      expect(requestBody.shipping.firstName).to.eq('Julio');
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.orderId).to.eq('ORDER-2026-000123');
      expect(interception.response.body.items).to.have.length(2);
    });
  });
});
