class LoginPage {
  selectors = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
  };

  visit() {
    cy.visit('/');
  }

  usernameInput() {
    return cy.get(this.selectors.usernameInput);
  }

  passwordInput() {
    return cy.get(this.selectors.passwordInput);
  }

  loginButton() {
    return cy.get(this.selectors.loginButton);
  }

  errorMessage() {
    return cy.get(this.selectors.errorMessage);
  }

  typeUsername(username) {
    this.usernameInput().clear().type(username);
  }

  typePassword(password) {
    this.passwordInput().clear().type(password);
  }

  submitLogin() {
    this.loginButton().click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.submitLogin();
  }
}

export default new LoginPage();
