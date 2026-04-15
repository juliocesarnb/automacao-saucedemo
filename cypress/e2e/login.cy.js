describe('Fluxo de Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('TC-LOGIN-001: Deve logar com sucesso', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('.title').should('have.text', 'Products')
  })

  it('TC-LOGIN-002: Deve exibir erro para usuário bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    // Validando a mensagem que você mapeou no Notion
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out')
  })
}) 