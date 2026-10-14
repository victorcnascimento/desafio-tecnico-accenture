export interface EvidenceRecord {
  step: string;
  endpoint: string;
  method: string;
  status: number;
  expectedStatus?: number | number[];
  result?: string;
  requestPayload?: any;
  responseBody?: any;
  durationMs?: number;
  timestamp: string;
}

export class EvidenceHelper {
  private static records: EvidenceRecord[] = [];

  private static sanitize(data: any): any {
    if (!data) return data;
    if (typeof data !== "object") return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitize(item));
    }

    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      const lower = key.toLowerCase();
      if (lower.includes("password") || lower.includes("senha")) {
        sanitized[key] = "********";
      } else if (lower.includes("token") && typeof value === "string") {
        sanitized[key] = value.length > 10 ? `${value.slice(0, 6)}...[MASKED]...${value.slice(-4)}` : "[MASKED_TOKEN]";
      } else if (lower === "authorization" && typeof value === "string") {
        sanitized[key] = "Bearer [MASKED_TOKEN]";
      } else if (typeof value === "object" && value !== null) {
        sanitized[key] = this.sanitize(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  static recordApiCall(
    step: string,
    endpoint: string,
    method: string,
    response: Cypress.Response<any>,
    requestPayload?: any,
    attachFn?: (data: string, mediaType: string) => void,
    expectedStatus?: number | number[]
  ) {
    let result = "PASSOU (2xx)";
    if (expectedStatus !== undefined) {
      const isExpected = Array.isArray(expectedStatus)
        ? expectedStatus.includes(response.status)
        : response.status === expectedStatus;
      result = isExpected ? `PASSOU (${response.status})` : `FALHOU (esperado ${expectedStatus}, obtido ${response.status})`;
    } else {
      const is2xx = response.status >= 200 && response.status < 300;
      result = is2xx ? "PASSOU (2xx)" : "FALHOU";
    }

    const record: EvidenceRecord = {
      step,
      endpoint: endpoint || (response as any).url || "",
      method,
      status: response.status,
      expectedStatus,
      result,
      requestPayload: this.sanitize(requestPayload ?? null),
      responseBody: this.sanitize(response.body),
      durationMs: response.duration,
      timestamp: new Date().toISOString(),
    };

    this.records.push(record);

    cy.log(`[EVIDENCIA][${record.status}][${record.result}] ${step} -> ${record.endpoint}`);

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
      content += `| ${rec.step} | \`${rec.method}\` \`${rec.endpoint}\` | **${rec.status}** | ${rec.durationMs}ms | ${rec.result} |\n`;
    });

    content += `\n## Detalhes das Requisições e Respostas\n\n`;

    this.records.forEach((rec, idx) => {
      content += `### ${idx + 1}. ${rec.step}\n`;
      content += `- **Método:** \`${rec.method}\`\n`;
      content += `- **URL:** \`${rec.endpoint}\`\n`;
      content += `- **Status Code:** \`${rec.status}\`\n`;
      content += `- **Duração:** \`${rec.durationMs}ms\`\n`;
      content += `- **Resultado:** \`${rec.result}\`\n`;
      if (rec.requestPayload) {
        content += `- **Request Payload (Sanitizado):**\n\`\`\`json\n${JSON.stringify(rec.requestPayload, null, 2)}\n\`\`\`\n`;
      } else {
        content += `- **Request Payload:** *(Sem payload no corpo)*\n`;
      }
      content += `- **Response Body (Sanitizado):**\n\`\`\`json\n${JSON.stringify(rec.responseBody, null, 2)}\n\`\`\`\n\n`;
    });

    cy.writeFile(mdPath, content);
  }
}
