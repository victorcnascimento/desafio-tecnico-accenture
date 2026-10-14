import { BasePage } from "../BasePage";

export class ProgressBarPage extends BasePage {
  private homeCardWidgets = ".category-cards .card";
  private buttonStartStop = "#startStopButton";
  private progressBar = "#progressBar [role='progressbar']";
  private buttonReset = "#resetButton";

  visitHome() {
    this.visitHomePage();
  }

  navigateToProgressBar() {
    cy.contains(this.homeCardWidgets, "Widgets").scrollIntoView().click();
    this.removeAdsAndFooter();
    cy.contains("span", "Progress Bar").scrollIntoView().click();
  }

  clickStart() {
    this.removeAdsAndFooter();
    cy.get(this.buttonStartStop).scrollIntoView().click();
  }

  stopBeforeOrAt25Percent(maxAttempts: number = 200) {
    const pollAndStop = (attempt: number = 0) => {
      if (attempt >= maxAttempts) {
        throw new Error(`Barra de progresso não avançou após ${maxAttempts} tentativas de polling`);
      }
      cy.get(this.progressBar).invoke("attr", "aria-valuenow").then((val) => {
        const current = parseInt(val || "0", 10);
        // Interrompe quando atingir entre 14% e 18%, garantindo que a parada ocorra com folga antes dos 25%
        if (current < 14) {
          cy.wait(40);
          pollAndStop(attempt + 1);
        } else {
          cy.get(this.buttonStartStop).scrollIntoView().click({ force: true });
        }
      });
    };

    pollAndStop();
    // Garante que o botão alternou para "Start" (confirmando a interrupção da barra)
    cy.get(this.buttonStartStop, { timeout: 10000 }).should("contain.text", "Start");
  }

  validateProgressLessOrEqualTo25() {
    cy.get(this.progressBar).invoke("attr", "aria-valuenow").then((val) => {
      const percentage = parseInt(val || "0", 10);
      cy.log(`Valor da barra de progresso interrompida: ${percentage}%`);
      expect(percentage, "O percentual da barra deve ser maior que 0% e menor ou igual a 25%").to.be.greaterThan(0).and.to.be.at.most(25);
    });
  }

  resumeUntil100Percent() {
    this.removeAdsAndFooter();
    cy.get(this.buttonStartStop).scrollIntoView().click({ force: true });
    // Aguarda atingir 100% com timeout generoso (30s) para evitar flakiness em conexões lentas ou máquinas sob carga
    cy.get(this.progressBar, { timeout: 30000 })
      .should("have.attr", "aria-valuenow", "100");
  }

  resetProgressBar() {
    this.removeAdsAndFooter();
    // Ao atingir 100%, o DemoQA substitui o startStopButton pelo resetButton
    cy.get(this.buttonReset, { timeout: 15000 })
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });
    cy.get(this.progressBar, { timeout: 10000 })
      .should("have.attr", "aria-valuenow", "0");
  }
}
