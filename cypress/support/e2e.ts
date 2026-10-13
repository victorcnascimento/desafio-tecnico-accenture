// cypress/support/e2e.ts

// Previne falhas no teste causadas por erros de scripts de terceiros/anúncios no demoqa.com
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
