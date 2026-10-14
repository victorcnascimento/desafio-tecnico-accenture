export class BasePage {
  protected removeAdsAndFooter() {
    cy.get("body").then(($body) => {
      if ($body.find("#fixedban").length > 0) {
        cy.get("#fixedban").invoke("remove");
      }
      if ($body.find("footer").length > 0) {
        cy.get("footer").invoke("remove");
      }
    });
  }

  protected visitHomePage() {
    cy.visit("/");
    this.removeAdsAndFooter();
  }
}
