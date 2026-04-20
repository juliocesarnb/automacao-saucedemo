const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '3gha36',
  video: true,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false, // Útil para evitar problemas de segurança em alguns redirecionamentos

  e2e: {
    baseUrl: 'https://www.saucedemo.com', // Adicionar a BaseURL economiza tempo nos scripts
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx}',
      'cypress/smoke/**/*.cy.{js,jsx}',
    ],
    testIsolation: true,
  },
});
