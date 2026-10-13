import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { AccountService } from "../../../support/services/accountService";
import { BookStoreService } from "../../../support/services/bookStoreService";
import { EvidenceHelper } from "../../../support/utils/evidenceHelper";

const accountService = new AccountService();
const bookStoreService = new BookStoreService();

interface TestState {
  username: string;
  password: string;
  userId: string;
  token: string;
  selectedIsbns: string[];
  selectedBooks: any[];
  userDetails: any;
}

const state: TestState = {
  username: "",
  password: "",
  userId: "",
  token: "",
  selectedIsbns: [],
  selectedBooks: [],
  userDetails: null,
};

Before(function () {
  EvidenceHelper.clearRecords();
  state.username = "";
  state.password = "";
  state.userId = "";
  state.token = "";
  state.selectedIsbns = [];
  state.selectedBooks = [];
  state.userDetails = null;
});

After(function () {
  EvidenceHelper.saveEvidenceReport("cypress/reports/evidence/api_execution_evidence.json");
  EvidenceHelper.saveMarkdownReport("cypress/reports/evidence/api_execution_evidence.md");
});

Given("que envio uma requisição para criar um novo usuário com credenciais válidas", function () {
  const timestamp = Date.now();
  state.username = `qa_user_${faker.string.alphanumeric(6)}_${timestamp}`;
  state.password = `QA@Passw0rd!${timestamp.toString().slice(-4)}`;

  const payload = {
    userName: state.username,
    password: state.password,
  };

  accountService.createUser(payload).then((response) => {
    EvidenceHelper.recordApiCall("Criar Usuário (POST /Account/v1/User)", "https://demoqa.com/Account/v1/User", response, payload, this.attach);

    expect(response.status, "Status da criação do usuário deve ser 201").to.eq(201);
    expect(response.body).to.have.property("userID").that.is.not.empty;
    expect(response.body.username).to.eq(state.username);

    state.userId = response.body.userID;
  });
});

When("solicito a geração de um token de acesso para o usuário criado", function () {
  const payload = {
    userName: state.username,
    password: state.password,
  };

  accountService.generateToken(payload).then((response) => {
    EvidenceHelper.recordApiCall("Gerar Token (POST /Account/v1/GenerateToken)", "https://demoqa.com/Account/v1/GenerateToken", response, payload, this.attach);

    expect(response.status, "Status da geração de token deve ser 200").to.eq(200);
    expect(response.body.status, "Status de retorno deve ser Success").to.eq("Success");
    expect(response.body).to.have.property("token").that.is.not.empty;

    state.token = response.body.token;
  });
});

When("valido que o usuário está devidamente autorizado no sistema", function () {
  const payload = {
    userName: state.username,
    password: state.password,
  };

  accountService.checkAuthorized(payload).then((response) => {
    EvidenceHelper.recordApiCall("Verificar Autorização (POST /Account/v1/Authorized)", "https://demoqa.com/Account/v1/Authorized", response, payload, this.attach);

    expect(response.status, "Status da verificação de autorização deve ser 200").to.eq(200);
    expect(response.body, "Usuário deve estar autorizado (true)").to.eq(true);
  });
});

When("realizo a consulta dos livros disponíveis no catálogo", function () {
  bookStoreService.getBooks().then((response) => {
    EvidenceHelper.recordApiCall("Listar Livros Disponíveis (GET /BookStore/v1/Books)", "https://demoqa.com/BookStore/v1/Books", response, null, this.attach);

    expect(response.status, "Status da listagem de livros deve ser 200").to.eq(200);
    expect(response.body.books, "Catálogo de livros não pode ser vazio").to.be.an("array").that.is.not.empty;
    expect(response.body.books.length, "Deve haver ao menos 2 livros para alugar").to.be.at.least(2);

    state.selectedBooks = response.body.books.slice(0, 2);
    state.selectedIsbns = state.selectedBooks.map((b) => b.isbn);
  });
});

When("alugo dois livros disponíveis para o usuário", function () {
  bookStoreService.rentBooks(state.userId, state.selectedIsbns, state.token).then((response) => {
    const payload = {
      userId: state.userId,
      collectionOfIsbns: state.selectedIsbns.map((isbn) => ({ isbn })),
    };

    EvidenceHelper.recordApiCall("Alugar Dois Livros (POST /BookStore/v1/Books)", "https://demoqa.com/BookStore/v1/Books", response, payload, this.attach);

    expect(response.status, "Status do aluguel de livros deve ser 201").to.eq(201);
    expect(response.body.books).to.be.an("array").with.lengthOf(2);
  });
});

Then("consulto os detalhes da conta do usuário", function () {
  accountService.getUserDetails(state.userId, state.token).then((response) => {
    EvidenceHelper.recordApiCall(`Consultar Detalhes do Usuário (GET /Account/v1/User/${state.userId})`, `https://demoqa.com/Account/v1/User/${state.userId}`, response, null, this.attach);

    expect(response.status, "Status da consulta de detalhes do usuário deve ser 200").to.eq(200);
    expect(response.body.userId).to.eq(state.userId);
    expect(response.body.username).to.eq(state.username);

    state.userDetails = response.body;
  });
});

Then("valido que os dois livros alugados constam na lista de livros do usuário", function () {
  expect(state.userDetails.books, "A lista de livros do usuário deve ser um array").to.be.an("array");
  expect(state.userDetails.books, "O usuário deve possuir exatamente os 2 livros alugados").to.have.lengthOf(2);

  const userBookIsbns = state.userDetails.books.map((b: any) => b.isbn);
  expect(userBookIsbns).to.include.members(state.selectedIsbns);

  cy.log(`Livros alugados confirmados com sucesso: ${userBookIsbns.join(", ")}`);
});
