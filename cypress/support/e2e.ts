// cypress/support/e2e.ts

// Previne falhas no teste causadas por erros de scripts de terceiros/anúncios no demoqa.com
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

// Polyfill para compatibilidade de transições de componentes legados (react-bootstrap) com React 19 no demoqa.com
Cypress.on("window:before:load", (win: any) => {
  if (!win.Object.prototype.findDOMNode) {
    win.Object.prototype.findDOMNode = function (node: any) {
      if (node instanceof win.HTMLElement || node instanceof win.Element) {
        return node;
      }
      return node?.stateNode || node;
    };
  }
});
