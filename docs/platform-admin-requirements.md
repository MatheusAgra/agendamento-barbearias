# Requisitos e regras de negócio — administração da plataforma

Versão inicial: 11/11/2026. Documento de trabalho para o usuário e o responsável pelo servidor.

**Como ler:** “Confirmado” vem de pedido explícito do usuário ou de `product-decisions.md`; “Proposto” precisa de validação; “Pendente” é uma pergunta sem resposta. Aprovação visual não equivale à aprovação de regra de negócio. Nenhum comportamento descrito aqui está implementado.

## Objetivo e responsáveis

Donos e gerentes da plataforma gerenciam as barbearias atendidas, suas assinaturas e cobranças. São pessoas diferentes dos donos e gerentes de cada barbearia. A equipe da interface cuida da apresentação e interação; o responsável pelo servidor implementará identificação, autorização, persistência e regras financeiras aprovadas.

| Pessoa | Participação |
| --- | --- |
| Usuário | Decide produto, regras pendentes e direção visual |
| Responsável pela interface | Planeja e constrói as telas dentro do escopo aprovado |
| Amigo responsável pelo servidor | Completa o desenho de dados, consultas e aplicação das regras; sinaliza decisões de produto pendentes |

## Requisitos confirmados

| Código | Requisito | Origem | Forma futura de conferir |
| --- | --- | --- | --- |
| REQ-01 | Plataforma atende várias barbearias, com dados próprios | Decisões existentes | Tentativas de acesso cruzado são recusadas pelo servidor |
| REQ-02 | Donos e gerentes da plataforma possuem painel separado para gestão e suporte | Decisões existentes e conversa | Conta de barbearia não ganha acesso à administração da plataforma |
| REQ-03 | Painel contempla gestão de barbearias, assinaturas e cobranças | Pedido desta conversa | Áreas e consultas aprovadas disponíveis aos perfis autorizados |
| REQ-04 | Responsável paga assinatura mensal; cadastro da barbearia depende da confirmação do pagamento | Decisões existentes | Pedido sem confirmação verificada é recusado, mesmo alterando a interface |
| REQ-05 | Servidor confere identidade, permissão e estabelecimento em toda consulta privada | AGENTS.md e decisões existentes | Conferir acesso com perfis e estabelecimentos diferentes |
| REQ-06 | Manter tecnologias e organização já aprovadas | Decisões existentes | Revisão dos arquivos e dependências |
| REQ-07 | Usar a segunda imagem, escura com azul suave, como direção visual | Aprovação explícita nesta conversa | Comparação da página construída com a referência |
| REQ-08 | Referências ficam fora da `main` | Pedido desta conversa | Conferir árvore de arquivos da `main` e verificação de integração |
| REQ-09 | Planejamento segue Fluxo Tradicional | Escolha explícita nesta conversa | Documentos em `docs/`, sem criar mudança OpenSpec |

O pagamento prévio é requisito de cadastro. O efeito de atraso de uma assinatura já existente sobre o acesso ao produto ainda não foi decidido.

## Primeira entrega proposta: Visão geral

| Código | Capacidade proposta | Critério observável |
| --- | --- | --- |
| FUN-01 | Resumo financeiro e operacional | Indicadores têm nome, unidade, referência temporal e alcance coerentes |
| FUN-02 | Evolução financeira em 6/12 meses | Seleção altera a série correta; ausência de histórico não vira zero |
| FUN-03 | Cobranças que precisam de atenção | Exibe itens vencidos segundo regra aprovada e acesso à lista filtrada |
| FUN-04 | Lista de barbearias | Busca/filtros afetam somente a lista; quantidade corresponde à consulta |
| FUN-05 | Consultar detalhe de barbearia | Identificador existe e o servidor verifica a permissão sobre o recurso |
| FUN-06 | Iniciar cadastro permitido | Pagamento e vínculo do responsável são conferidos antes da criação |
| FUN-07 | Reconhecer falhas e ausência de dados | Usuário distingue valor zero, dado ausente, erro e carregamento |

Busca geral, notificações, troca de espaço de trabalho, central de ajuda, gestão completa da equipe, exportação e ações financeiras em lote aparecem como possibilidades, mas não estão aprovadas para a primeira entrega.

## Perfis e limites — pendentes

Não considerar que “gerente” significa acesso total. Preencher a matriz com o usuário antes de implementar a proteção.

| Ação | Dono da plataforma | Gerente da plataforma | Dono/gerente de barbearia |
| --- | --- | --- | --- |
| Entrar no painel da plataforma | Perfil confirmado; método pendente | Perfil confirmado; método pendente | Não é perfil deste painel |
| Ver todas as barbearias ou somente atribuídas | Pendente | Pendente | Somente alcance próprio fora deste painel |
| Ver valores financeiros e dados do responsável | Pendente | Pendente | Pendente no painel próprio |
| Cadastrar/alterar barbearia | Pendente; preservar REQ-04 | Pendente; preservar REQ-04 | Cadastro após pagamento, conforme regra existente |
| Alterar assinatura ou preço | Pendente | Pendente | Pendente |
| Cancelar, reativar ou suspender | Pendente | Pendente | Pendente |
| Reemitir cobrança, marcar pagamento ou estornar | Pendente | Pendente | Pendente |
| Convidar/remover gerentes | Pendente | Pendente | Outra área; pendente |

Nenhuma célula pendente concede permissão. Não criar acesso alternativo, conta administrativa fixa ou opção de fingir pagamento confirmado.

## Objetos e dados a definir com o servidor

Os campos abaixo são uma proposta de dados mínimos para as telas; não são um desenho aprovado das tabelas.

| Objeto | Dados necessários ou propostos | Questão em aberto |
| --- | --- | --- |
| Conta administrativa | Identificador, nome exibido, perfil e ações autorizadas | Método de entrada; alcance global ou por barbearias atribuídas |
| Barbearia | Identificador, nome, cidade/estado, responsável, situação cadastral | Uma barbearia por responsável? Unidades? Campos obrigatórios? |
| Plano | Identificador, nome e descrição comercial | Preços, limites e possibilidade de alteração |
| Assinatura | Identificador, responsável/barbearia vinculados, plano, situação e ciclo | Vínculo antes do cadastro; quantidade de barbearias permitidas |
| Cobrança | Identificador, assinatura, valor, moeda, vencimento, situação e confirmação | Provedor, meios de pagamento, valores parciais e reemissão |
| Histórico de gestão | Pessoa, ação, objeto, momento e resultado | Quais ações registrar, quem consulta e por quanto tempo |

Barbearia, assinatura e cobrança são objetos distintos. Uma cobrança vencida não transforma automaticamente o estado cadastral da barbearia nem define, por si só, suspensão do serviço.

### Estados candidatos, sujeitos a confirmação

- Barbearia: pendente, ativa, suspensa, encerrada.
- Assinatura: aguardando pagamento, ativa, com pendência financeira, cancelada; período de teste somente se aprovado.
- Cobrança: aberta, paga, vencida, cancelada; estorno e pagamento parcial somente se fizerem parte do escopo aprovado.

O servidor deverá especificar transições permitidas, efeitos e nomes finais. A interface exibirá o estado recebido, sem deduzi-lo de outro objeto. Não assumir que uma assinatura tem somente uma cobrança nem que uma barbearia tem somente um registro histórico de assinatura.

## Regras financeiras a fechar

| Código | Tema | Estado e pergunta |
| --- | --- | --- |
| FIN-01 | Mensalidade | Confirmado: assinatura mensal. Preço, planos e descontos pendentes |
| FIN-02 | Plano anual | Pendente; aparece na imagem como exemplo e não foi aprovado |
| FIN-03 | Receita recorrente mensal | Proposto: soma do valor recorrente mensal elegível. Definir situações incluídas, descontos e posição histórica |
| FIN-04 | Dinheiro recebido | Proposto: medida separada da recorrência. Definir data de confirmação, estornos, taxas e valores parciais |
| FIN-05 | Gráfico | Pendente: qual medida financeira representa; o título final precisa dizer isso claramente |
| FIN-06 | Atraso | Pendente: instante de vencimento, fuso, eventual tolerância e saldo em aberto |
| FIN-07 | Efeito do atraso | Pendente: avisos, bloqueio, suspensão, prazo e reativação |
| FIN-08 | Cancelamento | Pendente: imediato ou ao fim do período; acesso e cobranças restantes |
| FIN-09 | Mudança de plano | Pendente: vigência, diferença proporcional e próxima cobrança |
| FIN-10 | Indicadores ativos | Pendente: o que conta como barbearia/assinatura ativa e em qual data |
| FIN-11 | Comparação mensal | Proposto: comparar posições equivalentes; base zero/ausente não gera porcentagem inventada |
| FIN-12 | Administração manual | Pendente: quem pode reemitir, perdoar, confirmar ou estornar; não implementar por inferência |

Proposta para evitar erro de arredondamento: transportar dinheiro como valor inteiro em centavos acompanhado da moeda; deixar cálculo e arredondamento de negócio no servidor. Confirmar a convenção antes da integração. Valores de `R$ 199,00`, `R$ 99,00`, 128 contas e percentuais da imagem são fictícios.

## Proteções e qualidade propostas

- O servidor continua sendo a autoridade sobre acesso, estados, elegibilidade, totais e confirmação de pagamento; esconder um botão não protege uma operação.
- A tela deve apresentar a atualização dos dados e não misturar resultados de períodos ou alcances diferentes.
- Pagamento, avisos repetidos do provedor e ações repetidas não podem duplicar efeitos. A forma de garantir isso será definida pelo responsável pelo servidor.
- Valores, datas e situações precisam ser verificáveis, mesmo quando uma consulta retorna uma lista paginada. O total financeiro não pode ser somado somente das linhas da página atual.
- Usar somente dados de demonstração fictícios e restritos ao desenvolvimento, se aprovados para construir a interface.
- Diferenciar restrição de acesso, sessão encerrada, erro de validação, conflito de atualização e falha temporária.
- Idioma inicial proposto: português do Brasil; moeda inicial proposta: real; fuso e alcance geográfico ainda precisam de confirmação.

## Cenários para conferir na implementação futura

| Código | Cenário | Resultado esperado |
| --- | --- | --- |
| CEN-01 | Conta de barbearia tenta abrir consulta da plataforma | Servidor recusa; nenhum dado privado é entregue |
| CEN-02 | Gerente tenta consultar recurso fora do seu alcance aprovado | Servidor recusa, mesmo com identificador conhecido |
| CEN-03 | Cadastro sem pagamento confirmado; navegador informa “pago” | Servidor recusa o cadastro |
| CEN-04 | Cobrança é confirmada enquanto o painel está aberto | Próxima consulta apresenta posição consistente; aviso repetido não duplica efeito |
| CEN-05 | Plataforma nova, sem barbearias ou cobranças | Zeros reais e mensagens de ausência; sem crescimento ou gráfico inventados |
| CEN-06 | Consulta de cobranças falha e demais blocos carregam | Falha localizada; valores ausentes não viram saldo zero |
| CEN-07 | Usuário troca filtro rapidamente | A última escolha prevalece, mesmo que a resposta antiga chegue depois |
| CEN-08 | Existe apenas um ponto no histórico | Exibir o ponto e informar histórico curto, sem criar meses anteriores |
| CEN-09 | Base anterior igual a zero | Não mostrar crescimento percentual infinito ou fictício |
| CEN-10 | Ações financeiras ou acesso fora do definido | Operação indisponível até a regra ser aprovada e implementada |

## Preenchimento pelo responsável pelo servidor

- [ ] Confirmar o método de entrada e encerramento de sessão.
- [ ] Completar perfis, alcance dos gerentes e matriz de ações.
- [ ] Definir vínculo entre responsável, assinatura e barbearia antes/depois do pagamento.
- [ ] Completar campos obrigatórios, estados e transições de cada objeto.
- [ ] Fechar FIN-01 a FIN-12 com o usuário, sem transformar proposta técnica em regra comercial.
- [ ] Definir consultas, dados, mensagens e formato de troca em `platform-admin-integration.md`.
- [ ] Confirmar ordem e paginação das listas, datas e atualização das medidas.
- [ ] Descrever como pagamentos são verificados, repetidos com segurança e reconciliados.
- [ ] Especificar testes de acesso, isolamento e confirmação de pagamento.
- [ ] Registrar decisões aprovadas em `product-decisions.md`, com data e origem.

## Registro de decisões futuras

| Data | Código/tema | Decisão | Quem validou | Evidência ou forma de conferir |
| --- | --- | --- | --- | --- |
| A preencher | A preencher | A preencher | A preencher | A preencher |
