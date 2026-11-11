---
name: investigacao-erros
description: Investigar falhas, comportamentos inesperados e verificações que falham, distinguindo evidências de hipóteses antes de corrigir. Usar para depuração de problemas concretos; não iniciar investigação preventiva sem motivo.
---

# Investigação de erros

Aplicar a comunicação clara. Começar pela diferença entre o resultado esperado e o observado e pelo impacto do problema.

- Consultar o código, mensagens de erro e contexto disponíveis. Perguntar por passos de reprodução ou condições ausentes apenas quando forem necessários para avançar.
- Organizar o que foi observado e as possíveis causas. Não apresentar hipótese como causa confirmada.
- Escolher a próxima verificação pelo quanto ela ajuda a distinguir causas, considerando custo e efeitos no ambiente. Preferir reprodução segura e verificações locais quando disponíveis.
- Investigar o caminho relevante até localizar uma causa sustentada por evidências. Evitar alterações simultâneas sem relação clara com a falha.
- Quando a correção estiver autorizada, aplicar uma solução proporcional ao problema e verificar o cenário que falhava. Acrescentar proteção contra repetição quando isso trouxer valor real.
- Se a correção exigir decisão relevante ainda não autorizada, apresentar opções e validar com o usuário. Não pedir novamente autorização já fornecida.
- Relatar a causa confirmada ou a incerteza restante, o que mudou e o resultado da verificação. Se não puder reproduzir ou verificar, informar a limitação e o próximo passo útil.
