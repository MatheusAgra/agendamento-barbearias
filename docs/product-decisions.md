Sistema de agendamento para barbearias
Documento de decisões de produto
Estado: decisões registradas em 11/11/2026. As propostas e questões abertas abaixo não são decisões aprovadas.
Produto e público
- Uma plataforma para várias barbearias, cada uma com seus próprios dados, página pública e painel.
- O responsável paga uma assinatura mensal e, depois da confirmação do pagamento, pode cadastrar sua própria barbearia.
- Clientes acessam uma página pública para conhecer a barbearia e agendar atendimentos.
- Donos ou gerentes da barbearia entram por login no painel de administração do próprio estabelecimento.
- Donos ou gerentes da plataforma possuem um painel para gerenciar barbearias e ajudar no atendimento.
- Cada barbearia pode configurar sua página de divulgação; haverá poucas opções de personalização visual. As opções específicas ainda não foram definidas.
Decisões técnicas
- Interface: React, Vite e TypeScript.
- Estilos: CSS puro organizado com CSS Modules e estilos globais.
- Componentes próprios e reutilizáveis, formando um sistema de padrões visuais.
- Servidor: Java com Spring Boot; Maven para dependências e construção.
- Banco de dados: PostgreSQL.
- Um único servidor organizado em módulos; interface organizada por funcionalidades.
- Nomes de arquivos e código em inglês; comentários em português.
Cuidados derivados das decisões
- O servidor deve conferir a confirmação do pagamento antes de permitir o cadastro da barbearia. Uma tela de sucesso não comprova pagamento.
- O servidor deve impedir acesso de uma barbearia aos dados privados de outra, inclusive no painel e nas consultas ao banco.
- Reservas concorrentes não podem resultar em horários sobrepostos para o mesmo profissional; a proteção precisa alcançar o banco de dados.
- Permissões do administrador da plataforma devem ser verificadas no servidor.
Decisões ainda abertas
- Provedor de pagamento, preço, planos, meios de pagamento e regras para atraso, cancelamento e reativação da assinatura.
- Se clientes precisam de conta; quais dados são necessários para reservar; confirmação, cancelamento e notificações.
- Contas individuais e permissões dos barbeiros; acesso de múltiplos gerentes.
- Campos e limites da página pública, identidade visual, hospedagem de imagens e endereço público de cada barbearia.
- Funcionalidades exatas da primeira versão, política de privacidade, suporte e regras de suspensão.
- Nome do produto, localização do repositório remoto e visibilidade pública ou privada.

Esclarecimento de escopo em 11/11/2026
- Pedido posterior do usuário: criar somente a base, arquitetura, preparação, configurações e instalar OpenSpec.
- Funcionalidades, páginas, fluxos integrados e implementação de regras não fazem parte desta entrega.
- O nome técnico barber-platform é provisório, não é o nome comercial do produto.

Repositório informado posteriormente pelo usuário em 11/11/2026
- Destino: https://github.com/MatheusAgra/agendamento-barbearias.git
- Repositório existente, inicialmente vazio; visibilidade pública conferida e preservada.
- O nome comercial do produto continua em aberto.

Planejamento do painel da plataforma em 11/11/2026
- Novo pedido do usuário: planejar a interface do painel dos donos e gerentes da plataforma para gerir barbearias, assinaturas e cobranças, preparando requisitos para o amigo responsável pelo servidor.
- Fluxo escolhido explicitamente nesta sessão: Tradicional, com documentos comuns; não criar artefatos OpenSpec para esta entrega.
- Direção visual aprovada: segunda imagem gerada nesta conversa, escura em grafite, textos claros e azul suave. Aprovação da imagem não define planos, preços, situações comerciais ou permissões ilustradas.
- Pedido posterior: documentar um sistema de design (regras visuais e de comportamento dos componentes) para manter a mesma estética entre páginas, sem copiar a composição inteira da referência.
- Referência em `references/platform-admin/overview-approved.png`, somente em `develop` e nas linhas de desenvolvimento; pasta ausente da árvore atual da `main`.
- O servidor será desenvolvido pelo amigo do usuário. Esta entrega contém planejamento, documentação e guarda da referência; nenhuma página ou regra de negócio foi implementada.
- Plano: `docs/platform-admin-plan.md`; sistema visual: `docs/design-system.md`; requisitos: `docs/platform-admin-requirements.md`; passagem ao servidor: `docs/platform-admin-integration.md`; separação da referência: `docs/reference-policy.md`.
- Preservar tecnologias existentes. Assinatura mensal e confirmação de pagamento antes de cadastrar a barbearia continuam sendo regras confirmadas. Plano anual, preços e cadastro administrativo excepcional não foram aprovados.
