# language: pt
@frontend @sortable @draganddrop @etapa2 @CA07
Funcionalidade: Reordenação de Itens por Arraste (Sortable)
  Como um usuário
  Quero reordenar os itens da lista através de drag and drop
  Para dispor os elementos em ordem crescente

  Cenário: Reordenar elementos da lista em ordem crescente através de drag and drop
    Dado que o usuário acessa o submenu "Sortable" na seção Interactions
    Quando reordena os elementos através do método de arrastar e soltar
    Então os itens devem estar dispostos na ordem sequencial exata de "One" a "Six"
