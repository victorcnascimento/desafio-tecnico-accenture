import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { AccountService } from "../../../services/etapa-1-api/accountService";
import { BookStoreService } from "../../../services/etapa-1-api/bookStoreService";
import { EvidenceHelper } from "../../../support/utils/evidenceHelper";

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

Before(function (scenario) {
  const isNegative = scenario?.pickle?.tags?.some((t: any) => t.name === "@negativo");
  if (!isNegative) return;

  resetState();
  const isFirstScenario = scenario?.pickle?.tags?.some((t: any) => t.name === "@usuario_duplicado");
  if (isFirstScenario) {
    EvidenceHelper.clearRecords();
  }
});

After(function (scenario) {
  const isNegative = scenario?.pickle?.tags?.some((t: any) => t.name === "@negativo");
  if (!isNegative) return;

  // Salva evidências de execução da suíte negativa
  EvidenceHelper.saveEvidenceReport("docs/evidencias/etapa-1-api/api_negative_execution_evidence.json");
  EvidenceHelper.saveMarkdownReport("docs/evidencias/etapa-1-api/api_negative_execution_evidence.md");

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
  const payload = { userName: state.username, password: state.password };
  accountService.createUser(payload).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User)", "https://demoqa.com/Account/v1/User", "POST", response, payload, this.attach);
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
  const payload = { userName: state.username, password: "SenhaErrada@123" };
  accountService.generateToken(payload).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken)", "https://demoqa.com/Account/v1/GenerateToken", "POST", response, payload, this.attach);
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
  const payload = { userName: state.username, password: "SenhaErrada@123" };
  accountService.checkAuthorized(payload).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized)", "https://demoqa.com/Account/v1/Authorized", "POST", response, payload, this.attach);
  });
});

Then("a API deve retornar false indicando não autorização", function () {
  const body = state.lastResponse?.body;
  const isNotAuthorized = body === false || (typeof body === "object" && (body.code !== undefined || body.message !== undefined));
  expect(isNotAuthorized, "Corpo da resposta deve indicar não autorização").to.be.true;
  expect(body, "Corpo não deve ser true").to.not.eq(true);
});

// ==========================================
// CENÁRIO: Token inválido/forjado (401)
// ==========================================
When("consulto os detalhes do usuário com um token forjado", function () {
  accountService.getUserDetails(state.userId, "token_invalido_forjado_12345").then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall(`Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/${state.userId})`, `https://demoqa.com/Account/v1/User/${state.userId}`, "GET", response, null, this.attach);
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
  const payload = {
    userId: state.userId,
    collectionOfIsbns: state.selectedIsbns.map((isbn) => ({ isbn })),
  };

  bookStoreService.rentBooks(state.userId, state.selectedIsbns, state.token).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books)", "https://demoqa.com/BookStore/v1/Books", "POST", response, payload, this.attach);
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
  const payload = { userName: `qa_nospass_${Date.now()}` };
  cy.request({
    method: "POST",
    url: "https://demoqa.com/Account/v1/User",
    body: payload,
    failOnStatusCode: false,
  }).then((response) => {
    state.lastResponse = response;
    EvidenceHelper.recordApiCall("Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User)", "https://demoqa.com/Account/v1/User", "POST", response, payload, this.attach);
  });
});

Then("a API deve retornar o status 400 indicando campo obrigatório", function () {
  expect(state.lastResponse?.status, "Status deve ser 400").to.eq(400);
});
