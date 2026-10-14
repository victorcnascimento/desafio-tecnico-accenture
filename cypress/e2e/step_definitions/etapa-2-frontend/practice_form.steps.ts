import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { PracticeFormPage, StudentFormData } from "../../../pages/etapa-2-frontend/practiceFormPage";

const practiceFormPage = new PracticeFormPage();

let formData: StudentFormData;

Given("que o usuário acessa o submenu {string} na seção Forms", function (submenu: string) {
  practiceFormPage.visitHome();
  practiceFormPage.navigateToPracticeForm();
});

When("preenche todos os campos do formulário com dados dinâmicos válidos", function () {
  formData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    gender: "Male",
    mobile: faker.string.numeric(10),
    birthYear: "1998",
    birthMonth: "April",
    birthDay: "15",
    subject: "Maths",
    hobbies: ["Sports", "Music"],
    filePath: "cypress/fixtures/sample-upload.txt",
    address: faker.location.streetAddress(),
    state: "NCR",
    city: "Delhi",
  };

  practiceFormPage.fillForm(formData);
});

When("realiza o upload de um arquivo {string} válido versionado no projeto", function (extension: string) {
  // O upload já foi preenchido com o arquivo da fixture
  cy.log(`Arquivo .txt anexado com sucesso a partir de: ${formData.filePath}`);
  cy.screenshot("CT01_practice_form_preenchido");
});

When("submete o formulário clicando no botão {string}", function (buttonName: string) {
  practiceFormPage.submitForm();
});

Then("o popup de confirmação com título {string} deve ser exibido", function (expectedTitle: string) {
  practiceFormPage.validateSuccessModal(formData);
  cy.screenshot("CT01_practice_form_modal");
});

Then("os dados preenchidos devem corresponder aos valores exibidos na tabela de resumo", function () {
  // Validação dos dados já realizada na asserção do modal
  cy.log("Validação cruzada dos dados preenchidos com os dados da modal concluída com sucesso.");
});

Then("o usuário fecha o popup de confirmação", function () {
  practiceFormPage.closeSuccessModal();
});
