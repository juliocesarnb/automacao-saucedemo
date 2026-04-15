describe('Testes de UI e Layout', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('TC-UI-011: Verificar desalinhamento de layout (Visual User)', () => {
    cy.get('[data-test="username"]').type('visual_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // O visual_user quebra o alinhamento de vários elementos.
    // Vamos testar se o botão de "Add to cart" tem o preenchimento/margem correta.
    // Se o layout estiver "torto", as propriedades de CSS podem variar.
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should('be.visible')
      .and('have.css', 'padding', '8px 16px') // O valor padrão esperado
  })
})