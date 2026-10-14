# Desafio Técnico – QA Automation Engineer (Accenture)

Repositório destinado ao desafio técnico de **QA Automation Engineer** da **Accenture Brasil**, estruturado com altos padrões de qualidade de engenharia de testes, BDD (*Behavior-Driven Development*) com **Cucumber**, **Cypress**, **TypeScript**, padrão arquitetural **Service Object** / **Page Object**, geração contínua de relatórios e rastreabilidade total de evidências.

A aplicação-alvo dos testes é a plataforma [DemoQA](https://demoqa.com).

---

## 📋 Checklist de Entregas

| Item Solicitado | Onde Encontrar | Status |
| :--- | :--- | :---: |
| **Cenários de teste mapeados em BDD (Gherkin)** | [`docs/cenarios-gherkin.md`](docs/cenarios-gherkin.md) | ✅ Concluído |
| **Etapa 1: Automação de API (BookStore & Account)** | [`cypress/e2e/features/etapa-1-api/`](cypress/e2e/features/etapa-1-api/) | ✅ Concluído |
| **Evidências de execução da Etapa 1 (Logs, Payloads, Status)** | [`docs/evidencias/etapa-1-api/`](docs/evidencias/etapa-1-api/) | ✅ Concluído |
| **Etapa 2: Automação Frontend (5 cenários + bônus de 12 registros)** | [`cypress/e2e/features/etapa-2-frontend/`](cypress/e2e/features/etapa-2-frontend/) | ✅ Concluído |
| **Evidências de execução da Etapa 2 (Screenshots e Relatórios)** | [`docs/evidencias/etapa-2-frontend/`](docs/evidencias/etapa-2-frontend/) | ✅ Concluído |
| **README com guia de execução e arquitetura do projeto** | [`README.md`](README.md) *(este documento)* | ✅ Concluído |

---

## 📁 Estrutura do Repositório

O projeto é organizado por etapas de entrega e responsabilidades bem definidas:

```text
├── docs/
│   ├── cenarios-gherkin.md                  # Especificação BDD de todas as funcionalidades (Etapa 1 e Etapa 2)
│   └── evidencias/                          # Evidências versionadas de execução
│       ├── etapa-1-api/
│       │   ├── api_execution_evidence.md    # Relatório detalhado com tabelas, status, payloads e tempos
│       │   └── api_execution_evidence.json  # Resumo estruturado em JSON para auditoria
│       └── etapa-2-frontend/                # Capturas de tela e evidências visuais de cada marco
│           ├── CT01_practice_form_preenchido.png
│           ├── CT01_practice_form_modal.png
│           ├── CT02_browser_windows_sample.png
│           ├── CT03_webtables_registro_criado.png
│           ├── CT03_webtables_registro_editado.png
│           ├── CT03_webtables_registro_excluido.png
│           ├── CT04_webtables_12_registros_criados.png
│           ├── CT04_webtables_12_registros_deletados.png
│           ├── CT05_progress_bar_parado_25.png
│           ├── CT05_progress_bar_reset.png
│           └── CT06_sortable_ordenado.png
├── cypress/
│   ├── e2e/
│   │   ├── features/                        # Arquivos de especificação BDD (.feature)
│   │   │   ├── etapa-1-api/
│   │   │   │   └── bookstore_account.feature
│   │   │   └── etapa-2-frontend/
│   │   │       ├── practice_form.feature
│   │   │       ├── browser_windows.feature
│   │   │       ├── web_tables.feature
│   │   │       ├── progress_bar.feature
│   │   │       └── sortable.feature
│   │   └── step_definitions/                # Implementação dos passos dos testes (TypeScript)
│   │       ├── etapa-1-api/
│   │       │   └── bookstore_account.steps.ts
│   │       └── etapa-2-frontend/
│   │           ├── practice_form.steps.ts
│   │           ├── browser_windows.steps.ts
│   │           ├── web_tables.steps.ts
│   │           ├── progress_bar.steps.ts
│   │           └── sortable.steps.ts
│   ├── services/                            # Camada de serviços de API (Service Object Pattern)
│   │   └── etapa-1-api/
│   │       ├── accountService.ts            # Gerenciamento de usuários e autenticação
│   │       └── bookStoreService.ts          # Consulta do catálogo e locação de livros
│   ├── pages/                               # Page Objects para automação de UI (Etapa 2)
│   │   └── etapa-2-frontend/
│   │       ├── practiceFormPage.ts          # Page Object para formulário de estudante
│   │       ├── browserWindowsPage.ts        # Page Object para manipulação de abas/janelas
│   │       ├── webTablesPage.ts             # Page Object para manipulação de tabelas e registros
│   │       ├── progressBarPage.ts           # Page Object para controle da barra de progresso
│   │       └── sortablePage.ts              # Page Object para reordenação via drag and drop
│   ├── fixtures/                            # Massas de dados estáticas e arquivos para upload (.txt)
│   │   └── sample-upload.txt
│   └── support/
│       ├── utils/
│       │   └── evidenceHelper.ts            # Utilitário central de coleta e registro de evidências
│       └── e2e.ts                           # Configurações globais e polyfill para React 19 / DemoQA
├── generate-report.mjs                      # Gerador do relatório consolidado em HTML
├── cypress.config.ts                        # Configuração do Cypress com esbuild e cucumber preprocessor
├── .cypress-cucumber-preprocessorrc.json    # Configurações do Cucumber BDD
├── tsconfig.json                            # Configurações de compilação do TypeScript
├── package.json
└── README.md
```

---

## 🛠️ Tecnologias e Padrões Adotados

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (tipagem estática, segurança e manutenibilidade).
* **Framework E2E & API:** [Cypress 16](https://www.cypress.io/).
* **BDD / Gherkin:** `@badeball/cypress-cucumber-preprocessor` com bundler `@bahmutov/cypress-esbuild-preprocessor`.
* **Geração de Dados Dinâmicos:** `@faker-js/faker` (evita massa viciada e conflito de duplicidade).
* **Design Patterns:**
  * **Service Object Pattern:** Isolamento das rotas, headers e payloads da API.
  * **Page Object Pattern (POM):** Encapsulamento de seletores e ações de tela (Etapa 2).
* **Relatórios e Evidências:**
  * [Multiple Cucumber HTML Reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) para dashboards visuais.
  * Markdown e JSON estruturados em `docs/evidencias/` com o ciclo completo de cada requisição.
  * Capturas de tela automáticas integradas aos passos de validação dos testes de Frontend.

---

## 🤖 Como Executar a Automação de Testes

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior).
* Gerenciador de pacotes `npm`.

### 1. Clonar o repositório
```bash
git clone https://github.com/victorcnascimento/desafio-tecnico-accenture.git
cd desafio-tecnico-accenture
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Comandos de Execução dos Testes

| Comando | Descrição |
|---|---|
| `npm run test:api` | Executa a suíte de testes de **API (Etapa 1)** em modo headless |
| `npm run test:api:report` | Executa a **Etapa 1** e gera automaticamente o relatório HTML e evidências |
| `npm run test:frontend` | Executa a suíte de testes de **Frontend (Etapa 2)** em modo headless |
| `npm run test:frontend:report` | Executa a **Etapa 2** e gera o relatório consolidado |
| `npm run test:all:report` | Executa **todos os testes (API + Frontend)** e consolida no relatório |
| `npm run test:open` | Abre a **interface gráfica interativa** do Cypress |
| `npm run report` | Gera o relatório visual em HTML a partir dos últimos resultados |

---

## 📊 Detalhamento da Etapa 1 – Automação de API (BookStore & Account)

A **Etapa 1** valida o fluxo completo de ciclo de vida de usuário, segurança e locação de livros em uma única execução contínua:

### Cenários de Teste Automatizados (6 Cenários BDD):
1. **`@passo1` `@criar_usuario`:** Criar um novo usuário no sistema (`POST /Account/v1/User`)
2. **`@passo2` `@gerar_token`:** Gerar um token de acesso para o usuário criado (`POST /Account/v1/GenerateToken`)
3. **`@passo3` `@verificar_autorizacao`:** Confirmar se o usuário criado está autorizado (`POST /Account/v1/Authorized`)
4. **`@passo4` `@listar_livros`:** Listar os livros disponíveis no catálogo (`GET /BookStore/v1/Books`)
5. **`@passo5` `@alugar_livros`:** Alugar dois livros de livre escolha (`POST /BookStore/v1/Books`)
6. **`@passo6` `@detalhes_usuario`:** Listar os detalhes do usuário com os livros escolhidos (`GET /Account/v1/User/{userID}`)

### Matriz de Execução e Status da Etapa 1:
| # | Cenário BDD Executado | Método / Endpoint | Status HTTP | Resultado |
|---|---|---|:---:|:---:|
| 1 | 1. Criar um novo usuário no sistema | `POST /Account/v1/User` | `201 Created` | ✅ PASSOU |
| 2 | 2. Gerar um token de acesso para o usuário | `POST /Account/v1/GenerateToken` | `200 OK` | ✅ PASSOU |
| 3 | 3. Confirmar se o usuário criado está autorizado | `POST /Account/v1/Authorized` | `200 OK` | ✅ PASSOU |
| 4 | 4. Listar os livros disponíveis no catálogo | `GET /BookStore/v1/Books` | `200 OK` | ✅ PASSOU |
| 5 | 5. Alugar dois livros de livre escolha | `POST /BookStore/v1/Books` | `201 Created` | ✅ PASSOU |
| 6 | 6. Listar os detalhes do usuário com os livros | `GET /Account/v1/User/{userID}` | `200 OK` | ✅ PASSOU |

> O relatório com payloads completos, respostas da API e tempos de resposta está disponível em [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](docs/evidencias/etapa-1-api/api_execution_evidence.md).

---

## 🎨 Detalhamento da Etapa 2 – Automação Frontend (DemoQA UI)

A **Etapa 2** contempla a automação completa dos elementos visuais e comportamentais da plataforma DemoQA através de Page Objects robustos:

### Cenários de Teste Automatizados (6 Cenários BDD):
1. **Practice Form (`practice_form.feature`):**
   * Preenchimento de todos os campos com dados dinâmicos do `@faker-js/faker`.
   * Upload de arquivo `.txt` válido localizado em [`cypress/fixtures/sample-upload.txt`](cypress/fixtures/sample-upload.txt).
   * Submissão e validação do modal *"Thanks for submitting the form"*.
   * Fechamento do modal de confirmação.

2. **Browser Windows (`browser_windows.feature`):**
   * Acesso à funcionalidade na seção *Alerts, Frame & Windows*.
   * Acionamento do botão *"New Window"* com stub controlado de abertura de janela.
   * Validação da mensagem *"This is a sample page"* e retorno do foco à janela principal.

3. **Web Tables – CRUD (`web_tables.feature`):**
   * Criação de novo registro com dados dinâmicos.
   * Busca e edição do registro cadastrado.
   * Exclusão do registro editado e garantia de que não consta mais na listagem.

4. **Web Tables – Bônus (`web_tables.feature`):**
   * Inserção dinâmica consecutiva de 12 registros via Cucumber.
   * Validação da paginação e persistência dos dados inseridos.
   * Remoção em lote de todos os 12 registros criados, restaurando a tabela ao estado original.

5. **Progress Bar (`progress_bar.feature`):**
   * Início da contagem ao clicar em *"Start"*.
   * Interrupção com clique em *"Stop"* em limite $\le 25\%$ com asserção explícita.
   * Retomada do progresso até 100%.
   * Acionamento do botão *"Reset"* e validação do retorno da barra a 0%.

6. **Sortable – Drag and Drop (`sortable.feature`):**
   * Acesso ao submenu *Sortable* na seção *Interactions*.
   * Aplicação de métodos de *drag and drop* para reordenação dos elementos.
   * Validação estrita da ordem sequencial crescente dos elementos de *"One"* a *"Six"*.

### Matriz de Execução e Status da Etapa 2:
| # | Funcionalidade | Cenário BDD Executado | Tempo | Resultado | Evidência Associada |
|---|---|---|:---:|:---:|---|
| 1 | **Practice Form** | Submeter formulário com Faker e upload `.txt` | ~11s | ✅ PASSOU | [`CT01_practice_form_modal.png`](docs/evidencias/etapa-2-frontend/CT01_practice_form_modal.png) |
| 2 | **Browser Windows** | Validar mensagem *"This is a sample page"* | ~4s | ✅ PASSOU | [`CT02_browser_windows_sample.png`](docs/evidencias/etapa-2-frontend/CT02_browser_windows_sample.png) |
| 3 | **Web Tables** | Criar, editar e excluir um registro (CRUD) | ~12s | ✅ PASSOU | [`CT03_webtables_registro_criado.png`](docs/evidencias/etapa-2-frontend/CT03_webtables_registro_criado.png) |
| 4 | **Web Tables [Bônus]** | Inserir e deletar 12 registros dinâmicos | ~52s | ✅ PASSOU | [`CT04_webtables_12_registros_criados.png`](docs/evidencias/etapa-2-frontend/CT04_webtables_12_registros_criados.png) |
| 5 | **Progress Bar** | Parar em $\le 25\%$ e resetar após 100% | ~14s | ✅ PASSOU | [`CT05_progress_bar_reset.png`](docs/evidencias/etapa-2-frontend/CT05_progress_bar_reset.png) |
| 6 | **Sortable** | Reordenar elementos de "One" a "Six" via drag and drop | ~5s | ✅ PASSOU | [`CT06_sortable_ordenado.png`](docs/evidencias/etapa-2-frontend/CT06_sortable_ordenado.png) |

---

## 📈 Consolidação Geral dos Testes (API + Frontend)

* **Total de Specs:** 6
* **Total de Cenários BDD:** 12
* **Cenários Aprovados:** 12 (100%)
* **Cenários Reprovados:** 0 (0%)
* **Tempo Total de Execução:** ~1 minuto e 50 segundos

---

**Autor:** Victor Cezari Nascimento  
**Data:** 13/10/2026
