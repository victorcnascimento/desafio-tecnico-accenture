import { BasePage } from "../BasePage";

export interface TableRecordData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class WebTablesPage extends BasePage {
  private homeCardElements = ".category-cards .card";
  private buttonAdd = "#addNewRecordButton";
  private inputFirstName = "#firstName";
  private inputLastName = "#lastName";
  private inputEmail = "#userEmail";
  private inputAge = "#age";
  private inputSalary = "#salary";
  private inputDepartment = "#department";
  private buttonSubmit = "#submit";
  private inputSearch = "#searchBox";
  private tableBody = "table tbody";
  private selectPageSize = "select";

  visitHome() {
    this.visitHomePage();
  }

  navigateToWebTables() {
    cy.contains(this.homeCardElements, "Elements").scrollIntoView().click();
    this.removeAdsAndFooter();
    cy.contains("span", "Web Tables").scrollIntoView().click();
  }

  clickAdd() {
    this.removeAdsAndFooter();
    cy.get(this.buttonAdd).scrollIntoView().click();
    cy.get("#registration-form-modal").should("be.visible");
  }

  fillRecordForm(data: TableRecordData) {
    cy.get(this.inputFirstName).clear().type(data.firstName, { delay: 0 });
    cy.get(this.inputLastName).clear().type(data.lastName, { delay: 0 });
    cy.get(this.inputEmail).clear().type(data.email, { delay: 0 });
    cy.get(this.inputAge).clear().type(data.age, { delay: 0 });
    cy.get(this.inputSalary).clear().type(data.salary, { delay: 0 });
    cy.get(this.inputDepartment).clear().type(data.department, { delay: 0 });
  }

  submitRecordForm() {
    cy.get(this.buttonSubmit).click();
    cy.get("#registration-form-modal").should("not.exist");
  }

  searchRecord(query: string) {
    cy.get(this.inputSearch).clear().type(query);
  }

  clearSearch() {
    cy.get(this.inputSearch).clear();
  }

  clickEditFirstRecord() {
    this.removeAdsAndFooter();
    cy.get("[id^='edit-record-'], [title='Edit']").first().click();
    cy.get("#registration-form-modal").should("be.visible");
  }

  clickDeleteFirstRecord() {
    this.removeAdsAndFooter();
    cy.get("[id^='delete-record-'], [title='Delete']").first().click();
  }

  setPageSize(size: string) {
    // Tenta selecionar por valor ou texto (ex: "20" ou "20 rows")
    cy.get("body").then(($body) => {
      if ($body.find("select").length > 0) {
        cy.get("select").first().then(($sel) => {
          const val = $sel.find(`option:contains("${size.replace(/[^0-9]/g, '')}")`).val();
          if (val) {
            cy.get("select").first().select(val.toString());
          }
        });
      }
    });
  }

  validateRecordInTable(email: string) {
    this.searchRecord(email);
    cy.get(this.tableBody).should("contain.text", email);
    this.clearSearch();
  }

  validateRecordNotInTable(email: string) {
    this.searchRecord(email);
    cy.get(this.tableBody).then(($tbody) => {
      const dataRows = $tbody.find("tr").filter((_, el) => el.innerText.trim().length > 0);
      expect(dataRows.length, `Busca pelo registro excluído (${email}) deve retornar 0 linhas`).to.eq(0);
    });
    cy.get("[id^='delete-record-']").should("not.exist");
    this.clearSearch();
  }
}
