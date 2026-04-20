# 🧪 Automação de Testes E2E - SauceDemo

Este repositório contém um projeto completo de automação de testes End-to-End (E2E) para o site SauceDemo, utilizando o framework Cypress.

O objetivo do projeto é validar fluxos críticos de um e-commerce, identificar comportamentos inconsistentes e aplicar boas práticas de automação utilizadas no mercado, como Page Object Model (POM), testes resilientes e integração com CI/CD.

---

## 🎯 Estratégia de Teste

A estratégia foi baseada em diferentes perfis de usuários e cenários de negócio, cobrindo:

- Fluxos críticos (login, carrinho, checkout)
- Cenários positivos e negativos
- Usuários com comportamentos problemáticos (bugados)
- Validação de UI e comportamento da aplicação

---

## ✅ Cenários Automatizados

| ID | Cenário | Tipo | Status |
|----|--------|------|--------|
| TC-LOGIN-001 | Login com sucesso | Smoke | Pass |
| TC-LOGIN-002 | Login com usuário bloqueado | Smoke | Pass |
| TC-CART-007 | Checkout com carrinho vazio | E2E | Pass |
| TC-CART-008 | Adição de item com erro (error_user) | E2E | Fail (bug esperado) |
| TC-CHECKOUT-001 | Fluxo completo de compra | E2E | Pass |
| TC-UI-011 | Validação de UI (visual_user) | E2E | Pass |
| TC-PERF-010 | Performance (performance_glitch_user) | E2E | Pass |
| TC-EDGE-011 | Validação de comportamento inconsistente | E2E | Pass |

---

## 🧱 Arquitetura do Projeto
