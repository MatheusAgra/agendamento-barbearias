# Base da plataforma de barbearias

Somente estrutura, dependências, configurações e documentação. Nenhuma funcionalidade foi implementada. `barber-platform` é um identificador técnico provisório; o nome do produto continua aberto.

A interface ainda não monta uma aplicação React. O documento HTML (estrutura da página) está vazio intencionalmente. O servidor ainda não tem classe inicial, endereços de acesso, tabelas ou testes. Isso preserva o pedido de preparar a base sem desenvolver o produto.

## Requisitos

| Ferramenta | Versão preparada | Uso |
| --- | --- | --- |
| Node.js (execução das ferramentas da interface) | 24.13.1; mínimo 22.12 | Interface e OpenSpec |
| npm (instalação de dependências) | 11.8.0; mínimo 10 | Comandos na raiz |
| Java JDK (ferramentas para construir o servidor) | 21 | Construção do servidor |
| Maven (construção do servidor) | 3.9.12, pelo comando incluído | Instalação global dispensável |
| Docker Compose (execução local do banco isolado) | v2, com suporte a `--wait` | Banco opcional nesta etapa |
| PostgreSQL (banco de dados) | 18.6 | Imagem fixada no arquivo local |
| OpenSpec (planejamento de mudanças antes do código) | 1.17.0, instalado no projeto | Propostas e especificações |

React 19.3.1, Vite 8.3.8, TypeScript 6.0.3 e Spring Boot 4.1.2 estão configurados nos arquivos de dependências. As versões exatas da interface e suas dependências estão em `package-lock.json`.

## Instalar e verificar no Windows

Na pasta que contém este arquivo, usando PowerShell:

```powershell
npm.cmd ci
npm.cmd run check:frontend
npm.cmd run build:frontend
npm.cmd run spec -- --version
npm.cmd run spec:list
```

`check:frontend` confere tipos (uso consistente dos valores) e regras de código. Como ainda não existe aplicação, verifica apenas a configuração presente. `build:frontend` gera somente o documento vazio de preparação.

Para conferir a preparação do servidor, com `JAVA_HOME` apontando para uma instalação Java 21:

```powershell
Set-Location backend
.\mvnw.cmd verify
Set-Location ..
```

O comando resolve dependências e verifica a construção da base. Não testa funcionalidades: ainda não existem classes nem testes. O arquivo gerado não é um servidor executável. A geração de um servidor executável está desativada explicitamente no `pom.xml` até existir uma classe inicial.

Para conferir o documento vazio pelo navegador:

```powershell
npm.cmd run dev:frontend
```

Abra `http://127.0.0.1:5173`. Uma página vazia é o resultado esperado nesta etapa. O encaminhamento de `/api` (endereços futuros do servidor) está preparado para `http://127.0.0.1:8080`, mas não há servidor implementado. `BACKEND_URL` em `frontend/.env` altera esse destino local. Para visualizar a versão construída da interface, use o comando `npm.cmd run preview --workspace frontend`.

## Banco local, quando necessário

O banco não é necessário para verificar esta base. Para prepará-lo depois, com Docker Desktop iniciado:

```powershell
Copy-Item .env.example .env
```

Edite `.env` e preencha `POSTGRES_PASSWORD` com uma senha local própria. Não salve esse arquivo no histórico de alterações. Não existe senha padrão.

```powershell
npm.cmd run db:up
npm.cmd run db:status
npm.cmd run db:down
```

O banco escuta somente na própria máquina. Os dados permanecem no volume (armazenamento do serviço) após `db:down`. A conta criada pela imagem tem permissões administrativas e serve somente ao desenvolvimento local; uma implantação real precisará separar a conta da aplicação da conta de alterações do banco.

Alternativa: instalar PostgreSQL 18 diretamente na máquina e criar banco, usuário e senha próprios. O exemplo `backend/.env.example` mostra as variáveis correspondentes. Spring Boot não lê esse arquivo automaticamente: configure as variáveis no terminal ou na ferramenta de desenvolvimento. Não há servidor para iniciar nesta etapa.

## Outros sistemas

Em Linux e macOS, use `npm` no lugar de `npm.cmd`, `cp .env.example .env` para copiar o exemplo e `./mvnw verify` dentro de `backend/`. Caso o arquivo tenha perdido a permissão de execução ao copiar: `chmod +x mvnw`.

## Usar OpenSpec

Já inicializado para o Codex. A instalação pertence ao projeto; não é necessário substituir a versão global da máquina.

```powershell
npm.cmd run spec -- --help
npm.cmd run spec:list
npm.cmd run spec -- list --specs
```

Abra esta pasta como projeto no Codex e inicie uma nova conversa para carregar as instruções instaladas em `.agents/skills/`. Os nomes exatos das instruções disponíveis estão em `docs/openspec.md`.

Decisões de produto estão em `docs/product-decisions.md`; a configuração em `openspec/config.yaml` fornece esse contexto às próximas propostas. Ainda não há mudanças propostas nem especificações de funcionalidades. Não foi criado trabalho de implementação automaticamente.

## Organização e limites

- `frontend/`: ferramentas da interface e pastas por funcionalidade.
- `backend/`: dependências do servidor, configuração local e pastas por funcionalidade.
- `compose.yaml`: somente o banco local.
- `docs/architecture.md`: responsabilidades e proteções exigidas no futuro.
- `docs/product-decisions.md`: decisões aprovadas e perguntas em aberto.
- `docs/verification.md`: verificações executadas e limitações.
- `openspec/` e `.agents/skills/`: preparação para planejar próximas mudanças.

Não há acesso de usuários, pagamento, cadastro, agenda, dados demonstrativos, personalização visual ou proteção implementados. Nenhuma aplicação foi implantada.

Repositório fornecido pelo usuário: [MatheusAgra/agendamento-barbearias](https://github.com/MatheusAgra/agendamento-barbearias). A cópia local está vinculada a esse destino. Ele já existia, vazio e público; sua visibilidade foi preservada. As instruções em `docs/verification.md` registram a entrega da base.

Referências das configurações: [Vite](https://vite.dev/guide/), [Spring Boot](https://docs.spring.io/spring-boot/system-requirements.html), [modularização do Spring Boot 4](https://spring.io/blog/2025/10/28/modularizing-spring-boot/), [OpenSpec](https://openspec.dev/docs/setup) e [PostgreSQL](https://www.postgresql.org/docs/18/).
