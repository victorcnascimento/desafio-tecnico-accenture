# language: pt
Funcionalidade: Manipulação de Janelas do Navegador (Browser Windows)
  Como um usuário da plataforma
  Quero abrir uma nova janela do navegador
  Para visualizar a página de exemplo e validar sua mensagem

  @frontend @windows @etapa2 @cenario2
  Cenário: Validar mensagem em uma nova janela aberta
    Dado que o usuário acessa o submenu "Browser Windows" na seção Alerts, Frame & Windows
    Quando clica no botão "New Window"
    Então uma nova janela deve ser aberta
    E o texto "This is a sample page" deve estar visível no corpo da nova página
    E a nova janela é fechada retornando o foco à janela principal
