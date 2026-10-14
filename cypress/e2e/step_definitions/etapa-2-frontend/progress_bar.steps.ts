import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProgressBarPage } from "../../../pages/etapa-2-frontend/progressBarPage";

const progressBarPage = new ProgressBarPage();

Given("que o usuário acessa o submenu {string} na seção Widgets", function (submenu: string) {
  progressBarPage.visitHome();
  progressBarPage.navigateToProgressBar();
});

When("clica no botão {string} para iniciar o progresso", function (buttonName: string) {
  progressBarPage.clickStart();
});

When("clica no botão {string} antes ou exatamente ao atingir 25%", function (buttonName: string) {
  progressBarPage.stopBeforeOrAt25Percent();
});

Then("o percentual da barra de progresso deve ser menor ou igual a 25%", function () {
  progressBarPage.validateProgressLessOrEqualTo25();
  cy.screenshot("CT05_progress_bar_parado_25", { capture: "viewport" });
});

When("clica em {string} novamente aguardando a barra atingir 100%", function (buttonName: string) {
  progressBarPage.resumeUntil100Percent();
});

When("clica no botão \"Reset\"", function () {
  progressBarPage.resetProgressBar();
});

Then("a barra de progresso deve ser zerada voltando a 0%", function () {
  cy.get("#progressBar [role='progressbar']").should("have.attr", "aria-valuenow", "0");
  cy.screenshot("CT05_progress_bar_reset", { capture: "viewport" });
});
