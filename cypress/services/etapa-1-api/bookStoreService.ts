export interface BookItem {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publish_date: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export interface GetBooksResponse {
  books: BookItem[];
}

export interface RentBooksResponse {
  books: Array<{ isbn: string }>;
}

export class BookStoreService {
  private baseUrl: string;

  constructor(baseUrl: string = "https://demoqa.com") {
    this.baseUrl = baseUrl;
  }

  getBooks(): Cypress.Chainable<Cypress.Response<GetBooksResponse>> {
    return cy.request<GetBooksResponse>({
      method: "GET",
      url: `${this.baseUrl}/BookStore/v1/Books`,
      failOnStatusCode: false,
    });
  }

  rentBooks(userId: string, isbns: string[], token: string): Cypress.Chainable<Cypress.Response<RentBooksResponse>> {
    const payload = {
      userId: userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
    };

    return cy.request<RentBooksResponse>({
      method: "POST",
      url: `${this.baseUrl}/BookStore/v1/Books`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
      failOnStatusCode: false,
    });
  }
}
