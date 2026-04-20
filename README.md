🧪 Automação de Testes E2E - SauceDemo

Este repositório contém um projeto completo de automação de testes End-to-End (E2E) para o site SauceDemo, utilizando o framework Cypress.

O objetivo do projeto é validar fluxos críticos de um e-commerce, identificar comportamentos inconsistentes e aplicar boas práticas de automação utilizadas no mercado, como Page Object Model (POM), testes resilientes e integração com CI/CD.

🎯 Estratégia de Teste

A estratégia foi baseada em diferentes perfis de usuários e cenários de negócio, cobrindo:

Fluxos críticos (login, carrinho, checkout)
Cenários positivos e negativos
Usuários com comportamentos problemáticos (bugados)
Validação de UI e comportamento da aplicação
✅ Cenários Automatizados
ID	Cenário	Tipo	Status
TC-LOGIN-001	Login com sucesso	Smoke	Pass
TC-LOGIN-002	Login com usuário bloqueado	Smoke	Pass
TC-CART-007	Checkout com carrinho vazio	E2E	Pass
TC-CART-008	Adição de item com erro (error_user)	E2E	Fail (bug esperado)
TC-CHECKOUT-001	Fluxo completo de compra	E2E	Pass
TC-UI-011	Validação de UI (visual_user)	E2E	Pass
TC-PERF-010	Performance (performance_glitch_user)	E2E	Pass
TC-EDGE-011	Validação de comportamento inconsistente	E2E	Pass
🧱 Arquitetura do Projeto

O projeto foi estruturado seguindo boas práticas para escalabilidade e manutenção:

cypress
 ┣ e2e
 ┃ ┣ inventory
 ┃ ┣ ui
 ┃ ┗ users
 ┣ fixtures
 ┣ pages          # Page Object Model (POM)
 ┣ smoke
 ┣ support
 ┗ videos / screenshots
🔥 Diferenciais Técnicos
Implementação de Page Object Model (POM) para separação entre testes e lógica de UI
Uso de seletores estáveis (data-test)
Testes organizados por escopo (Smoke e E2E)
Aplicação de estratégias anti-flaky:
Remoção de cy.wait() fixo
Sincronização baseada no estado da aplicação
Uso de fixtures para controle de dados
Estrutura modular e reutilizável
Tratamento de erros reais da aplicação (ex: error_user)
🔄 CI/CD

O projeto está integrado com GitHub Actions.

Pipeline:
Executa automaticamente a cada push ou pull request
Roda todos os testes em modo headless
Gera:
vídeos
screenshots em caso de falha
🛠️ Tecnologias Utilizadas
Cypress
JavaScript (ES6+)
Node.js
GitHub Actions
Page Object Model (POM)
🚀 Como Executar o Projeto
1. Pré-requisitos
Node.js instalado
2. Instalação
git clone https://github.com/juliocesarnb/automacao-saucedemo.git
cd automacao-saucedemo
npm install
3. Execução dos Testes
Modo Headless (CI)
npm test
Modo Interativo (GUI)
npx cypress open
Executar apenas Smoke Tests
npm run test:smoke
Executar apenas E2E
npm run test:e2e
📊 Boas Práticas Aplicadas
Separação entre teste e implementação (POM)
Testes independentes e determinísticos
Evitar dependência de tempo (wait fixo)
Uso de dados controlados (fixtures)
Organização por contexto (smoke, e2e)
Código limpo e reutilizável
⚠️ Observações Importantes
Alguns testes falham propositalmente para demonstrar a detecção de bugs reais da aplicação (ex: error_user)
O projeto não depende de mocks, pois valida o comportamento real da aplicação
👨‍💻 Autor

Júlio Cesar Nunes Barbosa
QA Automation Engineer

GitHub: https://github.com/juliocesarnb
LinkedIn: (adicione aqui)
📌 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

Demonstrar habilidades em automação de testes E2E
Aplicar práticas utilizadas no mercado
Servir como projeto de portfólio para oportunidades em QA Automation
