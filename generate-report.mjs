import { generate } from "multiple-cucumber-html-reporter";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDir = path.resolve(__dirname, "cypress/reports/cucumber-json");
const reportPath = path.resolve(__dirname, "cypress/reports/html-report");

if (!fs.existsSync(jsonDir)) {
  console.log("Diretório de relatórios JSON não encontrado:", jsonDir);
  process.exit(0);
}

try {
  generate({
    jsonDir: jsonDir,
    reportPath: reportPath,
    pageTitle: "Relatório de Testes Automatizados - Accenture",
    reportName: "Desafio QA Automation - Execução dos Testes",
    displayDuration: true,
    displayReportTime: true,
    metadata: {
      browser: {
        name: "chrome",
        version: "headless",
      },
      device: "Local Machine",
      platform: {
        name: "windows",
        version: "11",
      },
    },
    customData: {
      title: "Informações do Projeto",
      data: [
        { label: "Projeto", value: "Desafio Técnico QA - Accenture" },
        { label: "Ambiente", value: "DemoQA (https://demoqa.com)" },
        { label: "Executor", value: "Cypress + Cucumber BDD + TypeScript" },
        { label: "Data de Execução", value: new Date().toLocaleString("pt-BR") },
      ],
    },
  });
  console.log("Relatório HTML gerado com sucesso em:", reportPath);
} catch (error) {
  console.error("Erro ao gerar relatório HTML:", error);
}
