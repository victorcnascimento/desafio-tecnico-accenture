import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { WebTablesPage } from "../../../pages/etapa-2-frontend/webTablesPage";

const webTablesPage = new WebTablesPage();

// ==========================================
// STEPS COMPARTILHADOS
// ==========================================
Given("que o usuário navega até o submenu {string} na seção Elements", function (submenu: string) {
  webTablesPage.visitHome();
  webTablesPage.navigateToWebTables();
});

// ==========================================
// CENÁRIO: Formulário vazio
// ==========================================
When("tenta adicionar um registro sem preencher nenhum campo", function () {
  webTablesPage.clickAdd();
  // Clica em submit sem preencher nada
  cy.get("#submit").click();
});

Then("o formulário de registro deve permanecer aberto com indicação de erro", function () {
  // O modal deve continuar aberto
  cy.get("#registration-form-modal").should("be.visible");
  // Os campos obrigatórios devem ter a classe 'was-validated' no form
  cy.get(".modal-body form").should("have.class", "was-validated");
  cy.screenshot("CT_NEG_webtables_formulario_vazio");
  // Fecha o modal para limpar o estado
  cy.get(".modal-header .close, [aria-label='Close']").first().click({ force: true });
});

// ==========================================
// CENÁRIO: Busca inexistente
// ==========================================
When("realiza uma busca por um valor inexistente {string}", function (searchTerm: string) {
  webTablesPage.searchRecord(searchTerm);
});

Then("a tabela deve exibir a mensagem indicando que não há registros encontrados", function () {
  // Valida que a tabela ficou com 0 linhas de registros e nenhum botão de ação
  cy.get("table tbody").should(($tbody) => {
    const dataRows = $tbody.find("tr").filter((_, el) => el.innerText.trim().length > 0);
    expect(dataRows.length, "Quantidade de linhas de dados com busca inexistente").to.eq(0);
  });
  cy.get("[id^='delete-record-']").should("not.exist");
  cy.get("body").should("contain.text", "Page 1 of 0");
  cy.screenshot("CT_NEG_webtables_busca_inexistente");
  webTablesPage.clearSearch();
});

// ==========================================
// CENÁRIO: Email inválido no cadastro
// ==========================================
When("tenta adicionar um registro com email inválido {string}", function (invalidEmail: string) {
  webTablesPage.clickAdd();
  cy.get("#firstName").clear().type(faker.person.firstName(), { delay: 0 });
  cy.get("#lastName").clear().type(faker.person.lastName(), { delay: 0 });
  cy.get("#userEmail").clear().type(invalidEmail, { delay: 0 });
  cy.get("#age").clear().type("30", { delay: 0 });
  cy.get("#salary").clear().type("10000", { delay: 0 });
  cy.get("#department").clear().type("QA", { delay: 0 });
  cy.get("#submit").click();
});

Then("o formulário de registro deve permanecer aberto indicando email inválido", function () {
  // O modal deve continuar aberto porque o email é inválido
  cy.get("#registration-form-modal").should("be.visible");
  cy.get("#userEmail").should(($el) => {
    expect(($el[0] as HTMLInputElement).validity.valid, "Campo email deve estar inválido").to.be.false;
  });
  cy.screenshot("CT_NEG_webtables_email_invalido");
  // Fecha o modal para limpar o estado
  cy.get(".modal-header .close, [aria-label='Close']").first().click({ force: true });
});
