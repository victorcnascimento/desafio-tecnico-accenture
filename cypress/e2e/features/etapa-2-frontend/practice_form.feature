# language: pt
Funcionalidade: Prática de Formulário de Estudante (Practice Form)
  Como um estudante
  Quero preencher e submeter o formulário de matrícula com anexo
  Para registrar minhas informações acadêmicas com sucesso

  @frontend @forms @etapa2 @cenario1
  Cenário: Submeter o formulário de matrícula com dados aleatórios e upload de arquivo de texto
    Dado que o usuário acessa o submenu "Practice Form" na seção Forms
    Quando preenche todos os campos do formulário com dados dinâmicos válidos
    E realiza o upload de um arquivo ".txt" válido versionado no projeto
    E submete o formulário clicando no botão "Submit"
    Então o popup de confirmação com título "Thanks for submitting the form" deve ser exibido
    E os dados preenchidos devem corresponder aos valores exibidos na tabela de resumo
    E o usuário fecha o popup de confirmação
