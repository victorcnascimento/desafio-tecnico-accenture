# Relatório de Evidências - Testes de API DemoQA

**Data/Hora da Execução:** 14/10/2026, 15:04:47
**Total de Requisições:** 6

| Passo | Método / Endpoint | Status | Duração | Resultado |
|---|---|---|---|---|
| Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User) | `https://demoqa.com/Account/v1/User` | **406** | 785ms | FALHOU |
| Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken) | `https://demoqa.com/Account/v1/GenerateToken` | **200** | 1752ms | PASSOU (2xx) |
| Negativo 3: Verificar Autorização com Senha Inválida (POST /Account/v1/Authorized) | `https://demoqa.com/Account/v1/Authorized` | **404** | 943ms | FALHOU |
| Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/3cbfb7f2-190b-4f23-af34-7b007ee4cbf4) | `https://demoqa.com/Account/v1/User/3cbfb7f2-190b-4f23-af34-7b007ee4cbf4` | **401** | 1222ms | FALHOU |
| Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books) | `https://demoqa.com/BookStore/v1/Books` | **400** | 305ms | FALHOU |
| Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User) | `https://demoqa.com/Account/v1/User` | **400** | 210ms | FALHOU |

## Detalhes das Requisições e Respostas

### 1. Negativo 1: Criar Usuário Duplicado (POST /Account/v1/User)
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `406`
- **Duração:** `785ms`
- **Request Payload:**
```json
{
  "userName": "qa_neg_QpX2k0_1792001062162",
  "password": "QA@Passw0rd!2162"
}
```
- **Response Body:**
```json
{
  "code": "1204",
  "message": "User exists!"
}
```

### 2. Negativo 2: Gerar Token com Senha Inválida (POST /Account/v1/GenerateToken)
- **URL:** `https://demoqa.com/Account/v1/GenerateToken`
- **Status Code:** `200`
- **Duração:** `1752ms`
- **Request Payload:**
```json
{
  "userName": "qa_neg_ZLmrzt_1792001067335",
  "password": "SenhaErrada@123"
}
```
- **Response Body:**
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
- **Duração:** `943ms`
- **Request Payload:**
```json
{
  "userName": "qa_neg_Qpa8e8_1792001073600",
  "password": "SenhaErrada@123"
}
```
- **Response Body:**
```json
{
  "code": "1207",
  "message": "User not found!"
}
```

### 4. Negativo 4: Consultar Usuário com Token Forjado (GET /Account/v1/User/3cbfb7f2-190b-4f23-af34-7b007ee4cbf4)
- **URL:** `https://demoqa.com/Account/v1/User/3cbfb7f2-190b-4f23-af34-7b007ee4cbf4`
- **Status Code:** `401`
- **Duração:** `1222ms`
- **Request Payload:** *(Sem payload no corpo)*
- **Response Body:**
```json
{
  "code": "1200",
  "message": "User not authorized!"
}
```

### 5. Negativo 5: Alugar Livro Já Presente na Coleção (POST /BookStore/v1/Books)
- **URL:** `https://demoqa.com/BookStore/v1/Books`
- **Status Code:** `400`
- **Duração:** `305ms`
- **Request Payload:**
```json
{
  "userId": "a4c7e606-8c88-4d0a-9866-54128fd45a72",
  "collectionOfIsbns": [
    {
      "isbn": "9781449325862"
    }
  ]
}
```
- **Response Body:**
```json
{
  "code": "1210",
  "message": "ISBN already present in the User's Collection!"
}
```

### 6. Negativo 6: Criar Usuário sem Senha (POST /Account/v1/User)
- **URL:** `https://demoqa.com/Account/v1/User`
- **Status Code:** `400`
- **Duração:** `210ms`
- **Request Payload:**
```json
{
  "userName": "qa_nospass_1792001087646"
}
```
- **Response Body:**
```json
{
  "code": "1200",
  "message": "UserName and Password required."
}
```

