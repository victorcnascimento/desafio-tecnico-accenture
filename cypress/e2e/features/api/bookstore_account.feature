# language: pt
Funcionalidade: Gestão de Contas e Reserva de Livros na BookStore API
  Como um cliente da BookStore
  Quero gerenciar meu usuário e reservar livros
  Para garantir o fluxo completo de locação via API com dados consistentes

  @api @bookstore
  Cenário: Realizar o fluxo completo de criação de usuário, autorização e aluguel de livros
    Dado que envio uma requisição para criar um novo usuário com credenciais válidas
    Quando solicito a geração de um token de acesso para o usuário criado
    E valido que o usuário está devidamente autorizado no sistema
    E realizo a consulta dos livros disponíveis no catálogo
    E alugo dois livros disponíveis para o usuário
    Então consulto os detalhes da conta do usuário
    E valido que os dois livros alugados constam na lista de livros do usuário
