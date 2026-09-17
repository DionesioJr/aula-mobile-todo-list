# Brief: Navegando entre telas com React Navigation

## Por que essa aula existe
As três aulas anteriores navegaram na mão: um `useState('tela')` no
`App.tsx`, uma fila de `if` e um punhado de props de callback
(`aoLogar`, `aoVoltar`, `aoSair`) só pra pedir troca de tela. Isso cumpriu
o papel de ensinar estado e props, mas já cobra o preço: não existe
histórico, o botão voltar do Android não faz nada, não há gesto, nem
cabeçalho, nem animação, e o `App.tsx` cresce a cada tela nova.

Esta aula troca esse arranjo pela biblioteca que praticamente todo app
React Native usa, o **React Navigation**, e pelo método que resume o
assunto: **`navigation.navigate`**.

## Formato: teoria primeiro, código depois
Diferente das aulas anteriores, que começam a digitar cedo, esta abre com
**quatro slides de teoria seguidos** (Parte 2), antes de qualquer linha de
código: o que é uma pilha, quais são as três peças da biblioteca, o que a
prop `navigation` oferece e como params viajam junto com a navegação.
Só depois, na Parte 4, o código começa a mudar.

O resto do formato segue igual: escopo pequeno e a apresentação **para em
pontos fixos** para a turma tentar sozinha antes de ver a solução.

## Formato: o código existente é ajustado, não redigitado
As três telas vêm prontas das aulas anteriores, e a aula as **edita ponto a
ponto**: cada etapa troca um trecho específico (a linha antiga some, a nova
é digitada no lugar), como a turma faria no próprio editor. Nenhum arquivo
é esvaziado e reescrito do zero, só o `src/navigation/tipos.ts` é criado,
porque não existia. Isso exigiu uma operação nova no player compartilhado,
a `replace`, documentada em
[`shared/player/README.md`](../shared/player/README.md).

## Regra principal: a primeira biblioteca externa do curso
Até aqui a regra era "nenhuma dependência". Hoje ela cai, de propósito, e
isso é parte do conteúdo: como instalar (`npx expo install`, não
`npm install`), por que essas quatro dependências e o que cada uma faz.

## Ponto de partida
O projeto **não começa vazio**. `App.tsx`, `src/data/tarefas.ts`,
`src/screens/LoginScreen.tsx`, `src/screens/CadastroScreen.tsx` e
`src/screens/tarefas/ListaTarefasScreen.tsx` já estão na árvore,
exatamente como ficaram no fim da aula 3 (`listando-tarefas/`); o player
carrega os cinco como estado inicial (`inicial.files`).

## Os conceitos novos
1. **Pilha de navegação**: empilhar (`push`) e desempilhar (`pop`), e por
   que é dela que saem o botão de voltar, o gesto e a animação.
2. **As três peças**: `NavigationContainer`, `Stack.Navigator` (via
   `createNativeStackNavigator`) e `Stack.Screen` (`name` + `component`).
   A lista de `Screen` substitui a fila de `if`.
3. **A prop `navigation`**, que chega de graça em toda tela registrada:
   `navigate`, `goBack`, `push`, `replace`, `popToTop`, e quando usar cada
   um.
4. **Params de rota**: `navigate('Login', { ... })` e `route.params`. O
   cadastro devolve a conta criada pro login **pela navegação**, o que
   elimina o `useState` de `conta` no `App.tsx`.
5. **`options` do cabeçalho**: `title`, `headerShown`, `headerBackVisible`.
6. **Rotas tipadas**: `RootStackParamList` e `NativeStackScreenProps`, que
   fazem um nome de rota errado virar erro de TypeScript. Inclui a
   primeira aparição de union type (`{...} | undefined`).
7. **Instalar dependência num projeto Expo**: `npx expo install` escolhe a
   versão compatível com o SDK; `npm install` pega a mais nova e pode
   quebrar o app.

## Progressão da aula
| Parte | Entrega | Formato |
|---|---|---|
| 1. De onde partimos | Recap da navegação manual e seus limites | Slides |
| 2. Teoria: a pilha | Pilha, as três peças, `navigation`, params | **4 slides** |
| 3. Instalando | `npx expo install` das quatro dependências | Slide |
| 4. O mapa de rotas | `tipos.ts` novo + `App.tsx` ajustado | **Desafio** |
| 5. As telas navegam | As três telas trocam props por `navigation` | **2 desafios** |
| 6. Fechamento | Teste do fluxo + recap + 5 desafios pra casa | Slides |

**42 etapas, 3 desafios ao vivo** (~20 min só de desafio).

## O que a aula deliberadamente não faz
- **Não usa abas nem drawer.** Só stack; abas são assunto de outra aula.
- **Não resolve estado compartilhado.** Pelo contrário: quando a
  `ListaTarefasScreen` vira rota, ela deixa de receber `tarefas` por prop e
  passa a importar `TAREFAS_MOCK` direto. É uma **regressão proposital**, o
  gancho para a aula de Context.
- **Não usa `useNavigation`.** Fica como desafio de casa (número 5), por
  ser a resposta ao caso "componente fundo na árvore que precisa navegar".

## Estrutura de arquivos
```
App.tsx                                   só o mapa de rotas, sem estado e sem if
src/
  data/
    tarefas.ts                            inalterado desde a aula 3
  navigation/
    tipos.ts                              RootStackParamList (arquivo novo)
  screens/
    LoginScreen.tsx                       navigation + route.params
    CadastroScreen.tsx                    navigate('Login', { usuario, senha })
    tarefas/
      ListaTarefasScreen.tsx              navigation.popToTop(), mock importado
```

## Linguagem / Bibliotecas
- **TypeScript**, com a primeira união de tipos (`| undefined`) e tipos
  genéricos da biblioteca (`NativeStackScreenProps<Rotas, 'Login'>`).
- **Quatro dependências novas**: `@react-navigation/native`,
  `@react-navigation/native-stack`, `react-native-screens` e
  `react-native-safe-area-context`.

## Compatibilidade com Expo Snack
Mantida: `App.tsx` como entry point, `src/` funciona normalmente. No Snack
não é preciso instalar nada, basta importar que ele resolve as
dependências sozinho, o que é dito explicitamente no slide de instalação.

## Desafios pra casa
1. Uma quarta rota ("Sobre"), incluindo o registro no `RootStackParamList`.
2. Mandar o usuário logado como param pra rota `Lista`.
3. Trocar `navigate('Lista')` por `replace('Lista')` e explicar o que
   acontece com o botão "Sair".
4. Customizar o cabeçalho das três rotas de uma vez com `screenOptions`.
5. (avançado, gancho pra próxima aula) pesquisar `useNavigation`.

---
**Escopo confirmado.** Este documento descreve o resultado final; o roteiro
de apresentação está em [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md).
