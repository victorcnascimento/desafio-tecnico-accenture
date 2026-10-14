# language: pt
Funcionalidade: Gerenciamento de Registros na Tabela Web (Web Tables)
  Como um administrador de registros
  Quero cadastrar, editar e remover colaboradores
  Para manter a tabela de dados atualizada

  @frontend @webtables @crud @etapa2 @cenario3
  Cenário: Criar, editar e excluir um registro na tabela web
    Dado que o usuário acessa o submenu "Web Tables" na seção Elements
    Quando adiciona um novo registro com dados dinâmicos válidos
    E localiza o registro recém-criado e altera seus dados cadastrais
    E exclui o registro recém-editado
    Então o registro não deve mais ser exibido na listagem da tabela

  @frontend @webtables @bonus @etapa2 @cenario3_bonus
  Cenário: [Bônus] Inserir 12 registros de forma dinâmica e removê-los em seguida
    Dado que o usuário acessa o submenu "Web Tables" na seção Elements
    Quando adiciona 12 registros dinâmicos consecutivamente na tabela
    Então todos os 12 novos registros devem constar na paginação da tabela
    Quando o usuário realiza a exclusão de todos os 12 registros adicionados
    Então apenas os registros padrão iniciais devem permanecer visíveis
