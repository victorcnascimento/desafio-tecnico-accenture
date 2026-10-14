# language: pt
Funcionalidade: Cenários Negativos - API BookStore e Account
  Como um testador de qualidade
  Quero validar cenários negativos da API
  Para garantir que o sistema trata erros adequadamente

  @api @etapa1 @negativo @usuario_duplicado
  Cenário: Tentativa de criar um usuário com username já existente
    Dado que um usuário já foi criado com credenciais válidas
    Quando envio uma requisição para criar outro usuário com o mesmo username
    Então a API deve retornar o status 406 Not Acceptable
    E a mensagem de erro deve indicar que o usuário já existe

  @api @etapa1 @negativo @credenciais_invalidas
  Cenário: Tentativa de gerar token com senha inválida
    Dado que um usuário válido existe no sistema
    Quando solicito a geração de token com uma senha incorreta
    Então a API deve retornar o status 200 com status Failed
    E o token retornado deve ser nulo

  @api @etapa1 @negativo @autorizacao_invalida
  Cenário: Verificar autorização com credenciais inválidas
    Dado que um usuário válido existe no sistema
    Quando verifico a autorização com uma senha incorreta
    Então a API deve retornar false indicando não autorização

  @api @etapa1 @negativo @token_invalido
  Cenário: Acessar detalhes do usuário com token inválido
    Dado que um usuário válido existe no sistema
    Quando consulto os detalhes do usuário com um token forjado
    Então a API deve retornar o status 401 Unauthorized

  @api @etapa1 @negativo @livro_duplicado
  Cenário: Tentativa de alugar um livro já alugado pelo mesmo usuário
    Dado que um usuário possui livros alugados em sua conta
    Quando tento alugar novamente o mesmo livro já reservado
    Então a API deve retornar o status 400 Bad Request
    E a mensagem de erro deve indicar que o livro já está na coleção

  @api @etapa1 @negativo @usuario_sem_campo
  Cenário: Tentativa de criar usuário sem enviar senha
    Quando envio uma requisição para criar usuário sem o campo senha
    Então a API deve retornar o status 400 indicando campo obrigatório
