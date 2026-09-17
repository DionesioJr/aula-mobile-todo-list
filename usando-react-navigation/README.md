# Navegando entre telas

App React Native com Login, Cadastro e lista de tarefas, agora com
navegação de verdade: **React Navigation** com uma pilha nativa
(`@react-navigation/native-stack`), `navigation.navigate` no lugar das
props de callback e dados viajando pelos **params** da rota.

Continuação direta da aula 3 (`listando-tarefas/`), que entregou as três
telas trocando com `useState('tela')` e uma fila de `if` no `App.tsx`.

## Instalar

Com npm:
```bash
npm install
```

Com pnpm:
```bash
pnpm install
```

As quatro dependências novas foram escolhidas pelo Expo, com
`npx expo install @react-navigation/native @react-navigation/native-stack
react-native-screens react-native-safe-area-context`, que pega as versões
compatíveis com o SDK do projeto (o `npm install` pega sempre a mais nova,
que pode não bater com a versão do Expo).

## Executar

```bash
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) ou pressione `a` / `i`
no terminal para abrir em um emulador.

> Também pode ser testado direto no [Expo Snack](https://snack.expo.dev/),
> colando os arquivos do projeto. No Snack não é preciso instalar nada, os
> imports já resolvem as dependências.

## O que tem de novo

- `App.tsx` deixou de ter estado: virou só o mapa de rotas, com
  `NavigationContainer`, `createNativeStackNavigator` e três
  `Stack.Screen` (`Login`, `Cadastro`, `Lista`).
- `src/navigation/tipos.ts`, o `RootStackParamList`: quais rotas existem e
  o que cada uma recebe de params, o que faz um nome de rota errado virar
  erro de TypeScript.
- As três telas não recebem mais props do `App`, recebem `navigation` (e
  `route`) do próprio navigator, tipadas com `NativeStackScreenProps`:
  - `LoginScreen`: lê a conta de `route.params` e chama
    `navigation.navigate('Lista')` / `navigation.navigate('Cadastro')`.
  - `CadastroScreen`: devolve a conta criada com
    `navigation.navigate('Login', { usuario, senha })`, e o link de voltar
    usa `navigation.goBack()`.
  - `ListaTarefasScreen`: "Sair" chama `navigation.popToTop()`.
- Cabeçalho nativo com título, seta de voltar, gesto de arrastar da borda e
  animação de transição, tudo via `options` das rotas, sem código de
  interface.

## Estrutura

```
App.tsx                                   só o mapa de rotas, sem estado e sem if
src/
  data/
    tarefas.ts                            tipo Tarefa + mock TAREFAS_MOCK
  navigation/
    tipos.ts                              RootStackParamList (rotas + params)
  screens/
    LoginScreen.tsx                       navigation + route.params
    CadastroScreen.tsx                    navigate('Login', { usuario, senha })
    tarefas/
      ListaTarefasScreen.tsx              navigation.popToTop(), mock importado
```

> A `ListaTarefasScreen` importar `TAREFAS_MOCK` direto é proposital:
> quando a tela virou rota, ela deixou de receber props do `App`.
> Compartilhar estado entre rotas é assunto da próxima aula.

## Aula interativa

Tudo fica na pasta [`aula/`](aula/). Abra [`aula/index.html`](aula/index.html)
no navegador (duplo clique) para a apresentação, que começa pela teoria da
pilha de navegação e depois ajusta o código da aula 3, tela por tela.

A apresentação **para em três pontos** e propõe um desafio para a turma
resolver sozinha antes de ver a solução sendo digitada, ver
[`AULA-ROTEIRO.md`](AULA-ROTEIRO.md) para o roteiro completo do professor e
[`BRIEF.md`](BRIEF.md) para o escopo.

- [`shared/player/`](../shared/player/), motor reutilizável (CSS + JS), o
  mesmo das aulas anteriores. Veja o [README dele](../shared/player/README.md)
  para usar em outras aulas.
- [`aula/aulas/usando-react-navigation.js`](aula/aulas/usando-react-navigation.js),
  o conteúdo desta aula, em um arquivo só. O código herdado da aula 3 fica
  no `INITIAL_FILES`, no topo do arquivo.
- [`aula/aulas/_template.js`](aula/aulas/_template.js), ponto de partida
  para uma aula nova.

### Mantendo a aula sincronizada com o código

Sempre que o `App.tsx`, os arquivos de `src/screens` ou o `package.json`
forem alterados, os trechos digitados na aula podem ficar desatualizados.
Rode:

```bash
pnpm check-aula
```

O script reconstrói cada arquivo a partir do `INITIAL_FILES` mais as etapas
da aula e compara com o código real, apontando exatamente qual trecho ficou
divergente. Ele também confere se as dependências declaradas na aula (as
que aparecem na barra lateral) batem com as do `package.json`. Saída limpa
= aula em sincronia.
