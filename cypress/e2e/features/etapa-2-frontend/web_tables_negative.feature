# language: pt
Funcionalidade: Cenários Negativos - Tabela Web (Web Tables)
  Como um testador de qualidade
  Quero validar cenários negativos da tabela de registros
  Para garantir que validações e buscas funcionam corretamente

  @frontend @webtables @etapa2 @negativo @formulario_vazio
  Cenário: Submeter formulário de registro sem preencher campos
    Dado que o usuário navega até o submenu "Web Tables" na seção Elements
    Quando tenta adicionar um registro sem preencher nenhum campo
    Então o formulário de registro deve permanecer aberto com indicação de erro

  @frontend @webtables @etapa2 @negativo @busca_inexistente
  Cenário: Buscar por um registro inexistente na tabela
    Dado que o usuário navega até o submenu "Web Tables" na seção Elements
    Quando realiza uma busca por um valor inexistente "registro_que_nao_existe_xyz"
    Então a tabela deve exibir a mensagem indicando que não há registros encontrados

  @frontend @webtables @etapa2 @negativo @email_invalido_tabela
  Cenário: Tentar cadastrar registro com email em formato inválido
    Dado que o usuário navega até o submenu "Web Tables" na seção Elements
    Quando tenta adicionar um registro com email inválido "email-sem-arroba"
    Então o formulário de registro deve permanecer aberto indicando email inválido
