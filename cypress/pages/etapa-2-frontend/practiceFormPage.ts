import { BasePage } from "../BasePage";

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  subject: string;
  hobbies: ("Sports" | "Reading" | "Music")[];
  filePath: string;
  address: string;
  state: string;
  city: string;
}

export class PracticeFormPage extends BasePage {
  // Seletores
  private homeCardForms = ".category-cards .card";
  private menuItemPracticeForm = ".menu-list #item-0";
  private inputFirstName = "#firstName";
  private inputLastName = "#lastName";
  private inputEmail = "#userEmail";
  private inputMobile = "#userNumber";
  private inputDateOfBirth = "#dateOfBirthInput";
  private selectMonth = ".react-datepicker__month-select";
  private selectYear = ".react-datepicker__year-select";
  private inputSubjects = "#subjectsInput";
  private inputUploadPicture = "#uploadPicture";
  private inputCurrentAddress = "#currentAddress";
  private selectState = "#state";
  private selectCity = "#city";
  private buttonSubmit = "#submit";
  private modalTitle = "#example-modal-sizes-title-lg";
  private modalTable = ".modal-body table tbody tr";
  private buttonCloseModal = "#closeLargeModal";

  // Ações
  visitHome() {
    this.visitHomePage();
  }

  navigateToPracticeForm() {
    cy.contains(this.homeCardForms, "Forms").scrollIntoView().click();
    this.removeAdsAndFooter();
    cy.contains("span", "Practice Form").scrollIntoView().click();
  }

  fillForm(data: StudentFormData) {
    this.removeAdsAndFooter();

    // Nome e Sobrenome
    cy.get(this.inputFirstName).should("be.visible").clear().type(data.firstName);
    cy.get(this.inputLastName).should("be.visible").clear().type(data.lastName);

    // E-mail
    cy.get(this.inputEmail).should("be.visible").clear().type(data.email);

    // Gênero
    cy.contains("label", data.gender).click({ force: true });

    // Mobile (10 dígitos)
    cy.get(this.inputMobile).should("be.visible").clear().type(data.mobile);

    // Data de Nascimento
    this.setBirthDate(data.birthYear, data.birthMonth, data.birthDay);

    // Disciplina / Subjects (seleciona a opção do autocomplete sem disparar submit prematuro)
    cy.get(this.inputSubjects).type(data.subject);
    cy.get(".subjects-auto-complete__menu").should("be.visible");
    cy.get(".subjects-auto-complete__option").first().click();

    // Hobbies
    data.hobbies.forEach((hobby) => {
      cy.contains("label", hobby).click({ force: true });
    });

    // Upload do Arquivo .txt
    cy.get(this.inputUploadPicture).selectFile(data.filePath);

    // Endereço Atual
    cy.get(this.inputCurrentAddress).should("be.visible").clear().type(data.address);

    // Estado e Cidade
    cy.get(this.selectState).scrollIntoView().click();
    cy.contains("div[id^='react-select']", data.state).click();

    cy.get(this.selectCity).scrollIntoView().click();
    cy.contains("div[id^='react-select']", data.city).click();
  }

  private setBirthDate(year: string, month: string, day: string) {
    cy.get(this.inputDateOfBirth).click();
    cy.get(this.selectYear).select(year);
    cy.get(this.selectMonth).select(month);
    // Seleciona o dia que não seja de outro mês
    cy.get(`.react-datepicker__day--0${day.padStart(2, "0")}:not(.react-datepicker__day--outside-month)`).first().click();
  }

  submitForm() {
    this.removeAdsAndFooter();
    cy.get(this.buttonSubmit).scrollIntoView().click({ force: true });
  }

  validateSuccessModal(data: StudentFormData) {
    cy.get(this.modalTitle, { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Thanks for submitting the form");

    // Validações dos dados na tabela
    cy.get(this.modalTable).then(($rows) => {
      const text = $rows.text();
      expect(text).to.contain(`${data.firstName} ${data.lastName}`);
      expect(text).to.contain(data.email);
      expect(text).to.contain(data.gender);
      expect(text).to.contain(data.mobile);
      expect(text).to.contain(data.subject);
      expect(text).to.contain("sample-upload.txt");
      expect(text).to.contain(data.address);
      expect(text).to.contain(`${data.state} ${data.city}`);
    });
  }

  closeSuccessModal() {
    this.removeAdsAndFooter();
    cy.get(this.buttonCloseModal).scrollIntoView().click({ force: true });
    cy.get(this.modalTitle).should("not.exist");
  }
}
