# language: pt
Funcionalidade: Cenários Negativos - Formulário de Estudante (Practice Form)
  Como um testador de qualidade
  Quero validar cenários negativos do formulário
  Para garantir que validações de campos funcionam corretamente

  @frontend @forms @etapa2 @negativo @campos_obrigatorios
  Cenário: Submeter formulário sem preencher campos obrigatórios
    Dado que o usuário navega até o submenu "Practice Form" na seção Forms
    Quando tenta submeter o formulário sem preencher nenhum campo
    Então os campos obrigatórios devem ser destacados com indicação visual de erro
    E o popup de confirmação não deve ser exibido

  @frontend @forms @etapa2 @negativo @email_invalido
  Cenário: Submeter formulário com email em formato inválido
    Dado que o usuário navega até o submenu "Practice Form" na seção Forms
    Quando preenche o campo de email com um valor inválido "email-invalido"
    E preenche os demais campos obrigatórios com dados válidos
    E tenta submeter o formulário
    Então o campo de email deve apresentar indicação visual de erro
    E o popup de confirmação não deve ser exibido

  @frontend @forms @etapa2 @negativo @mobile_incompleto
  Cenário: Submeter formulário sem informar o número de celular obrigatório
    Dado que o usuário navega até o submenu "Practice Form" na seção Forms
    Quando preenche os demais campos obrigatórios exceto celular com dados válidos
    E tenta submeter o formulário
    Então o campo de celular deve apresentar indicação visual de erro
    E o popup de confirmação não deve ser exibido
