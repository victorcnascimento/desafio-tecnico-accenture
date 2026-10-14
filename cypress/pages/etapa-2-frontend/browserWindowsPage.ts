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
  }

  assertNewWindowOpened(expectedUrlPart: string = "/sample") {
    cy.get("@windowOpen").should("be.called").and("be.calledWithMatch", expectedUrlPart);
  }

  validateSamplePageContent(expectedMessage: string) {
    cy.get("@windowOpen").then((stub: any) => {
      const openedUrl = stub.args[0][0];
      expect(openedUrl, "URL da janela aberta").to.contain("/sample");
      cy.visit(openedUrl);
      cy.get(this.headingSample).should("be.visible").and("have.text", expectedMessage);
    });
  }

  closeAndReturnToMainWindow() {
    cy.go("back");
    cy.url().should("include", "/browser-windows");
    cy.get(this.buttonNewWindow).should("be.visible");
  }
}
