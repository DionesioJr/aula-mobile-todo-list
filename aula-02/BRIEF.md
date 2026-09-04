# Brief — Aula 2: Tela de Login

## Por que essa aula existe
A aula 1 (todo list completo) virou 3 horas de aluno só copiando código, sem
pausa pra pensar — pouco aprendizado, cansaço grande. A aula 2 corrige o
formato, não só o conteúdo: escopo bem menor (uma tela só), e a apresentação
para em pontos fixos pra turma **tentar sozinha antes de ver a solução**.

## O que é
Só a tela de Login de um app React Native. Sem telas seguintes, sem
navegação — isso fica pra próxima aula, quando já existir um segundo lugar
pra ir. Sem SQLite, sem API: nem existe uma "conta" de verdade, só validação
de campos preenchidos.

## Regra principal: nenhuma biblioteca externa
Diferente da aula 1 (que usava `@react-navigation`, `datetimepicker`,
`react-native-paper`), esta aula usa **só o que o React e o React Native já
trazem de fábrica**: `useState`, `View`, `Text`, `TextInput`,
`TouchableOpacity`, `StyleSheet`, `Alert`. Nada para instalar, nada para
declarar no `package.json` além do que o Expo Snack já cria sozinho.

## Estilização: o mínimo possível
`StyleSheet.create` básico — cor de fundo, borda, padding. Nenhum design
elaborado, nenhuma discussão de CSS a fundo. O tempo da aula vai para
**estado**, não para aparência.

## Progressão de estado (o coração da aula)
O `LoginScreen.tsx` é construído em camadas, cada uma só possível com o que
veio antes:

1. **Sem estado nenhum** — tela puramente visual, campos "descontrolados".
   Mostra que o React Native funciona sem `useState`, mas o componente não
   sabe o que está escrito nos campos.
2. **Um `useState`** — o campo "usuário" vira componente controlado
   (`value` + `onChangeText`). Demonstrado ao vivo pelo professor.
3. **Outro `useState`** — o campo "senha" repete o mesmo padrão. Este é
   feito pelos alunos sozinhos (desafio), não demonstrado primeiro.
4. **Estado usado numa decisão** — a função `handleLogin` lê os dois
   estados num `if` comum e decide entre dois `Alert.alert`. Também feito
   pelos alunos sozinhos antes da revelação.

## Dinâmica da aula: desafios
Três pausas do tipo "tente sozinho, depois eu mostro":
1. Montar a estrutura visual (JSX) sem nenhum estado.
2. Repetir o padrão de estado controlado do campo usuário no campo senha.
3. Escrever a função `handleLogin` com a validação e os dois `Alert`.

Cada desafio pede só conceitos já demonstrados até aquele ponto — nunca algo
novo sem exemplo prévio.

## Estrutura de arquivos
```
App.tsx                     -> só renderiza <LoginScreen /> (sem navegação ainda)
src/
  screens/
    LoginScreen.tsx
```

## Linguagem / Bibliotecas
- **TypeScript** (consistente com a aula 1), mas sem nenhum tipo de
  navegação — não há `NativeStackScreenProps` nem `RootStackParamList` hoje.
- Zero dependências além do que o Expo Snack cria por padrão.

## Compatibilidade com Expo Snack
Igual à aula 1: `App.tsx` como entry point, `src/screens/` funciona
normalmente no editor de arquivos do Snack, sem `.env`, sem build nativo.

## Desafios pra casa (fora da aula ao vivo)
1. Mostrar/ocultar senha (mais um `useState` booleano).
2. Mensagem de erro na tela em vez de `Alert` (mais um estado).
3. Desabilitar o botão "Entrar" enquanto algum campo está vazio.
4. Contador de tentativas erradas.
5. (avançado, gancho pra próxima aula) pesquisar `AsyncStorage`.

---
**Escopo confirmado.** Este documento descreve o resultado final; o roteiro
de apresentação está em [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md).
