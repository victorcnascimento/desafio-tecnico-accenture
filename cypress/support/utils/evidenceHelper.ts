export interface EvidenceRecord {
  step: string;
  endpoint: string;
  method: string;
  status: number;
  requestPayload?: any;
  responseBody?: any;
  durationMs?: number;
  timestamp: string;
}

export class EvidenceHelper {
  private static records: EvidenceRecord[] = [];

  static recordApiCall(step: string, endpoint: string, response: Cypress.Response<any>, requestPayload?: any, attachFn?: (data: string, mediaType: string) => void) {
    const record: EvidenceRecord = {
      step,
      endpoint: endpoint || response.url || "",
      method: (response as any).method || "HTTP",
      status: response.status,
      requestPayload: requestPayload ?? null,
      responseBody: response.body,
      durationMs: response.duration,
      timestamp: new Date().toISOString(),
    };

    this.records.push(record);

    cy.log(`[EVIDENCIA][${record.status}] ${step} -> ${record.endpoint}`);

    if (attachFn) {
      try {
        attachFn(JSON.stringify(record, null, 2), "application/json");
      } catch (e) {
        // Ignora se attach não estiver disponível no contexto
      }
    }
  }

  static getRecords(): EvidenceRecord[] {
    return this.records;
  }

  static clearRecords() {
    this.records = [];
  }

  static saveEvidenceReport(jsonPath: string) {
    if (this.records.length > 0) {
      cy.writeFile(jsonPath, JSON.stringify(this.records, null, 2));
    }
  }

  static saveMarkdownReport(mdPath: string) {
    if (this.records.length === 0) return;

    let content = `# Relatório de Evidências - Testes de API DemoQA\n\n`;
    content += `**Data/Hora da Execução:** ${new Date().toLocaleString("pt-BR")}\n`;
    content += `**Total de Requisições:** ${this.records.length}\n\n`;
    content += `| Passo | Método / Endpoint | Status | Duração | Resultado |\n`;
    content += `|---|---|---|---|---|\n`;

    this.records.forEach((rec) => {
      const isSuccess = rec.status >= 200 && rec.status < 300 ? "PASSOU (2xx)" : "FALHOU";
      content += `| ${rec.step} | \`${rec.endpoint}\` | **${rec.status}** | ${rec.durationMs}ms | ${isSuccess} |\n`;
    });

    content += `\n## Detalhes das Requisições e Respostas\n\n`;

    this.records.forEach((rec, idx) => {
      content += `### ${idx + 1}. ${rec.step}\n`;
      content += `- **URL:** \`${rec.endpoint}\`\n`;
      content += `- **Status Code:** \`${rec.status}\`\n`;
      content += `- **Duração:** \`${rec.durationMs}ms\`\n`;
      if (rec.requestPayload) {
        content += `- **Request Payload:**\n\`\`\`json\n${JSON.stringify(rec.requestPayload, null, 2)}\n\`\`\`\n`;
      } else {
        content += `- **Request Payload:** *(Sem payload no corpo)*\n`;
      }
      content += `- **Response Body:**\n\`\`\`json\n${JSON.stringify(rec.responseBody, null, 2)}\n\`\`\`\n\n`;
    });

    cy.writeFile(mdPath, content);
  }
}
