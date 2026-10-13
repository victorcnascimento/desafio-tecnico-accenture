# language: pt
Funcionalidade: Gestão de Contas e Reserva de Livros na BookStore API
  Como um cliente da BookStore
  Quero gerenciar meu usuário, autenticação e reserva de livros
  Para garantir a consistência das operações via API

  @api @etapa1 @passo1 @criar_usuario
  Cenário: 1. Criar um novo usuário no sistema
    Dado que envio uma requisição para criar um novo usuário com credenciais válidas
    Então a API deve retornar o status de criação 201 Created
    E os dados do usuário com id devem ser retornados com sucesso

  @api @etapa1 @passo2 @gerar_token
  Cenário: 2. Gerar um token de acesso para o usuário criado
    Dado que possuo um usuário cadastrado no sistema
    Quando solicito a geração de um token de acesso para o usuário criado
    Então a API deve retornar o status 200 OK
    E o token de acesso deve ser gerado com sucesso

  @api @etapa1 @passo3 @verificar_autorizacao
  Cenário: 3. Confirmar se o usuário criado está autorizado
    Dado que possuo um usuário cadastrado e com credenciais ativas
    Quando envio a requisição para verificar a autorização do usuário
    Então a API deve retornar o status 200 OK
    E deve confirmar que o usuário está devidamente autorizado

  @api @etapa1 @passo4 @listar_livros
  Cenário: 4. Listar os livros disponíveis no catálogo
    Dado que a BookStore possui um acervo de livros
    Quando realizo a consulta dos livros disponíveis no catálogo
    Então a API deve retornar o status 200 OK
    E a lista de livros disponíveis deve conter ao menos dois livros

  @api @etapa1 @passo5 @alugar_livros
  Cenário: 5. Alugar dois livros de livre escolha
    Dado que possuo um usuário autorizado com token de acesso
    E que selecionei dois livros disponíveis no catálogo
    Quando envio a requisição para alugar os dois livros selecionados
    Então a API deve retornar o status de criação 201 Created
    E deve confirmar a reserva dos dois livros alugados

  @api @etapa1 @passo6 @detalhes_usuario
  Cenário: 6. Listar os detalhes do usuário com os livros escolhidos
    Dado que o usuário possui livros alugados no sistema
    Quando consulto os detalhes da conta do usuário através do seu id
    Então a API deve retornar o status 200 OK
    E a lista de livros do usuário deve conter os dois livros alugados
