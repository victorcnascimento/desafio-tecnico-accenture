import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { AccountService } from "../../../services/etapa-1-api/accountService";
import { BookStoreService } from "../../../services/etapa-1-api/bookStoreService";

const accountService = new AccountService();
const bookStoreService = new BookStoreService();

interface NegativeTestState {
  username: string;
  password: string;
  userId: string;
  token: string;
  selectedIsbns: string[];
  lastResponse: Cypress.Response<any> | null;
}

const state: NegativeTestState = {
  username: "",
  password: "",
  userId: "",
  token: "",
  selectedIsbns: [],
  lastResponse: null,
};

function resetState() {
  state.username = "";
  state.password = "";
  state.userId = "";
  state.token = "";
  state.selectedIsbns = [];
  state.lastResponse = null;
}

function createUserAndGetToken(): Cypress.Chainable<void> {
  const timestamp = Date.now();
  state.username = `qa_neg_${faker.string.alphanumeric(6)}_${timestamp}`;
  state.password = `QA@Passw0rd!${timestamp.toString().slice(-4)}`;

  return accountService.createUser({ userName: state.username, password: state.password }).then((res) => {
    state.userId = res.body.userID;
    return accountService.generateToken({ userName: state.username, password: state.password }).then((tokenRes) => {
      state.token = tokenRes.body.token;
    });
  });
}

Before(function () {
  resetState();
});

After(function () {
  if (state.userId && state.token) {
    accountService.deleteUser(state.userId, state.token).then((res) => {
      cy.log(`[CLEANUP] Usuário ${state.username} deletado com status: ${res.status}`);
    });
  }
});

// ==========================================
// CENÁRIO: Criar usuário duplicado (406)
// ==========================================
Given("que um usuário já foi criado com credenciais válidas", function () {
  createUserAndGetToken().then(() => {
    expect(state.userId, "Usuário deve ter sido criado").to.not.be.empty;
  });
});

When("envio uma requisição para criar outro usuário com o mesmo username", function () {
  accountService.createUser({ userName: state.username, password: state.password }).then((response) => {
    state.lastResponse = response;
  });
});

Then("a API deve retornar o status 406 Not Acceptable", function () {
  expect(state.lastResponse?.status, "Status deve ser 406").to.eq(406);
});

Then("a mensagem de erro deve indicar que o usuário já existe", function () {
  expect(state.lastResponse?.body.message).to.contain("User exists");
});

// ==========================================
// CENÁRIO: Token com senha inválida
// ==========================================
Given("que um usuário válido existe no sistema", function () {
  if (!state.userId) {
    createUserAndGetToken().then(() => {
      expect(state.userId, "Usuário deve existir").to.not.be.empty;
    });
  }
});

When("solicito a geração de token com uma senha incorreta", function () {
  accountService.generateToken({ userName: state.username, password: "SenhaErrada@123" }).then((response) => {
    state.lastResponse = response;
  });
});

Then("a API deve retornar o status 200 com status Failed", function () {
  expect(state.lastResponse?.status, "Status HTTP deve ser 200").to.eq(200);
  expect(state.lastResponse?.body.status, "Status deve ser Failed").to.eq("Failed");
});

Then("o token retornado deve ser nulo", function () {
  expect(state.lastResponse?.body.token).to.be.null;
});

// ==========================================
// CENÁRIO: Autorização com credenciais inválidas
// ==========================================
When("verifico a autorização com uma senha incorreta", function () {
  accountService.checkAuthorized({ userName: state.username, password: "SenhaErrada@123" }).then((response) => {
    state.lastResponse = response;
  });
});

Then("a API deve retornar false indicando não autorização", function () {
  expect(state.lastResponse?.body, "Corpo da resposta deve ser false").to.eq(false);
});

// ==========================================
// CENÁRIO: Token inválido/forjado (401)
// ==========================================
When("consulto os detalhes do usuário com um token forjado", function () {
  accountService.getUserDetails(state.userId, "token_invalido_forjado_12345").then((response) => {
    state.lastResponse = response;
  });
});

Then("a API deve retornar o status 401 Unauthorized", function () {
  expect(state.lastResponse?.status, "Status deve ser 401").to.eq(401);
});

// ==========================================
// CENÁRIO: Livro duplicado (400)
// ==========================================
Given("que um usuário possui livros alugados em sua conta", function () {
  createUserAndGetToken().then(() => {
    bookStoreService.getBooks().then((res) => {
      state.selectedIsbns = [res.body.books[0].isbn];
      bookStoreService.rentBooks(state.userId, state.selectedIsbns, state.token).then((rentRes) => {
        expect(rentRes.status, "Livro deve ter sido alugado").to.eq(201);
      });
    });
  });
});

When("tento alugar novamente o mesmo livro já reservado", function () {
  bookStoreService.rentBooks(state.userId, state.selectedIsbns, state.token).then((response) => {
    state.lastResponse = response;
  });
});

Then("a API deve retornar o status 400 Bad Request", function () {
  expect(state.lastResponse?.status, "Status deve ser 400").to.eq(400);
});

Then("a mensagem de erro deve indicar que o livro já está na coleção", function () {
  expect(state.lastResponse?.body.message).to.contain("ISBN already present in the User's Collection");
});

// ==========================================
// CENÁRIO: Criar usuário sem senha (400)
// ==========================================
When("envio uma requisição para criar usuário sem o campo senha", function () {
  cy.request({
    method: "POST",
    url: "https://demoqa.com/Account/v1/User",
    body: { userName: `qa_nospass_${Date.now()}` },
    failOnStatusCode: false,
  }).then((response) => {
    state.lastResponse = response;
  });
});

Then("a API deve retornar o status 400 indicando campo obrigatório", function () {
  expect(state.lastResponse?.status, "Status deve ser 400").to.eq(400);
});
