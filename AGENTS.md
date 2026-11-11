# Instruções do projeto

- Responder em português claro. Explicar termos especializados entre parênteses.
- Fonte de verdade: `docs/product-decisions.md`. Propostas não são decisões aprovadas.
- Escopo atual: apenas base, arquitetura, dependências e configurações. Não implementar páginas, classes de aplicação, autenticação, reservas, pagamentos, tabelas ou dados sem novo pedido.
- Usar OpenSpec para propor mudanças. Validar decisões de produto e escolhas técnicas relevantes antes de implementar.
- Código e nomes de arquivos em inglês; comentários e textos exibidos em português.
- Interface: React, Vite, TypeScript, CSS Modules e estilos globais; componentes próprios. Organização por funcionalidade.
- Servidor: Java, Spring Boot e Maven; PostgreSQL; uma aplicação organizada por funcionalidade.
- Não escolher provedor de pagamento, preço, regras de assinatura, acesso de clientes ou permissões pendentes.
- Futuras consultas privadas devem verificar identidade, permissão e estabelecimento no servidor. Não confiar no identificador enviado pelo navegador.
- Testar isolamento sempre que implementar fluxo privado. Reservas exigem proteção no banco e teste de concorrência.
- Não liberar cadastro sem pagamento confirmado pelo servidor. Não criar acesso administrativo alternativo ou credenciais fixas.
- Não publicar nem criar repositório remoto sem autorização e definição de conta, nome e visibilidade.
- Escolhas auxiliares presentes são reversíveis; seus motivos estão em `docs/architecture.md`.
- Não tratar verificações de configuração como testes de funcionalidades. Manter `docs/verification.md` fiel ao executado.
