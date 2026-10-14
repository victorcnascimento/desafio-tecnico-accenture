# Relatório de Evidências - Testes de API DemoQA

**Data/Hora da Execução:** 14/10/2026, 17:54:54
**Total de Requisições:** 6

| Passo | Método / Endpoint | Status | Duração | Resultado |
|---|---|---|---|---|
| Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **406** | 530ms | PASSOU (406) |
| Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken) | `POST` `https://demoqa.com/Account/v1/GenerateToken` | **200** | 1371ms | PASSOU (200) |
| Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized) | `POST` `https://demoqa.com/Account/v1/Authorized` | **404** | 939ms | PASSOU (404) |
| Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/26d6a70b-254e-4afb-9c33-79b953642ac0) | `GET` `https://demoqa.com/Account/v1/User/26d6a70b-254e-4afb-9c33-79b953642ac0` | **401** | 1324ms | PASSOU (401) |
| Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books) | `POST` `https://demoqa.com/BookStore/v1/Books` | **400** | 338ms | PASSOU (400) |
| Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User) | `POST` `https://demoqa.com/Account/v1/User` | **400** | 257ms | PASSOU (400) |

## Detalhes das Requisições e Respostas

### 1. Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User)
- **Método:** `POST`
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `406`
- **Duração:** `530ms`
- **Resultado:** `PASSOU (406)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_Qi52Gk_1792011269258",
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
- **Duração:** `1371ms`
- **Resultado:** `PASSOU (200)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_RcP5Mr_1792011273793",
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
- **Duração:** `939ms`
- **Resultado:** `PASSOU (404)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_neg_e97XvX_1792011279281",
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

### 4. Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/26d6a70b-254e-4afb-9c33-79b953642ac0)
- **Método:** `GET`
- **URL:** `https://demoqa.com/Account/v1/User/26d6a70b-254e-4afb-9c33-79b953642ac0`
- **Status Code:** `401`
- **Duração:** `1324ms`
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
- **Duração:** `338ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userId": "2c5456c2-e817-4395-9b53-fc8d569f410d",
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
- **Duração:** `257ms`
- **Resultado:** `PASSOU (400)`
- **Request Payload (Sanitizado):**
```json
{
  "userName": "qa_nospass_1792011293780"
}
```
- **Response Body (Sanitizado):**
```json
{
  "code": "1200",
  "message": "UserName and Password required."
}
```

