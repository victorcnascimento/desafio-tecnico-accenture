# Especificação de Cenários de Teste em Gherkin (BDD)

**Projeto:** Desafio Técnico de QA Automation  
**Avaliador:** Accenture Brasil  
**Plataforma de Testes:** [DemoQA](https://demoqa.com)  
**Autor:** Victor Cezari Nascimento  
**Data:** 13/10/2026  
**Versão:** 1.0.0  

---

## 1. Mapeamento de Requisitos e Critérios de Aceite

| Código | Módulo / Funcionalidade | Descrição do Critério de Aceite | Status |
| :---: | :--- | :--- | :---: |
| **CA01** | **API - Account & BookStore** | O sistema deve permitir criar um usuário dinâmico, gerar token JWT, verificar autorização, listar o catálogo de livros, alugar 2 livros e validar a lista final de livros no perfil do usuário em execução contínua. | ✅ Concluído |
| **CA02** | **Frontend - Practice Form** | O usuário deve preencher todos os campos do formulário com dados aleatórios, anexar um arquivo `.txt` válido do repositório, submeter, validar a abertura do modal de confirmação e fechá-lo. | ⏳ Em desenvolvimento |
| **CA03** | **Frontend - Browser Windows** | Ao clicar em "New Window", o sistema deve abrir uma nova janela, validar a mensagem *"This is a sample page"* e fechar a nova janela retornando o controle à página original. | ⏳ Em desenvolvimento |
| **CA04** | **Frontend - Web Tables** | O sistema deve permitir criar um novo registro, editar os dados desse registro, excluí-lo da tabela e validar sua remoção. | ⏳ Em desenvolvimento |
| **CA05** | **Frontend - Web Tables [Bônus]** | O teste deve inserir dinamicamente 12 registros através do Cucumber e, em seguida, remover todos os 12 registros, restaurando o estado da tabela. | ⏳ Em desenvolvimento |
| **CA06** | **Frontend - Progress Bar** | O teste deve acionar o botão "Start", interromper a barra antes ou em 25%, validar $\le 25\%$, retomar até atingir 100% e acionar o botão de reset retornando a barra para 0%. | ⏳ Em desenvolvimento |
| **CA07** | **Frontend - Sortable** | O teste deve reordenar os elementos da lista utilizando operações de drag and drop até que estejam na ordem sequencial crescente de "One" a "Six". | ⏳ Em desenvolvimento |

---

## 2. Matriz de Rastreabilidade de Cenários BDD

| ID | Cenário | Tags | Arquivo de Feature | Implementação (Steps) | Evidência Associada | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **CT-API-01** | Passo 1: Criar um novo usuário no sistema | `@api` `@passo1` `@criar_usuario` | [`cypress/e2e/features/etapa-1-api/bookstore_account.feature`](../cypress/e2e/features/etapa-1-api/bookstore_account.feature) | [`cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts`](../cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts) | [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](evidencias/etapa-1-api/api_execution_evidence.md) | ✅ Passou |
| **CT-API-02** | Passo 2: Gerar um token de acesso para o usuário criado | `@api` `@passo2` `@gerar_token` | [`cypress/e2e/features/etapa-1-api/bookstore_account.feature`](../cypress/e2e/features/etapa-1-api/bookstore_account.feature) | [`cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts`](../cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts) | [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](evidencias/etapa-1-api/api_execution_evidence.md) | ✅ Passou |
| **CT-API-03** | Passo 3: Confirmar se o usuário criado está autorizado | `@api` `@passo3` `@verificar_autorizacao` | [`cypress/e2e/features/etapa-1-api/bookstore_account.feature`](../cypress/e2e/features/etapa-1-api/bookstore_account.feature) | [`cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts`](../cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts) | [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](evidencias/etapa-1-api/api_execution_evidence.md) | ✅ Passou |
| **CT-API-04** | Passo 4: Listar os livros disponíveis no catálogo | `@api` `@passo4` `@listar_livros` | [`cypress/e2e/features/etapa-1-api/bookstore_account.feature`](../cypress/e2e/features/etapa-1-api/bookstore_account.feature) | [`cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts`](../cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts) | [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](evidencias/etapa-1-api/api_execution_evidence.md) | ✅ Passou |
| **CT-API-05** | Passo 5: Alugar dois livros de livre escolha | `@api` `@passo5` `@alugar_livros` | [`cypress/e2e/features/etapa-1-api/bookstore_account.feature`](../cypress/e2e/features/etapa-1-api/bookstore_account.feature) | [`cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts`](../cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts) | [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](evidencias/etapa-1-api/api_execution_evidence.md) | ✅ Passou |
| **CT-API-06** | Passo 6: Listar os detalhes do usuário com os livros escolhidos | `@api` `@passo6` `@detalhes_usuario` | [`cypress/e2e/features/etapa-1-api/bookstore_account.feature`](../cypress/e2e/features/etapa-1-api/bookstore_account.feature) | [`cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts`](../cypress/e2e/step_definitions/etapa-1-api/bookstore_account.steps.ts) | [`docs/evidencias/etapa-1-api/api_execution_evidence.md`](evidencias/etapa-1-api/api_execution_evidence.md) | ✅ Passou |
| **CT-UI-01** | Submissão de Practice Form com dados randômicos e upload | `@frontend` `@forms` `@etapa2` | `cypress/e2e/features/etapa-2-frontend/practice_form.feature` | `cypress/e2e/step_definitions/etapa-2-frontend/practice_form.steps.ts` | `docs/evidencias/etapa-2-frontend/CT01_practice_form_modal.png` | ⏳ Pendente |
| **CT-UI-02** | Validação de texto em nova janela do navegador | `@frontend` `@windows` `@etapa2` | `cypress/e2e/features/etapa-2-frontend/browser_windows.feature` | `cypress/e2e/step_definitions/etapa-2-frontend/browser_windows.steps.ts` | `docs/evidencias/etapa-2-frontend/CT02_browser_windows_sample.png` | ⏳ Pendente |
| **CT-UI-03** | CRUD de registro na Web Tables | `@frontend` `@webtables` `@crud` `@etapa2` | `cypress/e2e/features/etapa-2-frontend/web_tables.feature` | `cypress/e2e/step_definitions/etapa-2-frontend/web_tables.steps.ts` | `docs/evidencias/etapa-2-frontend/CT03_webtables_crud.png` | ⏳ Pendente |
| **CT-UI-04** | Inserção e remoção dinâmica de 12 registros (Bônus) | `@frontend` `@webtables` `@bonus` `@etapa2` | `cypress/e2e/features/etapa-2-frontend/web_tables.feature` | `cypress/e2e/step_definitions/etapa-2-frontend/web_tables.steps.ts` | `docs/evidencias/etapa-2-frontend/CT04_webtables_12_registros.png` | ⏳ Pendente |
| **CT-UI-05** | Controle de parada e reset da Progress Bar | `@frontend` `@progressbar` `@etapa2` | `cypress/e2e/features/etapa-2-frontend/progress_bar.feature` | `cypress/e2e/step_definitions/etapa-2-frontend/progress_bar.steps.ts` | `docs/evidencias/etapa-2-frontend/CT05_progress_bar_reset.png` | ⏳ Pendente |
| **CT-UI-06** | Ordenação de lista crescente via Drag and Drop | `@frontend` `@sortable` `@draganddrop` `@etapa2` | `cypress/e2e/features/etapa-2-frontend/sortable.feature` | `cypress/e2e/step_definitions/etapa-2-frontend/sortable.steps.ts` | `docs/evidencias/etapa-2-frontend/CT06_sortable_ordenado.png` | ⏳ Pendente |

---

## 3. Especificações BDD / Gherkin Detalhadas

### 📌 PARTE 1: Testes de API (DemoQA BookStore & Account)

#### Funcionalidade: Gestão de Contas e Reserva de Livros na BookStore API
Como um cliente da BookStore  
Quero gerenciar meu usuário, autenticação e reserva de livros  
Para garantir a consistência das operações via API  

**@api @etapa1 @passo1 @criar_usuario**  
**Cenário: 1. Criar um novo usuário no sistema**  
* **Dado** que envio uma requisição para criar um novo usuário com credenciais válidas  
* **Então** a API deve retornar o status de criação 201 Created  
* **E** os dados do usuário com id devem ser retornados com sucesso  

**@api @etapa1 @passo2 @gerar_token**  
**Cenário: 2. Gerar um token de acesso para o usuário criado**  
* **Dado** que possuo um usuário cadastrado no sistema  
* **Quando** solicito a geração de um token de acesso para o usuário criado  
* **Então** a API deve retornar o status 200 OK  
* **E** o token de acesso deve ser gerado com sucesso  

**@api @etapa1 @passo3 @verificar_autorizacao**  
**Cenário: 3. Confirmar se o usuário criado está autorizado**  
* **Dado** que possuo um usuário cadastrado e com credenciais ativas  
* **Quando** envio a requisição para verificar a autorização do usuário  
* **Então** a API deve retornar o status 200 OK  
* **E** deve confirmar que o usuário está devidamente autorizado  

**@api @etapa1 @passo4 @listar_livros**  
**Cenário: 4. Listar os livros disponíveis no catálogo**  
* **Dado** que a BookStore possui um acervo de livros  
* **Quando** realizo a consulta dos livros disponíveis no catálogo  
* **Então** a API deve retornar o status 200 OK  
* **E** a lista de livros disponíveis deve conter ao menos dois livros  

**@api @etapa1 @passo5 @alugar_livros**  
**Cenário: 5. Alugar dois livros de livre escolha**  
* **Dado** que possuo um usuário autorizado com token de acesso  
* **E** que selecionei dois livros disponíveis no catálogo  
* **Quando** envio a requisição para alugar os dois livros selecionados  
* **Então** a API deve retornar o status de criação 201 Created  
* **E** deve confirmar a reserva dos dois livros alugados  

**@api @etapa1 @passo6 @detalhes_usuario**  
**Cenário: 6. Listar os detalhes do usuário com os livros escolhidos**  
* **Dado** que o usuário possui livros alugados no sistema  
* **Quando** consulto os detalhes da conta do usuário através do seu id  
* **Então** a API deve retornar o status 200 OK  
* **E** a lista de livros do usuário deve conter os dois livros alugados  

---

### 📌 PARTE 2: Testes de Frontend (DemoQA UI)

#### Funcionalidade: Prática de Formulário de Estudante (Practice Form)
Como um estudante  
Quero preencher e submeter o formulário de matrícula com anexo  
Para registrar minhas informações acadêmicas com sucesso  

**@frontend @forms @etapa2 @CA02**  
**Cenário: Submeter o formulário de matrícula com dados aleatórios e upload de arquivo de texto**  
* **Dado** que o usuário acessa o submenu "Practice Form" na seção Forms  
* **Quando** preenche todos os campos do formulário com dados dinâmicos válidos  
* **E** realiza o upload de um arquivo ".txt" válido versionado no projeto  
* **E** submete o formulário clicando no botão "Submit"  
* **Então** o popup de confirmação com título "Thanks for submitting the form" deve ser exibido  
* **E** os dados preenchidos devem corresponder aos valores exibidos na tabela de resumo  
* **E** o usuário fecha o popup de confirmação  

---

#### Funcionalidade: Manipulação de Janelas do Navegador (Browser Windows)
Como um usuário da plataforma  
Quero abrir uma nova janela do navegador  
Para validar a mensagem exibida na página de exemplo  

**@frontend @windows @etapa2 @CA03**  
**Cenário: Validar mensagem em uma nova janela aberta**  
* **Dado** que o usuário acessa o submenu "Browser Windows" na seção Alerts, Frame & Windows  
* **Quando** clica no botão "New Window"  
* **Então** uma nova janela deve ser aberta  
* **E** o texto "This is a sample page" deve estar visível no corpo da nova página  
* **E** a nova janela é fechada retornando o foco à janela principal  

---

#### Funcionalidade: Gerenciamento de Registros na Tabela Web (Web Tables)
Como um administrador de registros  
Quero cadastrar, editar e remover colaboradores  
Para manter a tabela de dados atualizada  

**@frontend @webtables @crud @etapa2 @CA04**  
**Cenário: Criar, editar e excluir um registro na tabela web**  
* **Dado** que o usuário acessa o submenu "Web Tables" na seção Elements  
* **Quando** adiciona um novo registro com dados dinâmicos válidos  
* **E** localiza o registro recém-criado e altera seus dados cadastrais  
* **E** exclui o registro recém-editado  
* **Então** o registro não deve mais ser exibido na listagem da tabela  

**@frontend @webtables @bonus @etapa2 @CA05**  
**Cenário: [Bônus] Inserir 12 registros de forma dinâmica e removê-los em seguida**  
* **Dado** que o usuário acessa o submenu "Web Tables" na seção Elements  
* **Quando** adiciona 12 registros dinâmicos consecutivamente na tabela  
* **Então** todos os 12 novos registros devem constar na paginação da tabela  
* **Quando** o usuário realiza a exclusão de todos os 12 registros adicionados  
* **Então** apenas os registros padrão iniciais devem permanecer visíveis  

---

#### Funcionalidade: Controle da Barra de Progresso (Progress Bar)
Como um usuário  
Quero iniciar, interromper e reiniciar a barra de progresso  
Para validar a conformidade dos limites percentuais  

**@frontend @progressbar @etapa2 @CA06**  
**Cenário: Interromper a barra em até 25% e resetar após a conclusão de 100%**  
* **Dado** que o usuário acessa o submenu "Progress Bar" na seção Widgets  
* **Quando** clica no botão "Start" para iniciar o progresso  
* **E** clica no botão "Stop" antes ou exatamente ao atingir 25%  
* **Então** o percentual da barra de progresso deve ser menor ou igual a 25%  
* **Quando** clica em "Start" novamente aguardando a barra atingir 100%  
* **E** clica no botão "Reset"  
* **Então** a barra de progresso deve ser zerada voltando a 0%  

---

#### Funcionalidade: Reordenação de Itens por Arraste (Sortable)
Como um usuário  
Quero reordenar os itens da lista através de drag and drop  
Para dispor os elementos em ordem crescente  

**@frontend @sortable @draganddrop @etapa2 @CA07**  
**Cenário: Reordenar elementos da lista em ordem crescente através de drag and drop**  
* **Dado** que o usuário acessa o submenu "Sortable" na seção Interactions  
* **Quando** reordena os elementos através do método de arrastar e soltar  
* **Então** os itens devem estar dispostos na ordem sequencial exata de "One" a "Six"  

---

## 4. Padrões de Qualidade e Governança

1. **Linguagem Ubíqua e BDD:** Cenários escritos em português claro, focados no comportamento esperado do sistema e sem acoplamento a detalhes de implementação interna.
2. **Atomicidade e Independência:** Cada cenário é auto-suficiente, garantindo que a execução de um teste não dependa do estado deixado pelo anterior.
3. **Massa de Dados Dinâmica:** Utilização do `@faker-js/faker` para impedir colisões de chaves únicas (como nome de usuário na API e e-mail no formulário).
4. **Evidências Automatizadas:**
   * **API:** Payloads de envio, URLs, códigos de status HTTP, durações e payloads de resposta são registrados em `docs/evidencias/etapa-1-api/`.
   * **Frontend:** Screenshots automáticos de marcos críticos e relatórios HTML são consolidados a cada ciclo de execução.
