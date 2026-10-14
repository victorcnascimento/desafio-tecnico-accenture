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
        if (current < 18) {
          cy.wait(40);
          pollAndStop(attempt + 1);
        } else {
          cy.get(this.buttonStartStop).click();
        }
      });
    };

    pollAndStop();
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
    cy.get(this.buttonStartStop).click();
    // Aguarda atingir 100%
    cy.get(this.progressBar, { timeout: 15000 })
      .should("have.attr", "aria-valuenow", "100");
  }

  resetProgressBar() {
    this.removeAdsAndFooter();
    cy.get(this.buttonReset, { timeout: 5000 }).should("be.visible").click();
    cy.get(this.progressBar).should("have.attr", "aria-valuenow", "0");
  }
}
