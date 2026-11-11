# Organização preparada

Estado: somente preparação, sem aplicação implementada. A escolha dos diretórios é reversível e não resolve decisões de produto.

## Visão geral

Uma interface e um servidor, no mesmo repositório. O servidor será uma única aplicação dividida por funcionalidades. Não foram criados serviços separados nem comunicação entre serviços.

```text
frontend/
  src/
    app/                 composição e navegação futuras
    features/
      public/            divulgação e agendamento públicos
      auth/              acesso dos responsáveis
      barbershop/        gestão do próprio estabelecimento
      platform/          gestão e suporte da plataforma
    shared/
      components/        componentes visuais próprios e reutilizáveis
      styles/            padrões visuais e estilos globais
      api/               comunicação comum com o servidor

backend/
  src/main/java/com/barberplatform/
    identity/            identificação e permissões futuras
    barbershops/         estabelecimentos e seus responsáveis
    catalog/            serviços divulgados
    scheduling/         horários e reservas
    billing/            confirmação de pagamento e assinatura
    platform/           gestão e suporte da plataforma
    shared/             configuração comum estritamente necessária
  src/main/resources/
    application.yaml
    application-local.yaml
    db/migration/        alterações versionadas do banco, ainda vazio
  src/test/              reservado para futuros testes
```

Arquivos `.gitkeep` apenas preservam pastas vazias no histórico de alterações. Não constituem implementação.

## Fronteiras previstas

| Área | Responsabilidade futura | Dependência ainda necessária |
| --- | --- | --- |
| Identificação | Determinar pessoa, permissões e estabelecimentos autorizados | Definir contas e permissões; escolher a forma de acesso |
| Barbearias | Cadastrar e manter o estabelecimento | Pagamento confirmado pelo servidor |
| Catálogo | Disponibilizar os serviços públicos aprovados | Definir campos e regras de publicação |
| Agenda | Disponibilidade e reservas | Definir identificação do cliente, confirmação e cancelamento |
| Cobrança | Consultar e verificar o provedor escolhido | Definir provedor, planos e políticas |
| Plataforma | Administrar e prestar suporte | Definir permissões e limites do suporte |

Começar cada funcionalidade no seu próprio pacote (grupo de arquivos relacionados). Criar divisões internas conforme o código exigir; não preparar camadas vazias para todos os casos. Compartilhar somente o que for realmente comum. Uma área não deve consultar diretamente as tabelas pertencentes a outra sem uma responsabilidade explicitamente definida.

## Separação dos estabelecimentos

Ainda não há tabelas nem consultas. A futura implementação deve carregar o estabelecimento autorizado a partir da identidade verificada pelo servidor. O identificador enviado pelo navegador é uma entrada a conferir, nunca uma prova de autorização.

Todo dado privado pertencente a uma barbearia deverá guardar sua associação ao estabelecimento. Consultas, alterações e exclusões deverão filtrar também por essa associação. Relações entre dados do mesmo estabelecimento precisam de restrições no banco para impedir vínculos cruzados. Cada fluxo privado implementado deverá testar tentativas de uma barbearia acessar dados da outra, inclusive quando o identificador do recurso é conhecido.

O acesso da plataforma será separado do acesso dos estabelecimentos e verificado no servidor. Poderes de suporte, registro de ações e eventual acesso excepcional continuam pendentes; não existe acesso administrativo alternativo nesta base.

RLS (restrições de acesso aplicadas pelo próprio banco) poderá ser avaliada como reforço em uma proposta futura. Não está configurada e não substitui a conferência de identidade e permissão no servidor.

## Pagamentos

Não há implementação nem integração simulada. Planejar uma fronteira de verificação independente do provedor depois de escolhê-lo. O cadastro só poderá avançar com confirmação que o servidor verificou junto ao provedor. Uma página de sucesso, um parâmetro do navegador ou uma resposta fictícia não liberam o cadastro.

Antes de implementar, especificar como conferir autenticidade dos avisos do provedor, impedir processamento duplicado e vincular pagamento ao responsável correto. Preço, planos, atraso, cancelamento e reativação continuam abertos.

## Reservas concorrentes

Não há tabelas, criação de reservas ou testes de concorrência (tentativas simultâneas). A proposta futura deve impedir sobreposição no PostgreSQL para o mesmo profissional, além de conferir disponibilidade no servidor.

Uma opção a avaliar é uma restrição de exclusão (regra que rejeita intervalos sobrepostos), com `tstzrange` para intervalos de instantes e `btree_gist` para combinar profissional e intervalo. A definição depende de estados que ocupam a agenda, limites dos intervalos, fuso horário e identidade dos profissionais. Nenhuma dessas regras foi escolhida. Ao implementar, testar com conexões independentes ao banco; um teste só em memória não demonstra essa garantia.

Referência: [restrições para intervalos no PostgreSQL](https://www.postgresql.org/docs/18/rangetypes.html#RANGETYPES-CONSTRAINT).

## Escolhas auxiliares e reversíveis

| Preparação | Motivo e limite |
| --- | --- |
| Node.js 24 e Java 21 | Versões estáveis compatíveis com as ferramentas escolhidas; Java 21 precisa estar disponível no ambiente da equipe |
| Dependências da interface na raiz | Uma instalação e um arquivo de versões para a interface e o OpenSpec |
| Maven incluído por comandos próprios | Evitar exigir uma instalação global; versão 3.9.12 fixada |
| JDBC (acesso direto ao banco por Java) | Dependência inicial mínima, sem escolher uma biblioteca de mapeamento de tabelas; não existe consulta escrita |
| Flyway (controle das alterações do banco) | Preparar alterações versionadas sem criar tabelas prematuramente |
| Spring Security (ferramentas de proteção de acesso) | Dependência preparada; regras e identificação ainda precisam ser implementadas |
| Portas locais 5173, 8080 e 5432 | Convenções de desenvolvimento, ajustáveis; serviços configurados para a própria máquina |
| CSS Modules (estilos limitados ao componente) | Preparado pelo Vite; não há padrões de cor, fontes ou aparência escolhidos |
| Documento vazio na interface | Permitir verificar a construção sem implementar telas ou montar a aplicação |
| Servidor sem classe inicial | Respeitar o escopo de preparação; a geração executável fica desativada até a implementação |
| OpenSpec instalado no projeto | Versão reproduzível para a equipe, sem substituir a instalação global |

O pacote `com.barberplatform` e os identificadores dos arquivos de dependências são provisórios. Não definem marca, domínio ou endereço público.

## Próximos passos, mediante novo pedido

1. Escolher uma primeira entrega pequena no OpenSpec e confirmar seu resultado esperado.
2. Validar decisões de produto necessárias para essa entrega.
3. Implementar a inicialização mínima da aplicação e as regras de acesso exigidas antes de expor dados.
4. Criar alterações do banco e testes para o fluxo escolhido, usando PostgreSQL real nas garantias específicas do banco.
5. Implementar a interface correspondente e verificar o caminho completo.

Hospedagem, publicação, provedor de acesso, provedor de pagamentos e ferramentas adicionais não foram escolhidos.
