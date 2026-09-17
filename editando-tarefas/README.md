# Editando tarefas

App React Native com Login, Cadastro e uma lista de tarefas com **CRUD
completo** (criar, editar, concluir e excluir), navegando com **React
Navigation**. A tarefa a editar viaja nos params da rota, e a lista, que é
estado compartilhado, desce por props pela forma de função do
`<Stack.Screen>`.

Continuação direta da aula 4 (`usando-react-navigation/`), que trocou a
navegação manual pelo React Navigation e deixou a lista de tarefas
importando o mock por conta própria.

## Instalar

Com npm:
```bash
npm install
```

Com pnpm:
```bash
pnpm install
```

As dependências são as mesmas da aula 4 (`@react-navigation/native`,
`@react-navigation/native-stack`, `react-native-screens` e
`react-native-safe-area-context`). Esta aula não acrescenta nenhuma.

## Executar

```bash
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) ou pressione `a` / `i`
no terminal para abrir em um emulador.

> Também pode ser testado direto no [Expo Snack](https://snack.expo.dev/),
> colando os arquivos do projeto.

## O que tem de novo

- `src/screens/tarefas/FormularioTarefaScreen.tsx`, uma tela só,
  reaproveitada para criar e para editar. O modo vem da navegação:
  `route.params` com uma tarefa é edição, sem params é criação.
- `src/navigation/tipos.ts` ganha a rota `Formulario`, cujos params levam
  um objeto `Tarefa` inteiro.
- `App.tsx`: as tarefas viram estado (`useState(TAREFAS_MOCK)`), com
  `salvarTarefa`, `alternarConcluida` e `excluirTarefa` atualizando o array
  sem mutar (`map`/`filter`/spread). As rotas `Lista` e `Formulario` usam a
  forma de função do `<Stack.Screen>` para receber esse estado por prop, e
  o `options` do formulário é uma função que lê `route.params` para
  escolher o título do cabeçalho.
- `src/screens/tarefas/ListaTarefasScreen.tsx` volta a receber `tarefas`
  por prop, ganha um botão de nova tarefa, toque no título abre a edição,
  toque no status alterna concluída/pendente e um botão de excluir pede
  confirmação.

## Estrutura

```
App.tsx                                   rotas + estado das tarefas + as 3 funções
src/
  data/
    tarefas.ts                            tipo Tarefa + mock TAREFAS_MOCK (valor inicial)
  navigation/
    tipos.ts                              RootStackParamList, agora com a rota Formulario
  screens/
    LoginScreen.tsx                       inalterado desde a aula 4
    CadastroScreen.tsx                    inalterado desde a aula 4
    tarefas/
      ListaTarefasScreen.tsx              props (tarefas, aoAlternarConcluida, aoExcluirTarefa) + navigation
      FormularioTarefaScreen.tsx          props (aoSalvar) + navigation e route
```

## Aula interativa

Tudo fica na pasta [`aula/`](aula/). Abra [`aula/index.html`](aula/index.html)
no navegador (duplo clique) para a apresentação, que constrói o formulário
e o CRUD partindo do código pronto da aula 4.

A apresentação **para em três pontos** e propõe um desafio para a turma
resolver sozinha antes de ver a solução sendo aplicada, ver
[`AULA-ROTEIRO.md`](AULA-ROTEIRO.md) para o roteiro completo do professor e
[`BRIEF.md`](BRIEF.md) para o escopo.

- [`shared/player/`](../shared/player/), motor reutilizável (CSS + JS), o
  mesmo das aulas anteriores. Veja o [README dele](../shared/player/README.md)
  para usar em outras aulas.
- [`aula/aulas/editando-tarefas.js`](aula/aulas/editando-tarefas.js), o
  conteúdo desta aula, em um arquivo só. O código herdado da aula 4 fica no
  `INITIAL_FILES`, no topo do arquivo.
- [`aula/aulas/_template.js`](aula/aulas/_template.js), ponto de partida
  para uma aula nova.

### Mantendo a aula sincronizada com o código

Sempre que `App.tsx`, `src/navigation/tipos.ts` ou os arquivos de
`src/screens/tarefas` forem alterados, os trechos aplicados na aula podem
ficar desatualizados. Rode:

```bash
pnpm check-aula
```

O script reconstrói cada arquivo a partir do `INITIAL_FILES` mais as etapas
da aula e compara com o código real, apontando exatamente qual trecho ficou
divergente. Saída limpa = aula em sincronia.

Isso também valida as âncoras `after`/`before` das etapas `insert` e os
`find` das etapas `replace`: um trecho que não existe mais faz a etapa não
aplicar nada, e o diff mostra na hora.
