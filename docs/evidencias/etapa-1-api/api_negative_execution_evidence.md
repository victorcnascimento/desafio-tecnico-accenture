# Relatório de Evidências - Testes de API DemoQA

**Data/Hora da Execução:** 14/10/2026, 16:51:06
**Total de Requisições:** 6

| Passo | Método / Endpoint | Status | Duração | Resultado |
|---|---|---|---|---|
| Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **406** | 1038ms | PASSOU (406) |
| Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken) | `POST` `https://demoqa.com/Account/v1/GenerateToken` | **200** | 1519ms | PASSOU (200) |
| Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized) | `POST` `https://demoqa.com/Account/v1/Authorized` | **404** | 672ms | PASSOU (404) |
| Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/6df058a4-f778-4c16-83d5-1ac223735bca) | `GET` `https://demoqa.com/Account/v1/User/6df058a4-f778-4c16-83d5-1ac223735bca` | **401** | 1100ms | PASSOU (401) |
| Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books) | `POST` `https://demoqa.com/BookStore/v1/Books` | **400** | 932ms | PASSOU (400) |
| Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **400** | 205ms | PASSOU (400) |

## Detalhes das Requisições e Respostas

### 1. Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `406`
- **Duração:** `1038ms`
- **Resultado:** `PASSOU (406)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_mTHY9b_1792007440529",
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
- **Duração:** `1519ms`
- **Resultado:** `PASSOU (200)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_9Gb02I_1792007445447",
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
- **Duração:** `672ms`
- **Resultado:** `PASSOU (404)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_fttgWd_1792007451591",
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

### 4. Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/6df058a4-f778-4c16-83d5-1ac223735bca)
- **Método:** `GET`
- **URL:** `https://demoqa.com/Account/v1/User/6df058a4-f778-4c16-83d5-1ac223735bca`
- **Status Code:** `401`
- **Duração:** `1100ms`
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
- **Duração:** `932ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userId": "d17ada95-2b8d-4ca3-8e48-832a7814bb1b",
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
- **Duração:** `205ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_nospass_1792007466071"
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1200",
  "message": "UserName and Password required."
}
```

