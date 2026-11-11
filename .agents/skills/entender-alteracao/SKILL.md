---
name: entender-alteracao
description: Explicar mudanças em código, commits e PRs mostrando antes, depois, motivo e verificação. Usar quando o usuário pedir para entender uma alteração ou preparar sua descrição; não executar mudanças apenas para explicá-las.
---

# Entender uma alteração

Consultar a alteração real e contexto suficiente antes de explicar. Aplicar a comunicação clara e explicar os termos técnicos entre parênteses.

- Começar pelo efeito prático: o que muda para quem usa ou mantém o sistema.
- Comparar o comportamento anterior com o atual. Usar um exemplo concreto quando houver diferença de comportamento; em reorganizações internas, explicar o benefício e como se preserva o comportamento.
- Dizer qual problema a mudança resolve. Se o motivo não estiver documentado, separar a inferência do fato e pedir esclarecimento apenas se isso mudar a avaliação.
- Agrupar mudanças por finalidade, sem narrar cada linha ou arquivo. Mostrar trechos pequenos apenas quando necessários para compreender.
- Informar como a mudança foi verificada, o que as evidências demonstram e quais limitações permanecem. Diferenciar verificações executadas de verificações propostas.
- Para descrições de PR (proposta de alteração no código), escrever para alguém que não leu a conversa. Seguir o modelo do projeto e destacar riscos, compatibilidade ou passos adicionais somente quando relevantes.
- Não publicar descrições ou alterar código sem autorização. Ao explicar riscos reais que exijam análise aprofundada, combinar com a revisão guiada de código.
