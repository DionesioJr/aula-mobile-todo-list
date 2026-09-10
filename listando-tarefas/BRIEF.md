# Brief: Listagem de tarefas

## Por que essa aula existe
A aula 3 deixou Login e Cadastro conversando entre si, mas o login termina
num `Alert.alert('Bem-vindo!', ...)` e nada mais acontece: não existe um
"depois do login". Esta aula cria esse depois: uma tela de **lista de
tarefas**, e o dado que ela mostra.

O formato das aulas 2 e 3 deu certo e continua igual: escopo pequeno, e a
apresentação **para em pontos fixos** para a turma tentar sozinha antes de
ver a solução sendo digitada.

## O que é
Uma terceira tela, `ListaTarefasScreen`, que aparece depois de um login bem
sucedido e mostra uma lista de tarefas **mocada** (`TAREFAS_MOCK`, um array
fixo, sem API, sem banco). Ainda **somente leitura**: nada de criar, editar
ou excluir, isso é o assunto da próxima aula.

## Regra principal: nenhuma biblioteca externa
Igual às aulas anteriores, com o mesmo alvo: **nada de
`@react-navigation`**. A navegação continua manual, um `useState` no
`App.tsx` e um `if`, só ganha mais um valor possível (`'lista'`). O
componente novo de verdade é `FlatList`, que já vem de fábrica no React
Native, não é uma dependência.

## Ponto de partida
O projeto **não começa vazio**. `App.tsx`, `src/screens/LoginScreen.tsx` e
`src/screens/CadastroScreen.tsx` já estão na árvore, exatamente como
ficaram no fim da aula 3, o player carrega os três como estado inicial
(`inicial.files`).

## Os conceitos novos: dado mocado e FlatList
A progressão:

1. **Dado fora da UI**: `src/data/tarefas.ts` exporta um `type Tarefa` e um
   array `TAREFAS_MOCK`. Primeira vez que a turma usa `type` para descrever
   um dado, não uma `Props`.
2. **FlatList**: `data`, `keyExtractor`, `renderItem`. A turma já sabe
   renderizar JSX condicional (`if`) e agora aprende a renderizar JSX **por
   item de um array**.
3. **Mais uma prop de função**: `aoLogar`, repetindo o padrão de
   `aoCriarConta`/`aoVoltar`/`aoCadastrar` das aulas anteriores, sem
   conceito novo aqui, é fixação.
4. **Estilo condicional com ternário**: `item.concluida ? styles.status :
   styles.statusPendente`, primeira aparição do operador `?:` no curso.

## Progressão da aula
| Parte | Entrega | Formato |
|---|---|---|
| 1. De onde partimos | Recap do código da aula 3 | Slide |
| 2. Dados mocados | `src/data/tarefas.ts` (tipo + array) | **Desafio** |
| 3. Tela de listagem | `ListaTarefasScreen.tsx` com FlatList | **Desafio** |
| 4. Login leva a algum lugar | Prop `aoLogar`, terceiro `if` no `App` | **Desafio** |
| 5. Fechamento | Recap + 5 desafios pra casa | Slide |

**~35 etapas, 3 desafios ao vivo** (~19 min só de desafio). Cada desafio usa
só o que já apareceu até ali.

## Estilização: o mínimo possível
Mesmo padrão das aulas anteriores: `StyleSheet.create` simples, sem libs de
UI. A tela de listagem introduz `flexDirection: 'row'` para colocar título e
status lado a lado dentro do item, único conceito de estilo novo.

## Estrutura de arquivos
```
App.tsx                             estado da tela + conta + navegação
src/
  data/
    tarefas.ts                      tipo Tarefa + mock TAREFAS_MOCK
  screens/
    LoginScreen.tsx                 recebe props (conta, aoCriarConta, aoLogar)
    CadastroScreen.tsx              inalterado desde a aula 3
    tarefas/
      ListaTarefasScreen.tsx        recebe props (tarefas, aoSair)
```

## Linguagem / Bibliotecas
- **TypeScript**, mesmo nível da aula 3: `type Props`, agora também `type
  Tarefa` para descrever dado.
- Zero dependências além do que o Expo Snack cria por padrão. O
  `package.json` não ganha nada novo, `FlatList` é parte do `react-native`.

## Compatibilidade com Expo Snack
Igual às aulas anteriores: `App.tsx` como entry point, `src/` funciona
normalmente, sem `.env`, sem build nativo.

## Desafios pra casa
1. Extrair o `renderItem` da `FlatList` para um componente `TarefaItem.tsx`.
2. Contador de tarefas concluídas/pendentes no cabeçalho.
3. Lista vazia: usar `ListEmptyComponent` do `FlatList`.
4. Ordenar a lista (pendentes primeiro), sem mutar o array original.
5. (avançado, gancho pra próxima aula) pesquisar por que `TAREFAS_MOCK`
   sendo uma constante importada dificulta marcar uma tarefa como
   concluída.

---
**Escopo confirmado.** Este documento descreve o resultado final; o roteiro
de apresentação está em [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md).
