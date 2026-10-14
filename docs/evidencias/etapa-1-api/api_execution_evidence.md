# Relatório de Evidências - Testes de API DemoQA

**Data/Hora da Execução:** 14/10/2026, 16:50:38
**Total de Requisições:** 6

| Passo | Método / Endpoint | Status | Duração | Resultado |
|---|---|---|---|---|
| 1. Criar Usuário (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **201** | 2428ms | PASSOU (2xx) |
| 2. Gerar Token (POST /Account/v1/GenerateToken) | `POST` `https://demoqa.com/Account/v1/GenerateToken` | **200** | 1233ms | PASSOU (2xx) |
| 3. Verificar Autorização (POST /Account/v1/Authorized) | `POST` `https://demoqa.com/Account/v1/Authorized` | **200** | 295ms | PASSOU (2xx) |
| 4. Listar Livros Disponíveis (GET /BookStore/v1/Books) | `GET` `https://demoqa.com/BookStore/v1/Books` | **200** | 268ms | PASSOU (2xx) |
| 5. Alugar Dois Livros (POST /BookStore/v1/Books) | `POST` `https://demoqa.com/BookStore/v1/Books` | **201** | 438ms | PASSOU (2xx) |
| 6. Consultar Detalhes do Usuário (GET /Account/v1/User/d2579091-26aa-4da3-88f1-ec8029ab1644) | `GET` `https://demoqa.com/Account/v1/User/d2579091-26aa-4da3-88f1-ec8029ab1644` | **200** | 329ms | PASSOU (2xx) |

## Detalhes das Requisições e Respostas

### 1. 1. Criar Usuário (POST /Account/v1/User)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `201`
- **Duração:** `2428ms`
- **Resultado:** `PASSOU (2xx)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_user_uNin25_1792007415502",
  "password": "********"
}
```
- **Response Body (Sanitizado):**
```json
{
  "userID": "213f69f7-4c9d-49d0-9faa-8478d844e4d7",
  "username": "qa_user_uNin25_1792007415502",
  "books": []
}
```

### 2. 2. Gerar Token (POST /Account/v1/GenerateToken)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/GenerateToken`
- **Status Code:** `200`
- **Duração:** `1233ms`
- **Resultado:** `PASSOU (2xx)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_user_BwU8d9_1792007420642",
  "password": "********"
}
```
- **Response Body (Sanitizado):**
```json
{
  "token": "eyJhbG...[MASKED]...0aeo",
  "expires": "2026-10-21T19:50:22.671Z",
  "status": "Success",
  "result": "User authorized successfully."
}
```

### 3. 3. Verificar Autorização (POST /Account/v1/Authorized)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/Authorized`
- **Status Code:** `200`
- **Duração:** `295ms`
- **Resultado:** `PASSOU (2xx)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_user_u0Zctg_1792007423983",
  "password": "********"
}
```
- **Response Body (Sanitizado):**
```json
true
```

### 4. 4. Listar Livros Disponíveis (GET /BookStore/v1/Books)
- **Método:** `GET`
- **URL:** `https://demoqa.com/BookStore/v1/Books`
- **Status Code:** `200`
- **Duração:** `268ms`
- **Resultado:** `PASSOU (2xx)`
- **Request Payload:** *(Sem payload no corpo)*
- **Response Body (Sanitizado):**
```json
{
  "books": [
    {
      "isbn": "9781449325862",
      "title": "Git Pocket Guide",
      "subTitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "publish_date": "2020-06-04T08:48:39.000Z",
      "publisher": "O'Reilly Media",
      "pages": 234,
      "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
      "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
    },
    {
      "isbn": "9781449331818",
      "title": "Learning JavaScript Design Patterns",
      "subTitle": "A JavaScript and jQuery Developer's Guide",
      "author": "Addy Osmani",
      "publish_date": "2020-06-04T09:11:40.000Z",
      "publisher": "O'Reilly Media",
      "pages": 254,
      "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",
      "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
    },
    {
      "isbn": "9781449337711",
      "title": "Designing Evolvable Web APIs with ASP.NET",
      "subTitle": "Harnessing the Power of the Web",
      "author": "Glenn Block et al.",
      "publish_date": "2020-06-04T09:12:43.000Z",
      "publisher": "O'Reilly Media",
      "pages": 238,
      "description": "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft",
      "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html"
    },
    {
      "isbn": "9781449365035",
      "title": "Speaking JavaScript",
      "subTitle": "An In-Depth Guide for Programmers",
      "author": "Axel Rauschmayer",
      "publish_date": "2014-02-01T00:00:00.000Z",
      "publisher": "O'Reilly Media",
      "pages": 460,
      "description": "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o",
      "website": "http://speakingjs.com/"
    },
    {
      "isbn": "9781491904244",
      "title": "You Don't Know JS",
      "subTitle": "ES6 & Beyond",
      "author": "Kyle Simpson",
      "publish_date": "2015-12-27T00:00:00.000Z",
      "publisher": "O'Reilly Media",
      "pages": 278,
      "description": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \\\"You Don’t Know JS\\\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the st",
      "website": "https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond"
    },
    {
      "isbn": "9781491950296",
      "title": "Programming JavaScript Applications",
      "subTitle": "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
      "author": "Eric Elliott",
      "publish_date": "2014-07-01T00:00:00.000Z",
      "publisher": "O'Reilly Media",
      "pages": 254,
      "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flex",
      "website": "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
    },
    {
      "isbn": "9781593275846",
      "title": "Eloquent JavaScript, Second Edition",
      "subTitle": "A Modern Introduction to Programming",
      "author": "Marijn Haverbeke",
      "publish_date": "2014-12-14T00:00:00.000Z",
      "publisher": "No Starch Press",
      "pages": 472,
      "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale ",
      "website": "http://eloquentjavascript.net/"
    },
    {
      "isbn": "9781593277574",
      "title": "Understanding ECMAScript 6",
      "subTitle": "The Definitive Guide for JavaScript Developers",
      "author": "Nicholas C. Zakas",
      "publish_date": "2016-09-03T00:00:00.000Z",
      "publisher": "No Starch Press",
      "pages": 352,
      "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
      "website": "https://leanpub.com/understandinges6/read"
    }
  ]
}
```

### 5. 5. Alugar Dois Livros (POST /BookStore/v1/Books)
- **Método:** `POST`
- **URL:** `https://demoqa.com/BookStore/v1/Books`
- **Status Code:** `201`
- **Duração:** `438ms`
- **Resultado:** `PASSOU (2xx)`
- **Request Payload (Sanitizado):**
```json
{
  "userId": "4e7b6c9c-a986-42d4-be30-5f91f4f00451",
  "collectionOfIsbns": [
    {
      "isbn": "9781449325862"
    },
    {
      "isbn": "9781449331818"
    }
  ]
}
```
- **Response Body (Sanitizado):**
```json
{
  "books": [
    {
      "isbn": "9781449325862"
    },
    {
      "isbn": "9781449331818"
    }
  ]
}
```

### 6. 6. Consultar Detalhes do Usuário (GET /Account/v1/User/d2579091-26aa-4da3-88f1-ec8029ab1644)
- **Método:** `GET`
- **URL:** `https://demoqa.com/Account/v1/User/d2579091-26aa-4da3-88f1-ec8029ab1644`
- **Status Code:** `200`
- **Duração:** `329ms`
- **Resultado:** `PASSOU (2xx)`
- **Request Payload:** *(Sem payload no corpo)*
- **Response Body (Sanitizado):**
```json
{
  "userId": "d2579091-26aa-4da3-88f1-ec8029ab1644",
  "username": "qa_user_i2ED7h_1792007434525",
  "books": [
    {
      "isbn": "9781449325862",
      "title": "Git Pocket Guide",
      "subTitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "publish_date": "2020-06-04T08:48:39.000Z",
      "publisher": "O'Reilly Media",
      "pages": 234,
      "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
      "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
    },
    {
      "isbn": "9781449331818",
      "title": "Learning JavaScript Design Patterns",
      "subTitle": "A JavaScript and jQuery Developer's Guide",
      "author": "Addy Osmani",
      "publish_date": "2020-06-04T09:11:40.000Z",
      "publisher": "O'Reilly Media",
      "pages": 254,
      "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",
      "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
    }
  ]
}
```

