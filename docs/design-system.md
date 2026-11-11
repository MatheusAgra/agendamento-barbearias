# Sistema de design

Versão inicial: 11/11/2026. Base: direção visual do painel aprovada pelo usuário e pedido de manter a mesma estética nas demais páginas.

Este documento descreve o sistema de design (regras visuais e de comportamento dos componentes). **A referência orienta a família visual; cada página deve ter uma composição adequada ao seu trabalho.** Não reproduzir a tela inteira, seus textos ou sua ordem de blocos em todas as páginas.

Estado: especificação para implementação futura. Nenhum componente ou arquivo de estilo foi implementado nesta entrega. Os valores exatos abaixo são uma tradução proposta da imagem, a conferir nas telas construídas; a direção escura com azul suave está aprovada.

## 1. Identidade e alcance

Aplicar a mesma linguagem às páginas e componentes da interface: fundo grafite, contraste claro, azul suave usado com economia, letras legíveis, dados bem alinhados e superfícies discretas.

O painel da plataforma é a primeira aplicação. Páginas de acesso, administração de barbearias e páginas públicas podem ter estruturas próprias, preservando os elementos comuns. As opções de personalização pública de cada barbearia ainda precisam ser definidas; este documento não resolve essa regra nem autoriza mudar a aparência configurada por um estabelecimento.

O nome “Plataforma” e o símbolo da imagem são provisórios. Manter espaço e proporção adequados para a identidade futura, sem tratar esse símbolo como marca final.

### O que permanece e o que varia

| Manter entre páginas | Adaptar à tarefa |
| --- | --- |
| Cores e papéis de cada cor | Quantidade, posição e tamanho dos blocos |
| Família de letras, pesos e escala | Título, densidade e hierarquia dos dados |
| Controles, bordas e cantos | Uso de tabela, formulário, lista ou gráfico |
| Espaçamentos recorrentes e alinhamentos | Uma ou duas colunas conforme o conteúdo |
| Estados de foco, erro, carregamento e indisponibilidade | Ação principal e textos de ajuda |
| Linguagem dos ícones e das situações | Informações disponíveis a cada perfil |

## 2. Princípios de composição

1. **O trabalho determina o desenho.** Uma página de cobranças precisa priorizar vencimentos e ações; configurações precisam priorizar campos; não adicionar indicadores e gráficos só porque existem na referência.
2. **Uma hierarquia clara.** Nome da página, informação principal e ação prioritária devem ser reconhecidos antes dos detalhes.
3. **Calma com densidade útil.** Agrupar por proximidade e alinhamento. Usar caixas quando ajudam a separar assuntos ou estados, sem envolver todo texto em um painel.
4. **Cor com significado.** Azul identifica a ação principal ou o dado em destaque; verde, âmbar e vermelho representam situações específicas, sempre acompanhadas de texto.
5. **Números honestos.** Zero, ausência, erro e carregamento são estados diferentes. Valores repetidos vêm da mesma origem; quantidades e totais não são decoração.
6. **Aparência consistente, páginas distintas.** Reutilizar componentes e decisões visuais; não duplicar a composição da Visão geral.

## 3. Cores por função

Valores iniciais para concentrar em variáveis compartilhadas. Não espalhar cores literais por componentes. Estes valores foram propostos a partir da direção da imagem, não extraídos como medidas exatas de seus pixels.

| Nome no código | Cor | Uso |
| --- | --- | --- |
| `--color-background` | `#101113` | Fundo principal |
| `--color-sidebar` | `#0D0E10` | Navegação e estrutura externa |
| `--color-surface` | `#17191D` | Painéis e regiões de conteúdo |
| `--color-surface-raised` | `#212429` | Menus, campos destacados e superfícies sobrepostas |
| `--color-surface-selected` | `#282C34` | Seleção de navegação ou linha |
| `--color-border` | `#2D3037` | Divisões estruturais discretas |
| `--color-control-border` | `#737883` | Limite de controle quando necessário para reconhecê-lo |
| `--color-text` | `#F3F0E8` | Texto e valores principais |
| `--color-text-secondary` | `#B7BAC4` | Descrição, navegação e rótulos secundários |
| `--color-text-muted` | `#A1A6B2` | Notas, exemplos de campo e metadados |
| `--color-accent` | `#A5B8FF` | Ação principal, série financeira em destaque |
| `--color-accent-hover` | `#B7C6FF` | Ação principal sob o ponteiro |
| `--color-on-accent` | `#101113` | Texto e ícone sobre azul claro |
| `--color-focus` | `#B7C6FF` | Contorno de foco por teclado |
| `--color-success` | `#8EE6A8` | Situação positiva confirmada |
| `--color-warning` | `#F5CF70` | Atenção ou atraso, conforme regra do produto |
| `--color-danger` | `#FF9BA8` | Erro ou ação destrutiva |

- Cada cor de situação pode ter um fundo escuro discreto; não transformar todos os itens em blocos coloridos.
- Bordas estruturais são suaves. Limites essenciais para reconhecer campos e controles precisam de contraste suficiente, não apenas da cor estrutural.
- Não usar texto branco sobre o azul claro da ação principal; usar `--color-on-accent`.
- Não comunicar uma situação apenas pela cor. Exemplo: ponto âmbar acompanhado de “Em atraso”.
- Tons claros, gradientes chamativos, transparências desfocadas e cores novas não fazem parte desta direção. Uma nova necessidade deve ser justificada e incorporada ao sistema, sem criar exceções espalhadas.

## 4. Letras e números

A fonte exata da imagem não é identificável. Escolher uma única família sem serifa (letras sem prolongamentos nas pontas), legível em português e com algarismos de largura igual. Proposta inicial: usar a fonte do sistema operacional, evitando depender de serviço externo; validar a escolha ao construir a primeira página.

| Papel | Tamanho inicial no computador | Peso e uso |
| --- | --- | --- |
| Título de página | 28–32 px | 600 ou 700; uma hierarquia principal por página |
| Indicador principal | 36–44 px | 600 ou 700; dinheiro ou resposta principal |
| Indicadores secundários | 28–36 px | 600; não competir com o principal |
| Título de seção | 18–20 px | 600 |
| Texto e campos | 14–16 px | 400; rótulos importantes em 500 |
| Texto secundário e tabela | 13–14 px | 400 ou 500 |
| Metadados e eixos | 12 px | 400; não reduzir para fazer caber |

No celular, títulos ficam próximos de 24 px e valores podem ser reduzidos para caber sem cortar. Valores de dinheiro muito longos podem quebrar entre o símbolo e a quantia, preservando a leitura; não ocultar dígitos.

- Altura de linha próxima de 1,4–1,5 em textos e de 1,1–1,2 em títulos e valores grandes.
- Usar `font-variant-numeric: tabular-nums` em valores comparados, tabelas e indicadores. Conferir se a fonte realmente mantém os dígitos alinhados.
- Valores e respectivos títulos numéricos alinhados à direita em tabelas. Nomes e descrições alinhados à esquerda.
- Apresentar moeda de forma consistente, com centavos quando houver valores de cobrança; encurtar números apenas em eixos ou espaços com regra explícita.
- Datas seguem a convenção de exibição combinada com a equipe. O formato trocado com o servidor não determina a aparência da data.
- Não repetir o título expressivo da referência em todas as páginas. Preferir nomes úteis como “Barbearias”, “Cobranças” e “Dados da assinatura”.

## 5. Espaçamentos, tamanho e estrutura

| Nome no código | Valor | Uso típico |
| --- | --- | --- |
| `--space-1` | 4 px | Ajustes pequenos |
| `--space-2` | 8 px | Ícone e texto, rótulo e campo |
| `--space-3` | 12 px | Elementos próximos |
| `--space-4` | 16 px | Controles e grupos compactos |
| `--space-5` | 24 px | Conteúdo interno de painéis e margens usuais |
| `--space-6` | 32 px | Separação de seções |
| `--space-7` | 40 px | Respiro entre grupos maiores |
| `--space-8` | 48 px | Separação excepcional entre áreas |

- Conteúdo começa e termina nos mesmos alinhamentos horizontais. A margem à direita não deve desaparecer quando existe menu lateral.
- Menu rotulado: cerca de 224 px; faixa superior: cerca de 56–64 px. São proporções iniciais, não obrigação para páginas públicas ou de entrada.
- Painéis relacionados usam a mesma distância. Painéis lado a lado só devem ter a mesma altura quando isso não cria grandes vazios.
- Cantos: 8 px em controles e menus; 12 px em painéis; círculos para pessoas; situações podem usar pequenos rótulos arredondados.
- Evitar sombra em painéis parados. Menus e janelas sobrepostas podem usar sombra curta e discreta para indicar profundidade.
- Não fixar altura de seção apenas para reproduzir a imagem. A altura acompanha o conteúdo e seus estados.

## 6. Componentes e suas variações

### Estrutura e navegação

- Menu com ícones simples e texto; item selecionado usa superfície um pouco mais clara e indicação azul discreta, como na referência.
- Manter um só indicador de seleção suficientemente claro; não acumular borda, fundo colorido, brilho e texto azul.
- Faixa superior deve conter funções reais, como localização atual e conta. Busca geral e notificações só aparecem como funções utilizáveis depois de aprovadas.
- A navegação muda de página, não simula várias páginas rolando para pontos de uma tela longa.

### Botões e ligações

| Tipo | Aparência | Uso |
| --- | --- | --- |
| Principal | Azul suave, texto escuro | Uma ação prioritária por região de trabalho |
| Secundário | Superfície escura, borda visível, texto claro | Filtrar, cancelar ou abrir alternativa |
| Discreto | Texto e eventualmente ícone | Ação auxiliar ou navegação |
| Destrutivo | Texto/contorno na cor de perigo | Excluir, encerrar ou outra consequência relevante |

- Altura inicial de 40 px no computador; área de toque de pelo menos 44 px no celular.
- Usar verbos específicos: “Salvar alterações”, “Ver cobranças”, “Adicionar barbearia”. Evitar “Continuar” quando o efeito não estiver claro.
- Botão indisponível mantém rótulo legível; informar a condição faltante quando isso ajudar a agir.
- Durante envio, manter largura e texto compreensíveis, impedir repetição acidental e indicar andamento. A proteção de efeito único também precisa existir no servidor.
- Uma ligação navega; um botão executa ação. Não usar elementos sem função de interação apenas porque são fáceis de estilizar.

### Campos e formulários

- Rótulo visível acima do campo, ajuda próxima quando necessária, exemplo dentro do campo sem substituir o rótulo.
- Fundo escuro uniforme, borda reconhecível, texto claro e foco azul visível.
- Campos de mesmo tipo têm altura e espaçamento iguais; formulário longo deve ser dividido por assuntos, sem uma caixa por campo.
- Erro aparece junto ao campo com texto específico e associação acessível; o topo pode resumir os erros em formulários extensos.
- Definir claramente campos obrigatórios. Não usar só cor ou um símbolo sem explicação.
- Dinheiro, telefone e datas podem ter apresentação assistida; a interface não deve corrigir silenciosamente um valor de negócio.
- Guardar alterações com modelo consistente por formulário: botão explícito ou gravação automática, sem misturar os dois sem indicação.

### Tabelas e listas

- Cabeçalhos discretos, sem faixa colorida; linhas separadas por divisões suaves, sem alternar fundos de modo chamativo.
- Duas linhas de identificação podem combinar nome e cidade. Nomes longos mantêm acesso ao conteúdo completo.
- Altura inicial: 48 px em linha simples e 64–72 px com duas linhas; priorizar leitura e clique.
- Situação usa uma palavra e, se útil, ponto de cor. Não exibir dois rótulos para a mesma informação.
- Ações secundárias podem ficar em menu de três pontos. A ação principal da tarefa deve permanecer fácil de encontrar.
- Busca e filtros ficam próximos da lista afetada. Mostrar o que está filtrado e permitir limpar.
- Listas completas podem ter paginação com total; resumos usam limite de itens e “Ver todas”. Não desenhar paginação sem dados e consulta que a sustentem.
- Seleção de várias linhas aparece somente quando existir ação conjunta aprovada.

### Indicadores e gráficos

- Indicadores são rótulo, valor e contexto breve; preferir uma faixa compartilhada a quatro caixas decoradas.
- O valor mais importante tem maior destaque. Percentual só aparece com cálculo e base temporal válidos.
- Gráfico de linha usa uma cor principal, traço fino e divisões horizontais discretas. Não suavizar a curva a ponto de sugerir valores inexistentes.
- Uma série não precisa de legenda quando o título já a identifica. Mostrar unidade, período e escala.
- Previsão, dado ausente e valor confirmado precisam de formas distintas; não unir intervalos sem informação como se fossem medidos.
- Leitura de ponto pelo ponteiro deve ter equivalente por teclado e por toque. Disponibilizar também meses e valores em texto acessível.

### Abas, situações e mensagens

- Abas de uma seção usam rótulos simples com sublinhado discreto na seleção; controles de duas opções podem usar uma superfície segmentada.
- Diferenciar situação de barbearia, assinatura e cobrança com rótulos claros; o mesmo tom não define regra de negócio compartilhada.
- Mensagem de sucesso confirma a ação efetivamente concluída. Não apresentar sucesso antes da resposta real.
- Aviso de falha explica o que não ocorreu e a próxima ação. Evitar detalhes internos do servidor no texto exibido.
- Notificações curtas não substituem erros de campo nem informações que o usuário precisa consultar depois.

### Janelas e painéis sobrepostos

- Usar para tarefa curta ou detalhe contextual; tarefas longas ou com várias etapas devem ter página própria.
- Fundo opaco na mesma família de superfícies; título, conteúdo e ações em posições previsíveis.
- Ao abrir, mover o foco para conteúdo adequado; manter a navegação por teclado dentro da janela; ao fechar, devolver o foco à origem.
- Fechar por tecla Escape quando não houver consequência pendente. Se existirem alterações não salvas, explicar a consequência antes de descartá-las.
- No celular, um painel lateral pode ocupar a largura inteira. Não reduzir formulário até ficar ilegível.

## 7. Estados visuais obrigatórios

| Estado | Representação |
| --- | --- |
| Normal | Contraste e rótulo claros |
| Sob o ponteiro | Mudança pequena de superfície ou borda, sem deslocar o conteúdo |
| Foco por teclado | Contorno de 2 px com afastamento de 2 px, em cor de foco; não cortar o contorno |
| Pressionado | Mudança breve de tom, sem encolhimento exagerado |
| Selecionado | Superfície/indicador persistente; diferente de foco e passagem do ponteiro |
| Indisponível | Texto legível, ação impedida e explicação quando necessária |
| Carregando | Títulos preservados e espaços temporários próximos do tamanho final; sem brilho animado obrigatório |
| Vazio | Mensagem específica e ação permitida; preservar o contexto do bloco |
| Zero real | Exibir zero com unidade; não usar mensagem de falha |
| Erro | Texto localizado e nova tentativa quando fizer sentido |
| Desatualizado | Última atualização e indicação de que o dado anterior foi mantido |

Animações servem como resposta à interação, em torno de 120–180 ms. Evitar entradas sucessivas de todos os blocos, contadores artificiais e movimentos que atrasem leitura. Respeitar `prefers-reduced-motion` (preferência do sistema por menos movimento).

## 8. Adaptação a diferentes larguras

- Computador: menu rotulado, margens consistentes e colunas escolhidas pela tarefa. Gráfico e fila de atenção podem compartilhar linha; um formulário não precisa ocupar a largura inteira.
- Tablet: recolher navegação quando faltar largura, reduzir colunas e manter campos principais visíveis.
- Celular: menu em painel próprio, margens de 16–20 px, controles de toque adequados e uma região de trabalho por vez.
- Não encolher a tela do computador como uma imagem. Reorganizar indicadores, cabeçalhos e ações mantendo a ordem de importância.
- Tabelas viram listas completas ou rolam dentro de sua própria área. A página não deve ter rolagem horizontal.
- Conferir pelo menos 1440, 768 e 390 px, textos longos, valores grandes e ampliação do navegador. Os limites exatos de reorganização dependem do conteúdo, não do nome do aparelho.

## 9. Acessibilidade e linguagem

- Contraste de pelo menos 4,5:1 para texto comum e 3:1 para texto grande e sinais visuais essenciais. Conferir cada par usado, não apenas as cores isoladas.
- Rótulos visíveis e nomes acessíveis em controles; ícones sem texto precisam de nome que explique a ação.
- Toda ação utilizável por teclado, com ordem lógica e foco visível. Informações importantes não podem aparecer somente ao passar o ponteiro.
- Estrutura com um título principal por página e títulos de seção na ordem correta.
- Avisos de carregamento, sucesso e erro devem ser reconhecíveis por leitores de tela sem interromper desnecessariamente o trabalho.
- Usar português claro, frases curtas e rótulos consistentes. No texto do produto, preferir “Receita mensal”, “Em atraso” e “Próxima cobrança” a siglas sem explicação.

## 10. Aplicação nas próximas páginas

| Página | Como manter a estética com composição própria |
| --- | --- |
| Visão geral | Indicadores abertos, gráfico e pendências; seguir hierarquia da referência aprovada |
| Barbearias | Busca/filtros e tabela como conteúdo dominante; resumo apenas se ajudar uma decisão real |
| Detalhe da barbearia | Identidade e situação no topo; informações organizadas por assunto e histórico pertinente |
| Assinaturas | Lista focada em plano, situação e ciclo; alterações somente com regra e permissão aprovadas |
| Cobranças | Priorizar saldo, vencimento e ações disponíveis; evitar repetir um gráfico que não ajude a resolver pendências |
| Equipe e acessos | Pessoas, papéis e alcance claramente separados; sem indicadores financeiros decorativos |
| Configurações | Seções de formulário legíveis e modelo de gravação consistente |
| Entrada | Estrutura reduzida, formulário direto e mesmos campos, botões, cores e mensagens; sem expor dados administrativos |

Esses exemplos orientam a linguagem visual. Não ampliam o escopo funcional nem aprovam as regras das páginas citadas.

## 11. Organização da implementação

- Colocar variáveis de cor, letras, medidas, espaçamento e movimento em `frontend/src/shared/styles/`.
- Usar CSS Modules (estilos limitados ao componente) nos componentes e estilos globais apenas para base e regras comuns.
- Componentes de uso geral ficam em `frontend/src/shared/components/` quando houver reutilização real; componentes de negócio ficam na funcionalidade correspondente.
- Definir variações de tamanho e intenção no próprio componente; evitar copiar um botão e ajustar cores em cada página.
- Não adicionar biblioteca visual pronta nem mudar tecnologias já aprovadas.
- Documentar variações e estados na primeira implementação, mesmo que inicialmente por uma página local de demonstração. Essa página só deve existir em desenvolvimento e precisa de escopo aprovado.
- A imagem de referência não será importada pela aplicação nem copiada para arquivos publicados. A documentação visual permanece independente da versão real.

## 12. Conferência de cada nova página

- [ ] Responde a uma tarefa própria, preservando a estética sem copiar a composição inteira da referência.
- [ ] Usa cores por função, escala de letras e espaçamentos compartilhados.
- [ ] Reutiliza os controles existentes; novas variações têm motivo e foram registradas.
- [ ] Números e colunas se alinham; zero, ausência e falha são distinguíveis.
- [ ] Todas as ações têm efeito real e estado de resposta; permissões não são presumidas.
- [ ] Estados normal, foco, seleção, indisponibilidade, carga, vazio e erro foram conferidos.
- [ ] Contraste, teclado, nomes acessíveis e adaptação de largura foram verificados.
- [ ] Comparação visual em computador e celular foi registrada sem tratar a imagem como prova funcional.
- [ ] Desvios necessários foram incorporados ao sistema, preservando a decisão visual aprovada.

## Evolução deste documento

Registrar novas decisões com data, motivo e páginas afetadas. Mudanças da direção visual ou introdução de tema claro exigem validação do usuário. Ajustes de medida para melhorar legibilidade ou adaptação podem ser propostos na revisão da página, com comparação antes/depois. Regras de negócio continuam em `product-decisions.md` e nos requisitos, não neste documento.
