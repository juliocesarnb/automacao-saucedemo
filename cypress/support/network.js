export const registerPageRouteAliases = () => {
  cy.intercept(
    {
      url: '**/*',
      middleware: true,
    },
    (req) => {
      req.on('before:response', (res) => {
        res.headers['cache-control'] = 'no-store';
      });
    }
  );

  cy.intercept('GET', '**/').as('getLoginPage');
  cy.intercept('GET', '**/inventory.html').as('getInventoryPage');
  cy.intercept('GET', '**/cart.html').as('getCartPage');
  cy.intercept('GET', '**/checkout-step-one.html').as('getCheckoutStepOnePage');
  cy.intercept('GET', '**/checkout-step-two.html').as('getCheckoutStepTwoPage');
  cy.intercept('GET', '**/checkout-complete.html').as('getCheckoutCompletePage');
  cy.intercept('GET', '**/*.jpg').as('getImageAsset');
};

export const waitForRoute = (alias, expectedStatusCode = 200) => {
  return cy.wait(alias).then((interception) => {
    expect(interception.response?.statusCode).to.eq(expectedStatusCode);
    return interception;
  });
};

export const mockInventoryApiSuccess = () => {
  cy.intercept('GET', '**/api/inventory*', {
    statusCode: 200,
    fixture: 'products.json',
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  }).as('getProducts');
};

export const mockInventoryApiEmpty = () => {
  cy.intercept('GET', '**/api/inventory*', {
    statusCode: 200,
    body: {
      items: [],
    },
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  }).as('getProductsEmpty');
};

export const mockInventoryApiError = () => {
  cy.intercept('GET', '**/api/inventory*', {
    statusCode: 500,
    body: {
      message: 'Internal Server Error',
    },
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  }).as('getProductsError');
};

export const mockInventoryApiSlow = () => {
  cy.intercept('GET', '**/api/inventory*', {
    statusCode: 200,
    fixture: 'products.json',
    delay: 1500,
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  }).as('getProductsSlow');
};

export const mockCheckoutApiSuccess = () => {
  cy.intercept('POST', '**/api/checkout', {
    statusCode: 201,
    fixture: 'checkout.json',
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  }).as('postCheckout');
};
