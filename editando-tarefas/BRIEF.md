# Brief: CRUD de tarefas (sobre as rotas da aula 4)

## Por que essa aula existe
A aula 4 trocou a navegação manual pelo React Navigation e deixou uma ponta
solta de propósito: quando a `ListaTarefasScreen` virou rota, ela perdeu o
pai que passava props e voltou a importar `TAREFAS_MOCK` direto. A lista
funciona, mas é uma fotografia parada.

Esta aula fecha os dois assuntos de uma vez: completa o **CRUD** (criar,
editar, concluir e excluir uma tarefa, em memória, sem API e sem banco) e,
para conseguir isso, responde **como duas rotas irmãs compartilham o mesmo
dado**.

O formato das aulas anteriores continua: escopo pequeno, a apresentação
**para em pontos fixos** para a turma tentar sozinha antes de ver a
solução, e o código que já existe é **ajustado no lugar** (etapas
`replace`/`insert`), nunca apagado e redigitado.

## O que é
Uma tela nova, `FormularioTarefaScreen`, reaproveitada para criar e para
editar, registrada como uma quarta rota; mais três funções no `App.tsx`
(`salvarTarefa`, `alternarConcluida`, `excluirTarefa`) que atualizam a
lista de tarefas, agora um `useState`, sem nunca mutar o array original.

## Regra principal: nenhuma dependência nova
As quatro dependências do React Navigation vieram da aula 4 e aparecem
acesas na barra lateral desde a primeira etapa. Hoje não se instala nada, e
não entra nenhuma lib de gerenciamento de estado (Redux, Zustand etc.): a
lista inteira vive num único `useState`, no componente que a possui.

## Ponto de partida
O projeto **não começa vazio**. `App.tsx`, `src/navigation/tipos.ts`,
`src/data/tarefas.ts`, `src/screens/LoginScreen.tsx`,
`src/screens/CadastroScreen.tsx` e
`src/screens/tarefas/ListaTarefasScreen.tsx` já estão na árvore, exatamente
como ficaram no fim da aula 4 (`usando-react-navigation/`); o player
carrega os seis como estado inicial (`inicial.files`).

## Os conceitos novos
1. **Lista como estado**: `useState(TAREFAS_MOCK)` no `App.tsx`, no lugar
   da constante importada pela tela. Elevar o estado, agora com duas rotas
   no meio do caminho.
2. **Atualização imutável**: `.map()` (editar/alternar um item),
   `.filter()` (excluir), spread `{...tarefa}` e `[...tarefas]`. Zero
   `push`, zero atribuição direta a um índice.
3. **Params levando um objeto**: `navigate('Formulario', { tarefa })` e
   `route.params`. Na aula 4 os params levaram dois textos; agora levam uma
   `Tarefa` inteira, e a **ausência** de params é o que significa "criar".
4. **Props numa rota**: a forma de função do `<Stack.Screen>`
   (`{(props) => <Tela {...props} tarefas={tarefas} />}`), a saída para
   passar estado compartilhado a uma tela que o navigator instancia.
5. **`options` como função**: `options={({ route }) => ({ title: ... })}`,
   o cabeçalho decidindo o título a partir dos params.
6. **Interseção de tipos (`&`)**: `NativeStackScreenProps<...> & { ... }`,
   "o que vem da rota **e** o que vem do pai". O irmão do `|` da aula 4.
7. **`Alert.alert` com botões**: a confirmação de exclusão usa a forma com
   lista de `{ text, style, onPress }`.

## Progressão da aula
| Parte | Entrega | Formato |
|---|---|---|
| 1. De onde partimos | Recap do código da aula 4 | Slides |
| 2. Formulário de tarefa | Rota nova + `FormularioTarefaScreen.tsx` | **Desafio** |
| 3. Tarefas viram estado | `useState` + 3 funções no `App` | **Desafio** |
| 4. Rotas com props | `<Stack.Screen>` com função filha, `options` função | Demonstrado |
| 5. Lista aciona o CRUD | Botões e navegação na `ListaTarefasScreen` | **Desafio** |
| 6. Fechamento | Teste do fluxo + recap + 5 desafios pra casa | Slides |

**34 etapas, 3 desafios ao vivo** (~21 min só de desafio).

## A divisão que a aula martela
- **Navegar é da tela** (ela tem `navigation`): o formulário volta sozinho
  com `goBack()` depois de salvar.
- **Mudar o dado é do `App`** (ele tem `setTarefas`): as três funções do
  CRUD não navegam, só mexem na lista.

Separar as duas coisas é o que deixa `salvarTarefa` legível e a tela
reaproveitável.

## O que a aula deliberadamente não faz
- **Não usa Context.** A função filha do `<Stack.Screen>` resolve com o que
  a turma já sabe (props). Context é o desafio de casa número 5 e o gancho
  para a próxima aula.
- **Não persiste nada.** Fechar o app volta tudo ao mock; `AsyncStorage`
  fica para outra aula.

## Estrutura de arquivos
```
App.tsx                                   rotas + estado das tarefas + as 3 funções
src/
  data/
    tarefas.ts                            inalterado desde a aula 3
  navigation/
    tipos.ts                              ganha a rota Formulario, com params
  screens/
    LoginScreen.tsx                       inalterado desde a aula 4
    CadastroScreen.tsx                    inalterado desde a aula 4
    tarefas/
      ListaTarefasScreen.tsx              props da rota + props do App, 3 ações por item
      FormularioTarefaScreen.tsx          criar e editar, decidido por route.params
```

## Linguagem / Bibliotecas
- **TypeScript**, com interseção de tipos (`&`) pela primeira vez no curso.
- Nenhuma dependência além das quatro que a aula 4 instalou.

## Compatibilidade com Expo Snack
Mantida: `App.tsx` como entry point, `src/` funciona normalmente, sem
`.env` e sem build nativo. No Snack os imports já resolvem as dependências.

## Desafios pra casa
1. Campo de descrição opcional no formulário e no tipo `Tarefa`.
2. Confirmação ao cancelar o formulário com texto já digitado.
3. Contagem "X de Y concluídas" na tela da lista.
4. Ordenar a lista (pendentes primeiro) sem mutar o array original.
5. (avançado, gancho pra próxima aula) pesquisar `Context` para levar
   `tarefas` e as três funções às telas sem a função filha do
   `<Stack.Screen>`.

---
**Escopo confirmado.** Este documento descreve o resultado final; o roteiro
de apresentação está em [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md).
