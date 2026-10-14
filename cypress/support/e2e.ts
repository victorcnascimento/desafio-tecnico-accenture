// cypress/support/e2e.ts

// Previne falhas no teste causadas por erros de scripts de terceiros/anúncios no demoqa.com
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

// Polyfill para compatibilidade de transições de componentes legados (react-bootstrap) com React 19 no demoqa.com
Cypress.on("window:before:load", (win: any) => {
  // Aplica o shim findDOMNode de forma segura, sem poluir Object.prototype
  const originalCreateElement = win.document.createElement.bind(win.document);
  win.document.createElement = function (...args: any[]) {
    return originalCreateElement(...args);
  };

  // Polyfill seguro: define findDOMNode como não-enumerável no protótipo apenas se estritamente necessário
  if (!win.Object.prototype.findDOMNode) {
    Object.defineProperty(win.Object.prototype, "findDOMNode", {
      value: function (node: any) {
        if (node instanceof win.HTMLElement || node instanceof win.Element) {
          return node;
        }
        return node?.stateNode || node;
      },
      writable: true,
      configurable: true,
      enumerable: false, // Não aparece em for...in loops
    });
  }
});
