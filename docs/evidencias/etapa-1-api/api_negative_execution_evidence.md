# Relatório de Evidências - Testes de API DemoQA

**Data/Hora da Execução:** 14/10/2026, 17:12:20
**Total de Requisições:** 6

| Passo | Método / Endpoint | Status | Duração | Resultado |
|---|---|---|---|---|
| Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **406** | 1845ms | PASSOU (406) |
| Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken) | `POST` `https://demoqa.com/Account/v1/GenerateToken` | **200** | 1541ms | PASSOU (200) |
| Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized) | `POST` `https://demoqa.com/Account/v1/Authorized` | **404** | 996ms | PASSOU (404) |
| Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/4cde16be-31f1-4713-a6b2-7156268fbebe) | `GET` `https://demoqa.com/Account/v1/User/4cde16be-31f1-4713-a6b2-7156268fbebe` | **401** | 382ms | PASSOU (401) |
| Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books) | `POST` `https://demoqa.com/BookStore/v1/Books` | **400** | 319ms | PASSOU (400) |
| Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **400** | 249ms | PASSOU (400) |

## Detalhes das Requisições e Respostas

### 1. Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `406`
- **Duração:** `1845ms`
- **Resultado:** `PASSOU (406)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_5zvKJx_1792008712469",
  "password": "********"
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1204",
  "message": "User exists!"
}
```

### 2. Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/GenerateToken`
- **Status Code:** `200`
- **Duração:** `1541ms`
- **Resultado:** `PASSOU (200)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_2JdmYN_1792008719835",
  "password": "********"
}
```
- **Response Body (Sanitizado):**
```json
{
  "token": null,
  "expires": null,
  "status": "Failed",
  "result": "User authorization failed."
}
```

### 3. Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/Authorized`
- **Status Code:** `404`
- **Duração:** `996ms`
- **Resultado:** `PASSOU (404)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_vzNsHD_1792008726908",
  "password": "********"
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1207",
  "message": "User not found!"
}
```

### 4. Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/4cde16be-31f1-4713-a6b2-7156268fbebe)
- **Método:** `GET`
- **URL:** `https://demoqa.com/Account/v1/User/4cde16be-31f1-4713-a6b2-7156268fbebe`
- **Status Code:** `401`
- **Duração:** `382ms`
- **Resultado:** `PASSOU (401)`
- **Request Payload:** *(Sem payload no corpo)*
- **Response Body (Sanitizado):**
```json
{
  "code": "1200",
  "message": "User not authorized!"
}
```

### 5. Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books)
- **Método:** `POST`
- **URL:** `https://demoqa.com/BookStore/v1/Books`
- **Status Code:** `400`
- **Duração:** `319ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userId": "f50a54f3-d0a4-4927-b227-bccaa26b296a",
  "collectionOfIsbns": [
    {
      "isbn": "9781449325862"
    }
  ]
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1210",
  "message": "ISBN already present in the User's Collection!"
}
```

### 6. Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `400`
- **Duração:** `249ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_nospass_1792008740699"
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1200",
  "message": "UserName and Password required."
}
```

