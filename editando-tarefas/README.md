# Editando tarefas

App React Native com Login, Cadastro e uma lista de tarefas com **CRUD
completo**: criar, editar, concluir e excluir. **Sem nenhuma biblioteca
externa**: só o que o React e o React Native trazem por padrão (`useState`,
`View`, `Text`, `TextInput`, `TouchableOpacity`, `FlatList`, `StyleSheet`,
`Alert`) e `props`.

Continuação direta da aula 4 (`listando-tarefas/`), que entregou a listagem
de tarefas mocada, só leitura.

## Instalar

Com npm:
```bash
npm install
```

Com pnpm:
```bash
pnpm install
```

## Executar

```bash
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) ou pressione `a` / `i`
no terminal para abrir em um emulador.

> Também pode ser testado direto no [Expo Snack](https://snack.expo.dev/),
> colando os arquivos do projeto.

## O que tem de novo

- `src/screens/tarefas/FormularioTarefaScreen.tsx`, uma tela só, reaproveitada
  pra criar e pra editar uma tarefa (`tarefaEditando: Tarefa | null` decide o
  modo).
- `App.tsx`: as tarefas saem do mock direto e viram estado
  (`useState(TAREFAS_MOCK)`), com funções `salvarTarefa`, `alternarConcluida`
  e `excluirTarefa`, todas atualizando o array sem mutar (`map`/`filter`/
  spread).
- `src/screens/tarefas/ListaTarefasScreen.tsx` ganha um botão de nova tarefa,
  toque no título abre edição, toque no status alterna concluída/pendente, e
  um botão de excluir com confirmação.

## Estrutura

```
App.tsx                                   estado da tela + conta + tarefas + navegação
src/
  data/
    tarefas.ts                            tipo Tarefa + mock TAREFAS_MOCK (valor inicial)
  screens/
    LoginScreen.tsx                       inalterado desde a aula 4
    CadastroScreen.tsx                    inalterado desde a aula 3
    tarefas/
      ListaTarefasScreen.tsx              props (tarefas, aoSair, aoNovaTarefa, aoTocarTarefa, aoAlternarConcluida, aoExcluirTarefa)
      FormularioTarefaScreen.tsx          props (tarefaEditando, aoSalvar, aoVoltar)
```

## Aula interativa

Tudo fica na pasta [`aula/`](aula/). Abra [`aula/index.html`](aula/index.html)
no navegador (duplo clique) para a apresentação que constrói o formulário e
o CRUD do zero, partindo do código pronto da aula 4.

A apresentação **para em dois pontos** e propõe um desafio para a turma
resolver sozinha antes de ver a solução sendo digitada, ver
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

Sempre que `App.tsx` ou os arquivos de `src/screens/tarefas` forem
alterados, os trechos digitados na aula podem ficar desatualizados. Rode:

```bash
pnpm check-aula
```

O script reconstrói cada arquivo a partir do `INITIAL_FILES` mais as etapas
da aula e compara com o código real, apontando exatamente qual trecho ficou
divergente. Saída limpa = aula em sincronia.

Isso também valida as âncoras `after`/`before` das etapas `insert`: uma
âncora que não existe mais faz o texto cair no fim do arquivo, e o diff
mostra na hora.
