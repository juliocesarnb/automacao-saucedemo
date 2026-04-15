describe('Testes de Perfis com Erros', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('TC-PERF-010: Validar tempo de resposta (Performance Glitch User)', () => {
    cy.get('[data-test="username"]').type('performance_glitch_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    
    // Marcamos o tempo de início
    const startTime = performance.now()

    cy.get('[data-test="login-button"]').click().then(() => {
      cy.url().should('include', '/inventory.html')
      
      // Calculamos o tempo após o carregamento
      const endTime = performance.now()
      const duration = (endTime - startTime) / 1000

      // No seu Notion você disse que falha se for > 2s
      // Este teste vai passar no Cypress, mas você verá o log do tempo
      cy.log(`O carregamento demorou: ${duration.toFixed(2)} segundos`)
      expect(duration).to.be.lessThan(2) 
    })
  })

  it('TC-UI-011: Verificar falha de imagens (Problem User)', () => {
    cy.get('[data-test="username"]').type('problem_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Valida se a imagem da mochila é a correta
    // O Problem User coloca a imagem de um cachorro (sl-404.jpg)
    cy.get('#item_4_img_link > img')
      .should('have.attr', 'src')
      .and('not.include', 'backpack-1200x1500.jpg') // Aqui ele prova o erro
  })
})