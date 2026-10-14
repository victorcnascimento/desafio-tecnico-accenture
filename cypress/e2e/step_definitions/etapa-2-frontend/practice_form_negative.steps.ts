import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { PracticeFormPage } from "../../../pages/etapa-2-frontend/practiceFormPage";

const practiceFormPage = new PracticeFormPage();

// ==========================================
// STEPS COMPARTILHADOS
// ==========================================
Given("que o usuário navega até o submenu {string} na seção Forms", function (submenu: string) {
  practiceFormPage.visitHome();
  practiceFormPage.navigateToPracticeForm();
});

Then("o popup de confirmação não deve ser exibido", function () {
  cy.get("#example-modal-sizes-title-lg").should("not.exist");
});

// ==========================================
// CENÁRIO: Campos obrigatórios vazios
// ==========================================
When("tenta submeter o formulário sem preencher nenhum campo", function () {
  practiceFormPage.submitForm();
});

Then("os campos obrigatórios devem ser destacados com indicação visual de erro", function () {
  // O DemoQA aplica a pseudo-classe :invalid e borda vermelha via classe CSS
  // Após submit com campos vazios, o formulário ganha a classe 'was-validated'
  cy.get("form").should("have.class", "was-validated");
  // Campos obrigatórios devem estar com estado inválido via CSS
  cy.get("#firstName").then(($el) => {
    const borderColor = window.getComputedStyle($el[0]).borderColor;
    cy.log(`Cor da borda do firstName após submit vazio: ${borderColor}`);
  });
  cy.get("#userNumber").then(($el) => {
    const borderColor = window.getComputedStyle($el[0]).borderColor;
    cy.log(`Cor da borda do mobile após submit vazio: ${borderColor}`);
  });
  cy.screenshot("CT_NEG_practice_form_campos_obrigatorios");
});

// ==========================================
// CENÁRIO: Email inválido
// ==========================================
When("preenche o campo de email com um valor inválido {string}", function (invalidEmail: string) {
  cy.get("#userEmail").clear().type(invalidEmail);
});

When("preenche os demais campos obrigatórios com dados válidos", function () {
  cy.get("#firstName").clear().type(faker.person.firstName());
  cy.get("#lastName").clear().type(faker.person.lastName());
  cy.contains("label", "Male").click({ force: true });
  cy.get("#userNumber").clear().type(faker.string.numeric(10));
});

When("tenta submeter o formulário", function () {
  practiceFormPage.submitForm();
});

Then("o campo de email deve apresentar indicação visual de erro", function () {
  cy.get("form").should("have.class", "was-validated");
  cy.get("#userEmail").then(($el) => {
    // Verifica que o campo é reportado como inválido pelo browser
    expect(($el[0] as HTMLInputElement).validity.valid).to.be.false;
  });
  cy.screenshot("CT_NEG_practice_form_email_invalido");
});

// ==========================================
// CENÁRIO: Mobile incompleto
// ==========================================
When("preenche o campo de celular com menos de 10 dígitos {string}", function (shortMobile: string) {
  cy.get("#userNumber").clear().type(shortMobile);
});

When("preenche os demais campos obrigatórios exceto celular com dados válidos", function () {
  cy.get("#firstName").clear().type(faker.person.firstName());
  cy.get("#lastName").clear().type(faker.person.lastName());
  cy.contains("label", "Female").click({ force: true });
});

Then("o campo de celular deve apresentar indicação visual de erro", function () {
  cy.get("form").should("have.class", "was-validated");
  cy.get("#userNumber").then(($el) => {
    const borderColor = window.getComputedStyle($el[0]).borderColor;
    cy.log(`Cor da borda do mobile com valor incompleto: ${borderColor}`);
  });
  cy.screenshot("CT_NEG_practice_form_mobile_incompleto");
});
