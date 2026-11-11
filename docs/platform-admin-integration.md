# Passagem da interface para o servidor

Data: 11/11/2026. Estado: lista de necessidades e proposta de formato; não é uma API (acordo de comunicação entre interface e servidor) implementada ou aprovada.

O servidor será desenvolvido pelo amigo do usuário. Preservar Java, Spring Boot (estrutura da aplicação), Maven (preparação do servidor) e PostgreSQL (banco de dados) já escolhidos. As regras de produto estão em [platform-admin-requirements.md](platform-admin-requirements.md).

## Responsabilidades

| Interface | Servidor | Decisão conjunta |
| --- | --- | --- |
| Organização visual, navegação, apresentação e interação | Identificação, autorização e alcance de cada consulta | Endereços, parâmetros e mensagens |
| Apresentar números e datas no idioma escolhido | Calcular indicadores, saldos, atraso e posições históricas | Moeda, fuso, referência temporal e arredondamento |
| Capturar campos e mostrar validações | Validar novamente os campos e regras comerciais | Obrigatoriedade dos campos e nomes dos estados |
| Estados de carregamento, ausência e erro | Persistir alterações e confirmar pagamentos com o provedor | Atualização após alterações e comportamento em conflito |

Não será necessário entregar o servidor completo para começar a montar os blocos visuais. Para conectar a tela real, o acordo de dados, a identificação e as permissões precisam estar disponíveis. Uma demonstração local não comprova a proteção da aplicação.

## Consultas necessárias, com endereços ainda a definir

| Operação necessária | Entrada a combinar | Saída necessária |
| --- | --- | --- |
| Consultar pessoa atual | Sessão válida | Nome, perfil, alcance e ações permitidas |
| Consultar indicadores | Período/posição e alcance autorizado | Valores, unidades, comparação, data de apuração |
| Consultar evolução financeira | Medida aprovada, mês final e 6/12 meses | Meses em ordem, valores, ausência de dados identificada |
| Consultar cobranças vencidas | Ordenação aprovada, limite e filtros | Identificadores, barbearia, saldo, vencimento, situação e total |
| Consultar barbearias | Busca, situação aprovada, ordenação e página | Linhas, identificadores estáveis e total filtrado |
| Consultar detalhe | Identificador do recurso | Campos permitidos ao perfil atual |
| Conferir elegibilidade de cadastro | Responsável/assinatura vinculados | Confirmação conferida pelo servidor e motivo de recusa |
| Cadastrar barbearia | Campos aprovados e vínculo elegível | Recurso criado ou erros específicos; sem contornar pagamento |

A lista descreve necessidades, não exige um endereço por linha nem adiciona ferramentas. O responsável pelo servidor pode propor consultas agrupadas ou separadas, preservando coerência temporal e tratamento de falha parcial.

## Convenções propostas para fechar antes de implementar

- Identificadores opacos e estáveis: a interface não calcula nem interpreta seu conteúdo.
- Valores financeiros inteiros em centavos e moeda explícita; porcentagens com unidade e base de comparação definidas.
- Instantes em formato internacional com fuso explícito; datas civis separadas quando não representarem um instante.
- Cada consulta informa sua data de apuração e alcance; uma atualização não mistura blocos de posições incompatíveis.
- Resposta diferencia valor zero, ausência de informação e falha. Uma lista vazia não significa erro.
- Resposta de lista informa total após os mesmos filtros usados nas linhas; totais financeiros vêm de consulta completa, não da página visível.
- Erros possuem código estável para tratamento, mensagem adequada ao usuário e campos inválidos quando couber. Não devolver detalhes internos ou credenciais.
- Campos de ações permitidas ajudam a apresentação, mas não substituem a autorização da operação no servidor.
- Uma ação recusada por dados alterados deve permitir recarregar o recurso antes de repetir. Não repetir automaticamente operações de cobrança ou cadastro sem garantia de efeito único definida no servidor.

## Exemplo somente para discutir o indicador

O exemplo abaixo não fixa nomes de campos, endereços ou fórmula. A medida representada é **receita recorrente**, e não dinheiro recebido.

```json
{
  "asOf": "2026-11-11T15:00:00Z",
  "currency": "BRL",
  "timeZone": "America/Sao_Paulo",
  "metric": "monthlyRecurringRevenue",
  "amountMinor": 2547200,
  "comparison": null
}
```

`asOf` é o instante de apuração; `amountMinor` é o valor em centavos; `comparison` nulo significa comparação indisponível, não crescimento zero. `BRL` identifica o real. O fuso é exemplo, não decisão de alcance do produto. A presença de um número no exemplo não aprova seu cálculo.

## Falhas que a integração deve distinguir

| Situação | Efeito na interface |
| --- | --- |
| Pessoa não identificada ou sessão encerrada | Encaminhar para a entrada definida, limpando dados privados da sessão anterior |
| Pessoa identificada sem permissão | Mostrar acesso indisponível, sem tentar contornar por outra consulta |
| Recurso inexistente ou indisponível ao perfil | Mensagem definida com o servidor, sem revelar existência de dados alheios |
| Campo inválido | Explicar perto do campo e preservar entradas válidas |
| Dados alterados desde a leitura | Solicitar atualização antes de confirmar de novo |
| Limite temporário de consultas | Informar espera e respeitar prazo de nova tentativa |
| Falha temporária ou falta de conexão | Estado localizado e nova tentativa; preservar o último dado com indicação de desatualização |

## Lista para a primeira conexão real

- [ ] Método de entrada definido; nenhuma credencial fixa no código ou na documentação.
- [ ] Perfil administrativo e alcance dos gerentes conferidos no servidor.
- [ ] Endereços e formatos registrados aqui ou em documentação gerada pelo servidor, com ligação neste arquivo.
- [ ] Medida do gráfico e fórmulas dos indicadores aprovadas, incluindo base zero e ausência de histórico.
- [ ] Cobrança, assinatura e situação da barbearia mantidas separadas.
- [ ] Consulta paginada e totais com os mesmos filtros.
- [ ] Fluxo Nova barbearia exige elegibilidade por pagamento confirmado.
- [ ] Dados de demonstração ficam fora da versão real; configuração de desenvolvimento não cria rota alternativa de acesso.
- [ ] CEN-01 a CEN-10 dos requisitos conferidos conforme o escopo implementado.
- [ ] Resultados e limitações registrados em `verification.md`.
