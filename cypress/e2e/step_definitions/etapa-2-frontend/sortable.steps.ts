import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { SortablePage } from "../../../pages/etapa-2-frontend/sortablePage";

const sortablePage = new SortablePage();

Given("que o usuário acessa o submenu {string} na seção Interactions", function (submenu: string) {
  sortablePage.visitHome();
  sortablePage.navigateToSortable();
});

Given("que os itens da lista estão fora da ordem crescente", function () {
  sortablePage.shuffleItems();
  cy.screenshot("CT06_sortable_embaralhado", { capture: "viewport" });
});

When("reordena os elementos através do método de arrastar e soltar", function () {
  sortablePage.sortItemsAscending();
});

Then("os itens devem estar dispostos na ordem sequencial exata de {string} a {string}", function (fromItem: string, toItem: string) {
  sortablePage.validateAscendingOrder(fromItem, toItem);
  cy.screenshot("CT06_sortable_ordenado", { capture: "viewport" });
});
