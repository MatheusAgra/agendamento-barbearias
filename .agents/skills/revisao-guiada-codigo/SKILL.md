---
name: revisao-guiada-codigo
description: Revisar código e propostas de alteração com problemas fundamentados, consequências práticas e correções sugeridas. Usar em pedidos de review, revisão ou avaliação de código; não iniciar uma revisão completa em toda edição simples.
---

# Revisão guiada de código

Ler a alteração e o contexto necessário para entender seu comportamento. Respeitar as convenções existentes. Aplicar a comunicação clara nas explicações.

- Procurar falhas reais de lógica, arquitetura e convenção que afetem funcionamento, manutenção ou integração. Não produzir comentários superficiais para preencher a revisão.
- Priorizar pelo impacto e pela probabilidade de ocorrer. Para cada problema, indicar o trecho ou localização precisa, o cenário que o provoca, a consequência e uma correção viável.
- Distinguir defeitos confirmados, riscos condicionais e preferências de estilo. Antes de afirmar uma falha, verificar chamadas, contratos e verificações existentes quando estiverem disponíveis.
- Dar exemplos pequenos de entrada e resultado quando ajudarem a demonstrar o problema. Explicar termos técnicos entre parênteses.
- Se houver decisão importante entre correções, apresentar os critérios e validar a escolha com o usuário. Pedir esclarecimento quando a intenção de negócio mudar a conclusão.
- Um pedido de revisão autoriza analisar e recomendar; aplicar correções somente quando solicitado ou já autorizado.
- Respeitar o formato exigido pela ferramenta de revisão. Relatar limitações da análise e não afirmar que verificações passaram sem executá-las.
- Se não encontrar problemas relevantes, dizer isso diretamente. Não declarar ausência absoluta de erros.
