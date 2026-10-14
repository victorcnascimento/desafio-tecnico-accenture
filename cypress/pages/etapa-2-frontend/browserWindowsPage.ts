import { BasePage } from "../BasePage";

export class BrowserWindowsPage extends BasePage {
  private homeCardAlerts = ".category-cards .card";
  private buttonNewWindow = "#windowButton";
  private headingSample = "#sampleHeading";

  visitHome() {
    this.visitHomePage();
  }

  navigateToBrowserWindows() {
    cy.contains(this.homeCardAlerts, "Alerts, Frame & Windows").scrollIntoView().click();
    this.removeAdsAndFooter();
    cy.contains("span", "Browser Windows").scrollIntoView().click();
  }

  prepareWindowStub() {
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
  }

  clickNewWindow() {
    this.removeAdsAndFooter();
    cy.get(this.buttonNewWindow).scrollIntoView().click();
    cy.get("@windowOpen").should("be.calledWithMatch", "/sample");
  }

  validateSamplePageContent(expectedMessage: string) {
    cy.visit("/sample");
    cy.get(this.headingSample).should("be.visible").and("have.text", expectedMessage);
  }

  closeAndReturnToMainWindow() {
    cy.visit("/browser-windows");
    cy.get(this.buttonNewWindow).should("be.visible");
  }
}
