export interface CreateUserResponse {
  userID: string;
  username: string;
  books: any[];
}

export interface GenerateTokenResponse {
  token: string;
  expires: string;
  status: string;
  result: string;
}

export interface UserDetailsResponse {
  userId: string;
  username: string;
  books: Array<{
    isbn: string;
    title: string;
    subTitle: string;
    author: string;
    publish_date: string;
    publisher: string;
    pages: number;
    description: string;
    website: string;
  }>;
}

export class AccountService {
  private baseUrl: string;

  constructor(baseUrl: string = "https://demoqa.com") {
    this.baseUrl = baseUrl;
  }

  createUser(payload: { userName: string; password: string }): Cypress.Chainable<Cypress.Response<CreateUserResponse>> {
    return cy.request<CreateUserResponse>({
      method: "POST",
      url: `${this.baseUrl}/Account/v1/User`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  generateToken(payload: { userName: string; password: string }): Cypress.Chainable<Cypress.Response<GenerateTokenResponse>> {
    return cy.request<GenerateTokenResponse>({
      method: "POST",
      url: `${this.baseUrl}/Account/v1/GenerateToken`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  checkAuthorized(payload: { userName: string; password: string }): Cypress.Chainable<Cypress.Response<boolean>> {
    return cy.request<boolean>({
      method: "POST",
      url: `${this.baseUrl}/Account/v1/Authorized`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  getUserDetails(userId: string, token: string): Cypress.Chainable<Cypress.Response<UserDetailsResponse>> {
    return cy.request<UserDetailsResponse>({
      method: "GET",
      url: `${this.baseUrl}/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  }

  deleteUser(userId: string, token: string): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request<any>({
      method: "DELETE",
      url: `${this.baseUrl}/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  }
}
