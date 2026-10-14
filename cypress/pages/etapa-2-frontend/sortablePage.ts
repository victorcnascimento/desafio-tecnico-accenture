import { BasePage } from "../BasePage";

export class SortablePage extends BasePage {
  private homeCardInteractions = ".category-cards .card";
  private listItemsSelector = "#demo-tabpane-list .vertical-list-container .list-group-item";

  visitHome() {
    this.visitHomePage();
  }

  navigateToSortable() {
    cy.contains(this.homeCardInteractions, "Interactions").scrollIntoView().click();
    this.removeAdsAndFooter();
    cy.contains("span", "Sortable").scrollIntoView().click();
  }

  getListItems() {
    return cy.get(this.listItemsSelector);
  }

  getCurrentOrder(): Cypress.Chainable<string[]> {
    return this.getListItems().then(($items) => {
      return [...$items].map((el) => el.innerText.trim());
    });
  }

  /**
   * Realiza o drag and drop entre dois itens identificados pelo texto.
   * Suporta eventos de mouse mousedown -> mousemove -> mouseup para bibliotecas como react-sortable-hoc.
   */
  dragAndDrop(sourceText: string, targetText: string) {
    this.removeAdsAndFooter();

    cy.contains(this.listItemsSelector, targetText).then(($target) => {
      const targetRect = $target[0].getBoundingClientRect();
      const targetY = targetRect.top + targetRect.height / 2;
      const targetX = targetRect.left + targetRect.width / 2;

      cy.contains(this.listItemsSelector, sourceText).then(($source) => {
        const sourceRect = $source[0].getBoundingClientRect();
        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;

        cy.wrap($source)
          .trigger("mousedown", { which: 1, button: 0, clientX: startX, clientY: startY, force: true })
          .wait(100);

        // Dispara movimentos intermediários para o componente registrar o drag
        cy.get("body")
          .trigger("mousemove", { which: 1, button: 0, clientX: startX, clientY: (startY + targetY) / 2, force: true })
          .wait(100)
          .trigger("mousemove", { which: 1, button: 0, clientX: targetX, clientY: targetY, force: true })
          .wait(100)
          .trigger("mouseup", { force: true })
          .wait(100);
      });
    });
  }

  sortItemsAscending() {
    const expectedOrder = ["One", "Two", "Three", "Four", "Five", "Six"];

    // Algoritmo genérico: para cada posição, encontra o item correto e arrasta para a posição
    this.getCurrentOrder().then((currentOrder) => {
      cy.log("Ordem inicial dos itens: " + JSON.stringify(currentOrder));

      const sortStep = (index: number) => {
        if (index >= expectedOrder.length) return;

        this.getCurrentOrder().then((order) => {
          const currentIndex = order.indexOf(expectedOrder[index]);
          if (currentIndex !== index && currentIndex !== -1) {
            // Arrasta o item da posição atual para a posição destino
            this.dragAndDrop(expectedOrder[index], order[index]);
            cy.wait(200);
            sortStep(index);
          } else {
            sortStep(index + 1);
          }
        });
      };

      sortStep(0);
    });
  }

  validateAscendingOrder() {
    const expectedOrder = ["One", "Two", "Three", "Four", "Five", "Six"];
    this.getListItems().each(($item, index) => {
      cy.wrap($item).should("have.text", expectedOrder[index]);
    });
  }
}
