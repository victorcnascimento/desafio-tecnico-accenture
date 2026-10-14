import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { BrowserWindowsPage } from "../../../pages/etapa-2-frontend/browserWindowsPage";

const browserWindowsPage = new BrowserWindowsPage();

Given("que o usuário acessa o submenu {string} na seção Alerts, Frame & Windows", function (submenu: string) {
  browserWindowsPage.visitHome();
  browserWindowsPage.navigateToBrowserWindows();
  browserWindowsPage.prepareWindowStub();
});

When("clica no botão \"New Window\"", function () {
  browserWindowsPage.clickNewWindow();
});

Then("uma nova janela deve ser aberta", function () {
  browserWindowsPage.assertNewWindowOpened("/sample");
});

Then("o texto {string} deve estar visível no corpo da nova página", function (expectedText: string) {
  browserWindowsPage.validateSamplePageContent(expectedText);
  cy.screenshot("CT02_browser_windows_sample");
});

Then("a nova janela é fechada retornando o foco à janela principal", function () {
  browserWindowsPage.closeAndReturnToMainWindow();
});
