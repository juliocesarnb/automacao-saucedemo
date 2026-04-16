class CheckoutPage {
  selectors = {
    cartItems: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    completeHeader: '.complete-header',
    completeText: '.complete-text',
    errorMessage: '[data-test="error"]',
  };

  cartItems() {
    return cy.get(this.selectors.cartItems);
  }

  checkoutButton() {
    return cy.get(this.selectors.checkoutButton);
  }

  firstNameInput() {
    return cy.get(this.selectors.firstNameInput);
  }

  lastNameInput() {
    return cy.get(this.selectors.lastNameInput);
  }

  postalCodeInput() {
    return cy.get(this.selectors.postalCodeInput);
  }

  continueButton() {
    return cy.get(this.selectors.continueButton);
  }

  finishButton() {
    return cy.get(this.selectors.finishButton);
  }

  completeHeader() {
    return cy.get(this.selectors.completeHeader);
  }

  completeText() {
    return cy.get(this.selectors.completeText);
  }

  errorMessage() {
    return cy.get(this.selectors.errorMessage);
  }

  startCheckout() {
    this.checkoutButton().click();
  }

  fillCheckoutForm({ firstName, lastName, postalCode }) {
    this.firstNameInput().clear().type(firstName);
    this.lastNameInput().clear().type(lastName);
    this.postalCodeInput().clear().type(postalCode);
  }

  continueCheckout() {
    this.continueButton().click();
  }

  finishCheckout() {
    this.finishButton().click();
  }
}

export default new CheckoutPage();
