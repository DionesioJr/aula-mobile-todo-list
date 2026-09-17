# Brief: CRUD de tarefas

## Por que essa aula existe
A aula 4 entregou uma tela de listagem que funciona, mas mostra um mock
imutável: `TAREFAS_MOCK`, uma constante importada, direto na prop da tela.
Dá pra ver a lista, não dá pra mudar nada nela. Esta aula fecha o assunto:
criar, editar, concluir e excluir uma tarefa de verdade (em memória, sem
API, sem banco, isso segue de fora do escopo).

O formato das aulas anteriores deu certo e continua igual: escopo pequeno,
a apresentação **para em pontos fixos** para a turma tentar sozinha antes
de ver a solução sendo digitada.

## O que é
Uma tela nova, `FormularioTarefaScreen`, reaproveitada tanto pra criar
quanto pra editar uma tarefa, mais três funções no `App.tsx`
(`salvarTarefa`, `alternarConcluida`, `excluirTarefa`) que atualizam a
lista de tarefas, agora um `useState`, sem nunca mutar o array original.

## Regra principal: nenhuma biblioteca externa
Igual às aulas anteriores. A navegação continua manual (`useState('tela')`
+ `if`), mais um valor possível (`'formulario'`). Nenhuma lib de
gerenciamento de estado (Redux, Zustand etc.), a lista inteira vive num
único `useState` no componente que a possui.

## Ponto de partida
O projeto **não começa vazio**. `App.tsx`, `src/data/tarefas.ts`,
`src/screens/LoginScreen.tsx`, `src/screens/CadastroScreen.tsx` e
`src/screens/tarefas/ListaTarefasScreen.tsx` já estão na árvore, exatamente
como ficaram no fim da aula 4, o player carrega os cinco como estado
inicial (`inicial.files`).

## Os conceitos novos: lista como estado e reaproveitar componente
A progressão:

1. **Um componente, dois modos**: `FormularioTarefaScreen` recebe
   `tarefaEditando: Tarefa | null`, primeira aparição de um **union type**
   no curso, e decide comportamento (título da tela, valor inicial do
   campo) a partir dele.
2. **Lista como estado**: `useState(TAREFAS_MOCK)` no lugar da constante
   direto na prop. Mesma ideia de "elevar o estado" da aula 3, agora com um
   array.
3. **Atualização imutável**: `.map()` (editar/alternar um item),
   `.filter()` (excluir), spread `{...tarefa}`/`[...tarefas]` (copiar e
   alterar sem mutar). Zero `push`, zero atribuição direta a um índice.
4. **`useState<T>` com tipo explícito**: `useState<Tarefa | null>(null)`,
   primeira vez que a turma passa um tipo genérico pro `useState`, porque
   `null` sozinho não dá pra inferir o tipo certo.
5. **`Alert.alert` com botões**: a confirmação de exclusão usa a forma com
   lista de `{ text, style, onPress }`, mais rica que o `Alert` de um botão
   só usado até aqui.

## Progressão da aula
| Parte | Entrega | Formato |
|---|---|---|
| 1. De onde partimos | Recap do código da aula 4 | Slide |
| 2. Formulário de tarefa | `FormularioTarefaScreen.tsx` | **Desafio** |
| 3. Tarefas viram estado | `useState` + 3 funções no `App` | **Desafio** |
| 4. Lista aciona o CRUD | Botões na `ListaTarefasScreen` | **Desafio** |
| 5. Conectando tudo | `if` do formulário, props na lista | Demonstrado |
| 6. Fechamento | Recap + 5 desafios pra casa | Slide |

**~30 etapas, 3 desafios ao vivo** (~21 min só de desafio). Cada desafio
usa só o que já apareceu até ali.

## Estilização: o mínimo possível
Mesmo padrão de sempre. A tela de listagem ganha `itemInfo: { flex: 1 }`
pra empurrar os botões de status/excluir pra direita, único conceito de
estilo novo.

## Estrutura de arquivos
```
App.tsx                                   estado da tela + conta + tarefas + navegação
src/
  data/
    tarefas.ts                            inalterado desde a aula 4
  screens/
    LoginScreen.tsx                       inalterado desde a aula 4
    CadastroScreen.tsx                    inalterado desde a aula 3
    tarefas/
      ListaTarefasScreen.tsx              6 props, 3 ações por item
      FormularioTarefaScreen.tsx          reaproveitada pra criar e editar
```

## Linguagem / Bibliotecas
- **TypeScript**, com union type (`Tarefa | null`) e `useState<T>`
  genérico, os dois pela primeira vez no curso.
- Zero dependências além do que o Expo Snack cria por padrão.

## Compatibilidade com Expo Snack
Igual às aulas anteriores: `App.tsx` como entry point, `src/` funciona
normalmente, sem `.env`, sem build nativo.

## Desafios pra casa
1. Campo de descrição opcional no formulário e no tipo `Tarefa`.
2. Confirmação ao cancelar o formulário com texto já digitado.
3. Contagem "X de Y concluídas" no cabeçalho da lista.
4. Ordenar a lista (pendentes primeiro) sem mutar o array original.
5. (avançado, gancho pra próxima aula) pesquisar `AsyncStorage` pra
   persistir as tarefas entre aberturas do app.

---
**Escopo confirmado.** Este documento descreve o resultado final; o roteiro
de apresentação está em [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md).
