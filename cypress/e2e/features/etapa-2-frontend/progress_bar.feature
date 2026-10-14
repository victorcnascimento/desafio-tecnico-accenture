# language: pt
@frontend @progressbar @etapa2 @CA06
Funcionalidade: Controle da Barra de Progresso (Progress Bar)
  Como um usuário
  Quero iniciar, interromper e reiniciar a barra de progresso
  Para validar a conformidade dos limites percentuais

  Cenário: Interromper a barra em até 25% e resetar após a conclusão de 100%
    Dado que o usuário acessa o submenu "Progress Bar" na seção Widgets
    Quando clica no botão "Start" para iniciar o progresso
    E clica no botão "Stop" antes ou exatamente ao atingir 25%
    Então o percentual da barra de progresso deve ser menor ou igual a 25%
    Quando clica em "Start" novamente aguardando a barra atingir 100%
    E clica no botão "Reset"
    Então a barra de progresso deve ser zerada voltando a 0%
