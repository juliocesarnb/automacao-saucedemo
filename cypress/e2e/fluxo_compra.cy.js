describe('Fluxo de Compra', () => {
  it('Deve realizar uma compra do início ao fim com sucesso', () => {
    cy.visit('/')

    // Login
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Adicionar produtos ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    
    // Ir para o carrinho e Checkout
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    // Preencher dados de envio
    cy.get('[data-test="firstName"]').type('Júlio')
    cy.get('[data-test="lastName"]').type('César')
    cy.get('[data-test="postalCode"]').type('60000-000')
    cy.get('[data-test="continue"]').click()

    // Finalizar compra
    cy.get('[data-test="finish"]').click()

    // Validação Final
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })
})