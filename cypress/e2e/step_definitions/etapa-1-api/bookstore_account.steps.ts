import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { AccountService } from "../../../services/etapa-1-api/accountService";
import { BookStoreService } from "../../../services/etapa-1-api/bookStoreService";
import { EvidenceHelper } from "../../../support/utils/evidenceHelper";

const accountService = new AccountService();
const bookStoreService = new BookStoreService();

interface TestState {
  username: string;
  password: string;
  userId: string;
  token: string;
  catalogBooks: any[];
  selectedIsbns: string[];
  lastResponse: Cypress.Response<any> | null;
  userDetails: any;
}

const state: TestState = {
  username: "",
  password: "",
  userId: "",
  token: "",
  catalogBooks: [],
  selectedIsbns: [],
  lastResponse: null,
  userDetails: null,
};

// Funções auxiliares para garantir pré-condições quando executado isoladamente
function ensureUserCreated(): Cypress.Chainable<void> {
  if (state.userId && state.username) {
    return cy.wrap(undefined as void);
  }
  const timestamp = Date.now();
  state.username = `qa_user_${faker.string.alphanumeric(6)}_${timestamp}`;
  state.password = `QA@Passw0rd!${timestamp.toString().slice(-4)}`;

  const payload = { userName: state.username, password: state.password };
  return accountService.createUser(payload).then((res) => {
    state.userId = res.body.userID;
  });
}

function ensureTokenGenerated(): Cypress.Chainable<void> {
  return ensureUserCreated().then(() => {
    if (state.token) {
      return cy.wrap(undefined as void);
    }
    const payload = { userName: state.username, password: state.password };
    return accountService.generateToken(payload).then((res) => {
      state.token = res.body.token;
    });
  });
}

function ensureBooksSelected(): Cypress.Chainable<void> {
  if (state.selectedIsbns.length >= 2) {
    return cy.wrap(undefined as void);
  }
  return bookStoreService.getBooks().then((res) => {
    state.catalogBooks = res.body.books;
    state.selectedIsbns = res.body.books.slice(0, 2).map((b: any) => b.isbn);
  });
}

function ensureBooksRented(): Cypress.Chainable<void> {
  return ensureTokenGenerated().then(() => {
    return ensureBooksSelected().then(() => {
      return bookStoreService.rentBooks(state.userId, state.selectedIsbns, state.token).then(() => {
        return cy.wrap(undefined as void);
      });
    });
  });
}

After(function () {
  EvidenceHelper.saveEvidenceReport("cypress/reports/evidence/api_execution_evidence.json");
  EvidenceHelper.saveMarkdownReport("cypress/reports/evidence/api_execution_evidence.md");
  EvidenceHelper.saveEvidenceReport("docs/evidencias/etapa-1-api/api_execution_evidence.json");
  EvidenceHelper.saveMarkdownReport("docs/evidencias/etapa-1-api/api_execution_evidence.md");
});

// ==========================================
// CENÁRIO 1: Criar Usuário (POST /Account/v1/User)
// ==========================================
Given("que envio uma requisição para criar um novo usuário com credenciais válidas", function () {
  const timestamp = Date.now();
  state.username = `qa_user_${faker.string.alphanumeric(6)}_${timestamp}`;
  state.password = `QA@Passw0rd!${timestamp.toString().slice(-4)}`;

  const payload = {
    userName: state.username,
    password: state.password,
  };

  accountService.createUser(payload).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("1. Criar Usuário (POST /Account/v1/User)", "https://demoqa.com/Account/v1/User", response, payload, this.attach);

    if (response.status === 201) {
      state.userId = response.body.userID;
    }
  });
});

Then("a API deve retornar o status de criação 201 Created", function () {
  expect(state.lastResponse?.status, "Status da criação do usuário deve ser 201").to.eq(201);
});

Then("os dados do usuário com id devem ser retornados com sucesso", function () {
  expect(state.lastResponse?.body).to.have.property("userID").that.is.not.empty;
  expect(state.lastResponse?.body.username).to.eq(state.username);
});

// ==========================================
// CENÁRIO 2: Gerar Token (POST /Account/v1/GenerateToken)
// ==========================================
Given("que possuo um usuário cadastrado no sistema", function () {
  ensureUserCreated().then(() => {
    expect(state.userId, "Usuário deve existir previamente").to.be.not.empty;
  });
});

When("solicito a geração de um token de acesso para o usuário criado", function () {
  const payload = {
    userName: state.username,
    password: state.password,
  };

  accountService.generateToken(payload).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("2. Gerar Token (POST /Account/v1/GenerateToken)", "https://demoqa.com/Account/v1/GenerateToken", response, payload, this.attach);

    if (response.status === 200 && response.body.token) {
      state.token = response.body.token;
    }
  });
});

Then("a API deve retornar o status 200 OK", function () {
  expect(state.lastResponse?.status, "Status HTTP deve ser 200").to.eq(200);
});

Then("o token de acesso deve ser gerado com sucesso", function () {
  expect(state.lastResponse?.body.status, "Status de autenticação deve ser Success").to.eq("Success");
  expect(state.lastResponse?.body).to.have.property("token").that.is.not.empty;
});

// ==========================================
// CENÁRIO 3: Confirmar Autorização (POST /Account/v1/Authorized)
// ==========================================
Given("que possuo um usuário cadastrado e com credenciais ativas", function () {
  ensureTokenGenerated().then(() => {
    expect(state.username, "Username deve existir").to.be.not.empty;
    expect(state.password, "Password deve existir").to.be.not.empty;
  });
});

When("envio a requisição para verificar a autorização do usuário", function () {
  const payload = {
    userName: state.username,
    password: state.password,
  };

  accountService.checkAuthorized(payload).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("3. Verificar Autorização (POST /Account/v1/Authorized)", "https://demoqa.com/Account/v1/Authorized", response, payload, this.attach);
  });
});

Then("deve confirmar que o usuário está devidamente autorizado", function () {
  expect(state.lastResponse?.body, "Corpo da resposta deve ser boolean true").to.eq(true);
});

// ==========================================
// CENÁRIO 4: Listar Livros (GET /BookStore/v1/Books)
// ==========================================
Given("que a BookStore possui um acervo de livros", function () {
  cy.log("Iniciando consulta ao catálogo público da BookStore");
});

When("realizo a consulta dos livros disponíveis no catálogo", function () {
  bookStoreService.getBooks().then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("4. Listar Livros Disponíveis (GET /BookStore/v1/Books)", "https://demoqa.com/BookStore/v1/Books", response, null, this.attach);

    if (response.status === 200) {
      state.catalogBooks = response.body.books;
      state.selectedIsbns = response.body.books.slice(0, 2).map((b: any) => b.isbn);
    }
  });
});

Then("a lista de livros disponíveis deve conter ao menos dois livros", function () {
  expect(state.lastResponse?.body.books, "A lista de livros deve ser um array").to.be.an("array");
  expect(state.lastResponse?.body.books.length, "Deve haver ao menos 2 livros disponíveis").to.be.at.least(2);
});

// ==========================================
// CENÁRIO 5: Alugar Dois Livros (POST /BookStore/v1/Books)
// ==========================================
Given("que possuo um usuário autorizado com token de acesso", function () {
  ensureTokenGenerated().then(() => {
    expect(state.userId, "ID do usuário deve existir").to.be.not.empty;
    expect(state.token, "Token do usuário deve existir").to.be.not.empty;
  });
});

Given("que selecionei dois livros disponíveis no catálogo", function () {
  ensureBooksSelected().then(() => {
    expect(state.selectedIsbns.length, "Devem haver exatamente 2 ISBNs selecionados").to.eq(2);
  });
});

When("envio a requisição para alugar os dois livros selecionados", function () {
  const payload = {
    userId: state.userId,
    collectionOfIsbns: state.selectedIsbns.map((isbn) => ({ isbn })),
  };

  bookStoreService.rentBooks(state.userId, state.selectedIsbns, state.token).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("5. Alugar Dois Livros (POST /BookStore/v1/Books)", "https://demoqa.com/BookStore/v1/Books", response, payload, this.attach);
  });
});

Then("deve confirmar a reserva dos dois livros alugados", function () {
  expect(state.lastResponse?.body.books, "Livros alugados retornados").to.be.an("array").with.lengthOf(2);
  const rentedIsbns = state.lastResponse?.body.books.map((b: any) => b.isbn);
  expect(rentedIsbns).to.include.members(state.selectedIsbns);
});

// ==========================================
// CENÁRIO 6: Listar Detalhes do Usuário (GET /Account/v1/User/{userID})
// ==========================================
Given("que o usuário possui livros alugados no sistema", function () {
  ensureBooksRented().then(() => {
    expect(state.userId, "ID do usuário deve existir").to.be.not.empty;
    expect(state.token, "Token do usuário deve existir").to.be.not.empty;
  });
});

When("consulto os detalhes da conta do usuário através do seu id", function () {
  accountService.getUserDetails(state.userId, state.token).then((response) => {
    state.lastResponse = response;
    state.userDetails = response.body;
    EvidenceHelper.recordApiCall(`6. Consultar Detalhes do Usuário (GET /Account/v1/User/${state.userId})`, `https://demoqa.com/Account/v1/User/${state.userId}`, response, null, this.attach);
  });
});

Then("a lista de livros do usuário deve conter os dois livros alugados", function () {
  expect(state.userDetails.userId, "ID do usuário consultado").to.eq(state.userId);
  expect(state.userDetails.username, "Username consultado").to.eq(state.username);
  expect(state.userDetails.books, "Array de livros do usuário").to.be.an("array").with.lengthOf(2);

  const userBookIsbns = state.userDetails.books.map((b: any) => b.isbn);
  expect(userBookIsbns, "ISBNs dos livros na conta").to.include.members(state.selectedIsbns);
  cy.log(`Livros confirmados na conta com sucesso: ${userBookIsbns.join(", ")}`);
});
