# OpenSpec no projeto

O OpenSpec organiza uma mudança em documentos antes da implementação. Está instalado como dependência de desenvolvimento na raiz e inicializado para o Codex. Não depende da versão global já presente na máquina.

```powershell
npm.cmd ci
npm.cmd run spec -- --version
npm.cmd run spec:list
npm.cmd run spec -- list --specs
```

`openspec/config.yaml` contém contexto e regras para próximas propostas. `openspec/specs/` guarda especificações consolidadas; `openspec/changes/` guarda mudanças em andamento. Ambas começam vazias, pois não foi autorizada a implementação de funcionalidades.

As instruções do Codex ficam em `.agents/skills/`. Abra esta pasta como projeto e inicie uma nova conversa para carregá-las. O inventário exato gerado pela instalação está registrado ao fim deste arquivo.

Ao iniciar uma próxima entrega, descreva a necessidade e peça uma proposta. Confira objetivo, limites, critérios verificáveis e decisões pendentes. A implementação só deve começar após a validação correspondente. Propor uma mudança não significa aprová-la.

Para conferir documentos quando existirem:

```powershell
npm.cmd run spec:validate
```

Sem especificações nem mudanças, esse comando pode informar que não há itens para validar e sair com código 1. Isso não equivale a uma especificação aprovada ou verificada.

Para atualizar futuramente as instruções depois de uma atualização deliberada da dependência:

```powershell
npm.cmd run spec -- update
```

Atenção a uma ocorrência desta instalação: o comando de inicialização tentou remover instruções antigas em `~/.codex/prompts/`. A remoção foi impedida pelo ambiente e os arquivos globais foram preservados. A preparação local concluiu com sucesso. Antes de repetir a inicialização ou atualizar as instruções, confira eventuais mensagens de migração para preservar configurações compartilhadas com outros projetos.

## Instruções instaladas para o Codex

- `$openspec-propose`: preparar uma proposta de mudança.
- `$openspec-explore`: explorar uma ideia antes de propor.
- `$openspec-update-change`: revisar documentos de uma mudança.
- `$openspec-apply-change`: implementar uma mudança autorizada.
- `$openspec-sync-specs`: incorporar especificações de uma mudança.
- `$openspec-archive-change`: arquivar uma mudança concluída.

No aplicativo do Codex, selecione a instrução na área de skills (instruções reutilizáveis). Os nomes acima correspondem às seis pastas geradas em `.agents/skills/`.

Consulte [a documentação de configuração](https://openspec.dev/docs/setup) e [a referência dos comandos](https://openspec.dev/docs/cli).
