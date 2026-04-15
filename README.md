# 🧪 Automação de Testes E2E - SauceDemo

Este repositório contém o projeto de automação de testes para o site [SauceDemo](https://www.saucedemo.com/), utilizando o framework **Cypress**. O foco principal foi criar uma suíte de testes que não apenas valida o "caminho feliz", mas também identifica bugs intencionais inseridos no ambiente para diferentes perfis de usuários.

---

## 🎯 Estratégia de Teste

A estratégia foi baseada no mapeamento de comportamentos específicos para cada tipo de usuário disponível na plataforma. Os detalhes dos casos de teste foram baseados no plano de testes estruturado no Notion.

### Cenários Automatizados:

| ID | Cenário | Perfil de Usuário | Status Esperado | Nota |
|---|---|---|---|---|
| **TC-001** | Login com Sucesso | `standard_user` | ✅ Pass | Valida o fluxo base. |
| **TC-002** | Login Bloqueado | `locked_out_user` | ✅ Pass | Valida mensagem de erro. |
| **TC-003** | Performance Glitch | `performance_glitch_user` | ❌ Fail | Detecta delay > 2s no login. |
| **TC-004** | Erro de Lógica | `error_user` | ❌ Fail | Detecta falha ao adicionar itens. |
| **TC-005** | Erro Visual | `visual_user` | ❌ Fail | Detecta desalinhamento de layout. |
| **TC-006** | Fluxo de Compra | `standard_user` | ✅ Pass | E2E completo (Add -> Checkout). |

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Cypress](https://www.cypress.io/)
- **Linguagem:** JavaScript (ES6+)
- **Ambiente:** Windows 11 / Node.js
- **Versionamento:** Git & GitHub

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### 2. Instalação
Clone este repositório e instale as dependências:

```bash
git clone [https://github.com/juliocesarnb/automacao-saucedemo.git](https://github.com/juliocesarnb/automacao-saucedemo.git)
cd automacao-saucedemo
npm install
