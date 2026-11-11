# Plano da interface de administração da plataforma

Data: 11/11/2026. Fluxo escolhido: Tradicional (documentos comuns antes da implementação).

Estado: planejamento inicial. Nenhuma página, autenticação ou comunicação com o servidor foi implementada nesta entrega.

## Objetivo e limites

Permitir que donos e gerentes da **plataforma** acompanhem barbearias, assinaturas e cobranças. O painel de cada barbearia e o agendamento público pertencem a outras áreas do produto.

A primeira entrega planejada é a **Visão geral** aprovada visualmente. Ela deve responder: “Como estão as assinaturas da plataforma e quais cobranças precisam de atenção?”. As telas completas de barbearias, assinaturas e cobranças serão entregas seguintes; os destinos e dependências estão mapeados abaixo.

As decisões confirmadas estão em [product-decisions.md](product-decisions.md). A linguagem visual compartilhada está em [design-system.md](design-system.md). Regras e dúvidas estão em [platform-admin-requirements.md](platform-admin-requirements.md); a passagem ao responsável pelo servidor está em [platform-admin-integration.md](platform-admin-integration.md).

## Direção visual aprovada

- Referência aprovada pelo usuário em 11/11/2026: `references/platform-admin/overview-approved.png`, disponível somente nas linhas de trabalho de desenvolvimento.
- Inspiração consultada: [Vael Fintech App, no Recent](https://recent.design/i/vwi94zh-vael-fintech-app).
- Fundo grafite, superfícies escuras discretas, textos claros e azul suave no gráfico e na ação principal.
- Menu lateral com rótulos, faixa superior discreta, indicadores em uma faixa aberta, gráfico à esquerda e cobranças prioritárias à direita; tabela de barbearias abaixo.
- Números financeiros em destaque, com algarismos de largura igual para alinhar valores. Ícones de traço simples e bordas discretas.
- Manter a direção aprovada; não sortear outra aparência nem importar padrões de páginas de divulgação.
- A imagem aprova a aparência. Ela não aprova preços, plano anual, privilégios, fórmulas financeiras ou estados de assinatura.
- “Plataforma”, o símbolo e “Seu negócio, em perspectiva.” são textos e elementos da proposta; o nome comercial continua pendente.

### Padrões compartilhados

Cores, letras, espaçamentos, componentes e seus estados têm uma única referência em [design-system.md](design-system.md). Não duplicar tabelas de valores aqui. A imagem não identifica uma fonte exata; a escolha final será conferida ao implementar a primeira página. O sistema mantém a mesma estética sem obrigar as páginas a repetirem a composição da Visão geral.

## Tecnologias e organização existentes

Preservar React (construção das telas), Vite (execução e preparação da interface), TypeScript (verificação de tipos de dados), CSS Modules (estilos limitados ao componente), estilos globais e componentes próprios. Não adicionar biblioteca visual pronta nem trocar tecnologias.

Estrutura proposta, a criar somente ao implementar:

```text
frontend/src/
  app/                         montagem da aplicação e navegação
  features/platform/
    overview/                  composição da Visão geral
    barbershops/                lista, detalhe e cadastro futuros
    subscriptions/             assinaturas futuras
    billing/                   cobranças futuras
  shared/
    components/                controles que forem realmente reutilizados
    styles/                    cores, letras, espaçamentos e estilos globais
    api/                       comunicação comum com o servidor
```

Começar os componentes de negócio na própria funcionalidade. Promover para a pasta compartilhada quando houver uso real em mais de um lugar. A seleção de ferramenta de navegação, gráficos ou formulários permanece aberta; avaliar primeiro as necessidades e dependências existentes.

## Blocos e comportamentos da Visão geral

| Bloco | Conteúdo e interação planejados | Dependência |
| --- | --- | --- |
| Menu | Visão geral, Barbearias, Assinaturas, Cobranças; grupo de gestão; conta atual | Destinos completos e permissões ainda precisam ser definidos |
| Faixa superior | Localização atual, busca, notificações e conta | Busca geral e notificações não são funcionalidades aprovadas; apresentar proposta antes de ativar |
| Cabeçalho | Título, contexto temporal e ação Nova barbearia | Fluxo de cadastro precisa respeitar pagamento confirmado |
| Indicadores | Receita recorrente mensal, barbearias ativas, assinaturas ativas, saldo em atraso | Fórmulas, referência de data e alcance definidos com o servidor |
| Gráfico | Evolução de uma medida financeira, alternância entre 6 e 12 meses, leitura de cada ponto | Definir se representa receita recorrente, faturamento ou recebimentos; não misturar medidas |
| Atenção às cobranças | Lista curta de cobranças vencidas, valor, atraso e acesso à lista completa | Ordem, permissões e regras de vencimento |
| Tabela | Nome/cidade, plano, situação, próxima cobrança e valor; busca, filtros e ações | Distinguir estado da barbearia, da assinatura e da cobrança |

O seletor mensal no cabeçalho e os controles de 6/12 meses não podem ter efeitos ambíguos. Proposta: o mês selecionado ancora o gráfico e os indicadores históricos; a lista de cobranças vencidas representa a posição atual, identificada com data e hora próprias. A decisão depende de existir histórico no servidor. Se não existir, apresentar os indicadores como posição atual e limitar o filtro ao gráfico, com rótulo claro. Confirmar antes de implementar.

A igualdade de 128 barbearias e 128 assinaturas na imagem é ilustrativa; não implementar essa igualdade como regra.

### Navegação e ações

- Proposta de endereço inicial: `/platform/overview`. Confirmar convenção com o responsável pelo servidor e com a futura navegação.
- Abrir barbearia, assinatura ou cobrança pelo identificador estável recebido do servidor.
- “Ver cobranças” deve preservar o filtro “em atraso” na tela de destino.
- Uma busca ou filtro da tabela afeta somente a tabela, não os indicadores nem o gráfico.
- Proposta: usar tabela paginada, como na imagem, somente quando houver a consulta completa e o total correspondente; se a primeira versão exibir apenas amostra, mostrar “Ver todas” sem paginação fictícia.
- Trocar filtros reinicia a página da lista e ignora respostas antigas que cheguem depois de uma consulta mais recente.
- A navegação deve funcionar ao atualizar o navegador, voltar e avançar; mecanismo ainda a definir.
- Não criar botões sem efeito. Recursos ainda fora da entrega devem ser omitidos ou mostrar claramente sua indisponibilidade, sem simular sucesso.

### Nova barbearia

O botão da imagem não autoriza cadastro administrativo livre. A regra aprovada exige assinatura mensal e pagamento confirmado pelo servidor antes do cadastro. Proposta de fluxo: identificar o responsável e a assinatura elegível, solicitar confirmação de elegibilidade ao servidor e só então abrir o formulário permitido. Cadastro manual excepcional só poderá existir após aprovação específica. Campos e forma de associar o responsável estão pendentes.

## Estados que a interface deve cobrir

| Situação | Comportamento planejado |
| --- | --- |
| Primeira carga | Preservar títulos e geometria; mostrar espaços temporários no lugar dos valores |
| Atualização | Manter o último conjunto coerente de dados com indicação de atualização e horário; não misturar períodos |
| Sem barbearias | Explicar a ausência e oferecer somente ação permitida |
| Nenhum resultado | Mostrar os filtros aplicados e permitir limpá-los |
| Nenhuma cobrança vencida | Texto neutro “Nenhuma cobrança em atraso”; quantidade e valor iguais a zero |
| Histórico curto | Mostrar somente os pontos existentes; distinguir mês sem dados de receita zero |
| Valor ausente | Mostrar traço e indicação adequada; não converter falha em zero |
| Falha parcial | Manter os blocos disponíveis, identificar o que falhou e oferecer nova tentativa |
| Acesso expirado | Orientar nova entrada, sem mostrar dados privados da sessão anterior |
| Sem permissão | Explicar indisponibilidade; a restrição real precisa ser aplicada no servidor |
| Alteração recusada | Mostrar motivo e preservar dados de formulário quando for apropriado |

## Computador, tablet e celular

- Em 1440–1600 px: manter a composição aprovada, com os títulos de todos os blocos e as primeiras linhas visíveis em altura próxima de 900 px.
- Em 768–1100 px: recolher o menu, reorganizar indicadores em duas colunas e empilhar gráfico e cobranças se faltar largura útil.
- Em 390 px: menu em painel próprio, título e ação acessíveis, indicadores em duas colunas, gráfico sem sobreposição de rótulos, cobranças em posição de fácil acesso.
- A tabela vira uma lista com todos os campos disponíveis ou permite rolagem somente dentro da própria área; a página inteira não deve rolar para os lados.
- Nomes longos, quantias maiores, cidade ausente e rótulos extensos precisam caber sem sobrepor valores e ações.
- Usar somente teclado, manter foco visível e devolver o foco ao controle de origem quando um menu ou janela fechar. Elementos de toque com área aproximada de 44 px.
- O gráfico terá alternativa textual com meses e valores; estado e erro não dependerão apenas de cor. Respeitar a preferência por menos movimento.

## Sequência de construção proposta

1. **Fechar regras indispensáveis:** perfis e alcance dos gerentes, forma de entrada, medidas financeiras e condição de cadastro. Resultado: decisões em `product-decisions.md`, com dúvidas restantes identificadas.
2. **Montar a estrutura visual:** cores e letras compartilhadas, menu, faixa superior, cabeçalho e adaptação de largura. Resultado: comparação com a referência aprovada em computador e celular.
3. **Montar os blocos:** indicadores, gráfico, cobranças e tabela a partir de um único conjunto de demonstração coerente, se seu uso local for autorizado. Resultado: números repetidos concordam e estados vazios/falhos são demonstráveis.
4. **Concluir interações da página:** filtros, busca da tabela, seleção de período, menus e navegação real para destinos incluídos na entrega. Resultado: nenhuma ação aparenta sucesso sem execução.
5. **Conectar ao servidor:** substituir a origem demonstrativa por consultas reais, sem reescrever os blocos visuais. Resultado: estados e mensagens reais, com permissões conferidas pelo servidor.
6. **Conferir a entrega:** aparência, uso por teclado, celular e os cenários de negócio desta página. Resultado: evidências e limitações em `verification.md`.

As etapas acima são plano; esta sessão não autoriza marcar nenhuma como implementada. O servidor será desenvolvido pelo amigo do usuário; não criar classes, tabelas, autenticação ou integração de pagamento como parte deste planejamento.

## Critérios de conclusão da primeira página

- [ ] Aparência comparada com a imagem aprovada, sem mudanças de direção não combinadas.
- [ ] Todos os blocos representam o período e o alcance descritos nos requisitos.
- [ ] Valores de receita e atraso têm definição aprovada e conferem com os dados recebidos.
- [ ] Busca, filtros, alternância do gráfico e navegação têm comportamento verificável.
- [ ] Situações de carregamento, ausência, zero, falha parcial e falta de permissão foram conferidas.
- [ ] Cadastro não contorna a confirmação de pagamento no servidor.
- [ ] Página conferida em 1440, 768 e 390 px, com teclado e valores longos.
- [ ] Não há dados demonstrativos nem confirmação fictícia de pagamento na versão real.
- [ ] Conferências de código e geração final da interface passaram; resultados registrados sem confundir construção com testes de negócio.
