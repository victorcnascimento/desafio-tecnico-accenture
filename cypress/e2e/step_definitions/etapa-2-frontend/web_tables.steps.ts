import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { WebTablesPage, TableRecordData } from "../../../pages/etapa-2-frontend/webTablesPage";

const webTablesPage = new WebTablesPage();

let singleRecord: TableRecordData;
const bonusRecords: TableRecordData[] = [];

Given("que o usuário acessa o submenu {string} na seção Elements", function (submenu: string) {
  webTablesPage.visitHome();
  webTablesPage.navigateToWebTables();
});

// ==========================================
// CENÁRIO CRUD
// ==========================================
When("adiciona um novo registro com dados dinâmicos válidos", function () {
  singleRecord = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    age: faker.number.int({ min: 20, max: 60 }).toString(),
    salary: faker.number.int({ min: 3000, max: 20000 }).toString(),
    department: "QA Automation",
  };

  webTablesPage.clickAdd();
  webTablesPage.fillRecordForm(singleRecord);
  webTablesPage.submitRecordForm();

  webTablesPage.validateRecordInTable(singleRecord.email);
  cy.screenshot("CT03_webtables_registro_criado", { capture: "viewport" });
});

When("localiza o registro recém-criado e altera seus dados cadastrais", function () {
  webTablesPage.searchRecord(singleRecord.email);
  webTablesPage.clickEditFirstRecord();

  singleRecord.department = "Senior Quality Assurance";
  singleRecord.salary = "25000";

  webTablesPage.fillRecordForm(singleRecord);
  webTablesPage.submitRecordForm();

  webTablesPage.validateRecordInTable(singleRecord.email);
  cy.screenshot("CT03_webtables_registro_editado", { capture: "viewport" });
});

When("exclui o registro recém-editado", function () {
  webTablesPage.searchRecord(singleRecord.email);
  webTablesPage.clickDeleteFirstRecord();
});

Then("o registro não deve mais ser exibido na listagem da tabela", function () {
  webTablesPage.validateRecordNotInTable(singleRecord.email);
  cy.screenshot("CT03_webtables_registro_excluido", { capture: "viewport" });
  webTablesPage.clearSearch();
});

// ==========================================
// CENÁRIO BÔNUS (12 REGISTROS DINÂMICOS)
// ==========================================
When("adiciona 12 registros dinâmicos consecutivamente na tabela", function () {
  bonusRecords.length = 0;

  for (let i = 1; i <= 12; i++) {
    const record: TableRecordData = {
      firstName: `User${i}${faker.person.firstName()}`,
      lastName: faker.person.lastName(),
      email: `bonus_user_${i}_${Date.now()}@test.com`,
      age: faker.number.int({ min: 22, max: 55 }).toString(),
      salary: faker.number.int({ min: 4000, max: 15000 }).toString(),
      department: `Squad ${i}`,
    };

    bonusRecords.push(record);

    webTablesPage.clickAdd();
    webTablesPage.fillRecordForm(record);
    webTablesPage.submitRecordForm();
  }

  webTablesPage.setPageSize("20 rows");
  cy.screenshot("CT04_webtables_12_registros_criados", { capture: "viewport" });
});

Then("todos os 12 novos registros devem constar na paginação da tabela", function () {
  webTablesPage.setPageSize("20 rows");
  bonusRecords.forEach((record) => {
    cy.get("table tbody").should("contain.text", record.email);
  });
  cy.log("Todos os 12 registros dinâmicos foram confirmados na tabela.");
});

When("o usuário realiza a exclusão de todos os 12 registros adicionados", function () {
  webTablesPage.clearSearch();

  const deleteExcessRecords = () => {
    cy.get("body").then(($b) => {
      const deleteButtons = $b.find("[id^='delete-record-'], [title='Delete']");
      if (deleteButtons.length > 3) {
        cy.wrap(deleteButtons.eq(3)).click({ force: true });
        deleteExcessRecords();
      }
    });
  };

  deleteExcessRecords();
  cy.screenshot("CT04_webtables_12_registros_deletados", { capture: "viewport" });
});

Then("apenas os registros padrão iniciais devem permanecer visíveis", function () {
  webTablesPage.clearSearch();
  webTablesPage.setPageSize("10 rows");
  // Registros padrão do DemoQA
  cy.get("table tbody").should("contain.text", "Cierra");
  cy.get("table tbody").should("contain.text", "Alden");
  cy.get("table tbody").should("contain.text", "Kierra");
  cy.log("Tabela retornada com sucesso ao estado inicial.");
});
