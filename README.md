# 🧪 Automação de Testes E2E - SauceDemo

Este projeto consiste em uma suíte de testes automatizados End-to-End (E2E) para a aplicação web [SauceDemo](https://www.saucedemo.com/), utilizando o framework **Cypress**.

O objetivo principal é validar fluxos críticos da aplicação, identificar falhas intencionais (bugs) e demonstrar boas práticas de automação com foco em **qualidade, escalabilidade e manutenção**.

---

## 🎯 Objetivo do Projeto

* Validar o funcionamento de fluxos essenciais da aplicação
* Detectar bugs intencionais com diferentes perfis de usuários
* Demonstrar aplicação de boas práticas de automação
* Simular um ambiente real de testes em nível profissional

---

## 🧠 Estratégia de Teste

A estratégia foi baseada na validação de comportamentos específicos para diferentes tipos de usuários disponíveis na plataforma.

### 👥 Perfis de Usuário Testados:

* `standard_user` → fluxo normal
* `locked_out_user` → usuário bloqueado
* `performance_glitch_user` → problema de performance
* `error_user` → erros de lógica
* `visual_user` → problemas visuais

---

## ✅ Cenários Automatizados

| ID              | Cenário                     | Tipo       | Status Esperado |
| --------------- | --------------------------- | ---------- | --------------- |
| TC-LOGIN-001    | Login com sucesso           | Smoke      | ✅ Pass          |
| TC-LOGIN-002    | Login com usuário bloqueado | Smoke      | ✅ Pass          |
| TC-CART-003     | Adicionar item ao carrinho  | E2E        | ✅ Pass          |
| TC-CHECKOUT-004 | Fluxo completo de compra    | E2E        | ✅ Pass          |
| TC-PERF-005     | Validação de performance    | Regression | ❌ Fail          |
| TC-ERROR-006    | Falha ao adicionar item     | Regression | ❌ Fail          |
| TC-UI-007       | Problema visual             | Regression | ❌ Fail          |

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Cypress
* **Linguagem:** JavaScript (ES6+)
* **Gerenciador de Pacotes:** Node.js / npm
* **Versionamento:** Git & GitHub
* **Sistema Operacional:** Windows 11

---

## 🏗️ Arquitetura do Projeto

O projeto foi estruturado utilizando o padrão **Page Object Model (POM)**, amplamente utilizado em automação de testes para melhorar organização, reutilização e manutenção.

```plaintext id="2lq6r1"
cypress/
 ┣ e2e/
 ┃ ┣ inventory/
 ┃ ┃ ┣ add_to_cart.spec.cy.js
 ┃ ┃ ┗ checkout_flow.spec.cy.js
 ┃ ┣ ui/
 ┃ ┃ ┗ ui_validation.spec.cy.js
 ┃ ┗ users/
 ┃ ┃ ┗ edge_users.spec.cy.js
 ┣ smoke/
 ┃ ┗ auth/
 ┃ ┃ ┗ login.spec.cy.js
 ┣ pages/
 ┃ ┣ LoginPage.js
 ┃ ┣ InventoryPage.js
 ┃ ┗ CheckoutPage.js
 ┣ fixtures/
 ┃ ┗ users.json
 ┣ support/
 ┃ ┣ commands.js
 ┃ ┗ e2e.js
```

---

## 🧱 Padrão Page Object Model (POM)

O projeto utiliza o padrão **Page Object Model**, onde cada página da aplicação é representada por uma classe responsável pelas interações com a interface.

### ✔ Benefícios:

* Redução de duplicação de código
* Facilidade de manutenção
* Maior legibilidade dos testes
* Separação entre ações e validações

---

## 🚀 Como Executar o Projeto

### 🔹 1. Pré-requisitos

* Node.js instalado
* Git instalado

---

### 🔹 2. Clonar o repositório

```bash id="3b8fj9"
git clone https://github.com/juliocesarnb/automacao-saucedemo.git
cd automacao-saucedemo
```

---

### 🔹 3. Instalar dependências

```bash id="zqk3p8"
npm install
```

---

### 🔹 4. Executar os testes

#### ▶️ Modo Headless (terminal)

```bash id="z6r1xg"
npm test
```

---

#### 🖥️ Modo Interativo (Cypress UI)

```bash id="5qj9m1"
npx cypress open
```

---

## 📸 Evidências de Execução

### ❌ Testes que detectam falhas reais:

* Performance glitch user
* Error user
* Visual user

### 🎥 Execução automatizada:

Os testes geram automaticamente:

* 📷 Screenshots em falhas
* 🎥 Vídeos das execuções

---

## 💡 Boas Práticas Aplicadas

* ✔ Page Object Model (POM)
* ✔ Separação de responsabilidades
* ✔ Uso de fixtures para dados de teste
* ✔ Testes organizados por domínio (inventory, users, ui)
* ✔ Separação de testes Smoke, E2E e Regression
* ✔ Assertions robustas (validação de UI, URL e dados)
* ✔ Código reutilizável e escalável

---

## 📈 Possíveis Melhorias Futuras

* Integração com CI/CD (GitHub Actions)
* Testes de API (Supertest / Postman)
* Uso de `cy.intercept()` para mock de requisições
* Geração de relatórios automatizados
* Execução paralela de testes

---

## 👨‍💻 Autor

**Júlio César Nunes Barbosa**
Software Developer & QA Engineer

---

## 📌 Considerações Finais

Este projeto foi desenvolvido com foco em simular um ambiente real de automação de testes, aplicando conceitos e práticas utilizadas no mercado de QA.

Mais do que validar fluxos, o projeto demonstra capacidade de:

* Identificar falhas
* Estruturar testes escaláveis
* Escrever código limpo e manutenível

---
