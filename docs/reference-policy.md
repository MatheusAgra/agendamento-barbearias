# Referências fora da main

Data: 11/11/2026. Regra solicitada pelo usuário: a pasta `references/` pode existir em `develop` e nas demais linhas de desenvolvimento; deve estar ausente da árvore de arquivos atual da `main`.

## Organização

- `references/platform-admin/overview-approved.png`: imagem aprovada.
- `references/platform-admin/README.md`: origem, contexto e valor de integridade da imagem.
- `docs/design-system.md`: regras da estética, úteis também na `main` e independentes da presença da imagem.

O nome da pasta segue a convenção de arquivos em inglês do projeto. A imagem é material de trabalho; não colocar em `frontend/public/`, não importar nos componentes e não incluir nos arquivos publicados.

Esta regra controla presença na árvore atual, não apaga o histórico compartilhado. Não oferece sigilo nem impede que alguém encontre a imagem no histórico ou na `develop`.

## Por que só ignorar arquivos não resolve

O `.gitignore` (lista de arquivos locais não acompanhados) não muda automaticamente por linha de trabalho e não remove arquivos já registrados. Juntar `develop` inteira à `main` leva também a pasta, a menos que ela seja retirada explicitamente da revisão que será integrada.

## Verificações preparadas

```powershell
npm.cmd run check:references
node scripts/check-reference-policy.mjs --branch main --ref main
```

O primeiro comando confere a linha atual; na `main`, considera arquivos acompanhados e locais, inclusive a presença da pasta. O segundo confere somente os arquivos registrados na revisão indicada, sem depender da pasta aberta. Para conferir uma proposta destinada à `main`, usar `--branch main --ref` com o identificador da revisão final proposta.

`.github/workflows/reference-policy.yml` prepara uma conferência para propostas e envios à `main` no GitHub. Ela recusa uma revisão que contenha `references/`, inclusive no resultado de uma integração. A execução manual também usa a política da `main`, mesmo quando disparada de outra linha.

Fonte da ação de obtenção dos arquivos: [documentação oficial de actions/checkout](https://github.com/actions/checkout). A verificação usa somente leitura do repositório e não precisa instalar dependências do projeto.

**Limite:** arquivo local não habilita proteção no GitHub. A conferência só executará depois de enviada ao repositório. Para impedir integração apesar de falha, é necessário torná-la obrigatória nas regras da `main` e restringir envios diretos. Essas configurações remotas não foram alteradas nesta entrega.

## Integração futura

1. Desenvolver nas linhas derivadas de `develop`, mantendo a referência disponível nelas.
2. Preparar uma revisão de entrega para `main` que inclua código e documentação necessários, com `references/` ausente de sua árvore final.
3. Conferir a revisão final com o comando acima e revisar os arquivos que serão integrados. Não remover a pasta da `develop` para preparar uma entrega.
4. Preservar a pasta ao retornar mudanças de `main` para `develop`; uma remoção feita para entrega pode propagar-se em integrações futuras e exige revisão.

A estratégia de integração da equipe ainda precisa ser combinada. Esta política não introduz comandos automáticos de exclusão, reescrita de histórico ou envio remoto.
