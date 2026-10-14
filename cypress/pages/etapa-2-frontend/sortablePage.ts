import { BasePage } from "../BasePage";

export const ASCENDING_ORDER = ["One", "Two", "Three", "Four", "Five", "Six"];

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
   * Valida (com retry) que a lista está exatamente na ordem informada, incluindo a quantidade de itens.
   */
  assertOrder(expectedOrder: string[]) {
    this.getListItems().should(($items) => {
      const order = [...$items].map((el) => el.innerText.trim());
      expect(order, "Ordem atual dos itens").to.deep.equal(expectedOrder);
    });
  }

  /**
   * Realiza o drag and drop entre dois itens identificados pelo texto.
   * O Sortable do DemoQA usa react-dnd com backend HTML5 (itens com draggable="true"), que reage a eventos
   * nativos de drag (dragstart -> dragenter -> dragover -> drop -> dragend) e não a eventos de mouse.
   * Todos os eventos compartilham o mesmo DataTransfer, como acontece em um arraste real.
   */
  dragAndDrop(sourceText: string, targetText: string) {
    this.removeAdsAndFooter();

    cy.window().then((win) => {
      const dataTransfer = new win.DataTransfer();

      cy.contains(this.listItemsSelector, sourceText).trigger("dragstart", { dataTransfer });
      cy.contains(this.listItemsSelector, targetText)
        .trigger("dragenter", { dataTransfer })
        .trigger("dragover", { dataTransfer })
        .trigger("drop", { dataTransfer });
      cy.contains(this.listItemsSelector, sourceText).trigger("dragend", { dataTransfer });
    });
  }

  /**
   * Arrasta um item para a posição informada e valida que ele realmente foi movido.
   * Possui guard de limite de tentativas para evitar loops infinitos.
   */
  moveItemToIndex(itemText: string, targetIndex: number) {
    this.getCurrentOrder().then((order) => {
      expect(order, `Item "${itemText}" deve existir na lista`).to.include(itemText);
      const currentIndex = order.indexOf(itemText);
      if (currentIndex === targetIndex) {
        return;
      }
      this.dragAndDrop(itemText, order[targetIndex]);
    });
    this.getListItems().eq(targetIndex).should("have.text", itemText);
  }

  /**
   * A lista do DemoQA já carrega em ordem crescente. Para que a ordenação exija drag and drop de fato,
   * a lista é colocada em ordem inversa (Six ... One) arrastando cada item para o topo.
   */
  shuffleItems() {
    this.assertOrder(ASCENDING_ORDER);

    ASCENDING_ORDER.slice(1).forEach((item) => {
      this.moveItemToIndex(item, 0);
    });

    this.assertOrder([...ASCENDING_ORDER].reverse());
  }

  /**
   * Reordena os elementos para ordem crescente garantindo que o drag and drop SEJA OBRIGATORIAMENTE
   * executado e que a recursão possua limite estrito de tentativas para evitar loop infinito.
   */
  sortItemsAscending(maxAttempts: number = 20) {
    let totalDrags = 0;
    let attempts = 0;

    // Se a lista estiver na ordem original (One a Six), desloca elementos para forçar o arraste
    this.getCurrentOrder().then((initialOrder) => {
      const isAlreadySorted = JSON.stringify(initialOrder) === JSON.stringify(ASCENDING_ORDER);
      if (isAlreadySorted) {
        cy.log("Lista carregada já ordenada. Forçando deslocamento do item 'Six' para o topo para testar arraste.");
        this.moveItemToIndex("Six", 0);
        totalDrags++;
      }

      const sortStep = (index: number) => {
        attempts++;
        if (attempts > maxAttempts) {
          throw new Error(`Limite de ${maxAttempts} tentativas excedido ao ordenar lista via drag and drop.`);
        }

        if (index >= ASCENDING_ORDER.length) {
          expect(totalDrags, "O teste deve obrigatoriamente executar ao menos uma operação de drag and drop").to.be.greaterThan(0);
          return;
        }

        this.getCurrentOrder().then((order) => {
          if (order[index] !== ASCENDING_ORDER[index]) {
            this.moveItemToIndex(ASCENDING_ORDER[index], index);
            totalDrags++;
            cy.wait(150);
          }
          sortStep(index + 1);
        });
      };

      sortStep(0);
    });
  }

  validateAscendingOrder(fromItem: string, toItem: string) {
    const start = ASCENDING_ORDER.indexOf(fromItem);
    const end = ASCENDING_ORDER.indexOf(toItem);
    expect(start, `"${fromItem}" deve ser um item válido`).to.be.greaterThan(-1);
    expect(end, `"${toItem}" deve ser um item válido`).to.be.greaterThan(start);

    this.assertOrder(ASCENDING_ORDER.slice(start, end + 1));
  }
}
