# Relatório de Evidências - Testes de API DemoQA

**Data/Hora da Execução:** 14/10/2026, 15:48:58
**Total de Requisições:** 6

| Passo | Método / Endpoint | Status | Duração | Resultado |
|---|---|---|---|---|
| Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User) | `https://demoqa.com/Account/v1/User` | **406** | 440ms | PASSOU (406) |
| Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken) | `https://demoqa.com/Account/v1/GenerateToken` | **200** | 1649ms | PASSOU (200) |
| Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized) | `https://demoqa.com/Account/v1/Authorized` | **404** | 958ms | PASSOU (404) |
| Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/bb42de00-9eef-44fc-bdc2-2ae139898e57) | `https://demoqa.com/Account/v1/User/bb42de00-9eef-44fc-bdc2-2ae139898e57` | **401** | 1197ms | PASSOU (401) |
| Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books) | `https://demoqa.com/BookStore/v1/Books` | **400** | 303ms | PASSOU (400) |
| Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User) | `https://demoqa.com/Account/v1/User` | **400** | 339ms | PASSOU (400) |

## Detalhes das Requisições e Respostas

### 1. Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User)
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `406`
- **Duração:** `440ms`
- **Resultado:** `PASSOU (406)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_bi1SxH_1792003711134",
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
- **URL:** `https://demoqa.com/Account/v1/GenerateToken`
- **Status Code:** `200`
- **Duração:** `1649ms`
- **Resultado:** `PASSOU (200)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_ywJs3M_1792003716358",
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
- **URL:** `https://demoqa.com/Account/v1/Authorized`
- **Status Code:** `404`
- **Duração:** `958ms`
- **Resultado:** `PASSOU (404)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_v19pRM_1792003723474",
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

### 4. Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/bb42de00-9eef-44fc-bdc2-2ae139898e57)
- **URL:** `https://demoqa.com/Account/v1/User/bb42de00-9eef-44fc-bdc2-2ae139898e57`
- **Status Code:** `401`
- **Duração:** `1197ms`
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
- **URL:** `https://demoqa.com/BookStore/v1/Books`
- **Status Code:** `400`
- **Duração:** `303ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userId": "d6701842-5385-4fdb-a2f5-da41b0c4681a",
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
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `400`
- **Duração:** `339ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_nospass_1792003738092"
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1200",
  "message": "UserName and Password required."
}
```

