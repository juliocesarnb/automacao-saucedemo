describe('Fluxo de Carrinho e Checkout', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('TC-CART-007: Impedir checkout com carrinho vazio', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Vai direto ao carrinho sem adicionar itens
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    // Validação do erro que você achou: O sistema NÃO deve permitir avançar
    // Se ele for para a página de informações, o teste falha (como no seu plano)
    cy.url().should('not.include', '/checkout-step-one.html')
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('TC-CART-008: Validar inconsistência de botões (Error User)', () => {
    cy.get('[data-test="username"]').type('error_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Tenta adicionar o 3º item (Bolt T-Shirt) que você mapeou que falha
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    
    // O contador do carrinho deveria ser 1, mas no error_user ele continua 0 ou vazio
    cy.get('.shopping_cart_badge').should('exist').and('have.text', '1')
  })
})