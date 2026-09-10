# Listando tarefas

App React Native com Login, Cadastro e agora uma terceira tela: **lista de
tarefas**, com dados mocados. **Sem nenhuma biblioteca externa**: só o que o
React e o React Native trazem por padrão (`useState`, `View`, `Text`,
`TextInput`, `TouchableOpacity`, `FlatList`, `StyleSheet`, `Alert`) e `props`.

Continuação direta da aula 3 (`implementando-navegacao/`), que entregou
Login + Cadastro conversando entre si.

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

- `src/data/tarefas.ts`, o tipo `Tarefa` e um array mocado (`TAREFAS_MOCK`),
  fingindo ser a resposta de uma API. Só leitura por enquanto.
- `src/screens/tarefas/ListaTarefasScreen.tsx`, mostra `TAREFAS_MOCK` com
  `FlatList`, cada item com título e status (concluída/pendente).
- `App.tsx` ganha um terceiro valor em `tela` (`'lista'`), e o login para de
  terminar só num `Alert`: ao validar direito, ele também chama `aoLogar()`,
  que troca a tela pra listagem.

## Estrutura

```
App.tsx                             estado da tela + conta + navegação
src/
  data/
    tarefas.ts                      tipo Tarefa + mock TAREFAS_MOCK
  screens/
    LoginScreen.tsx                 props (conta, aoCriarConta, aoLogar)
    CadastroScreen.tsx              props (aoCadastrar, aoVoltar)
    tarefas/
      ListaTarefasScreen.tsx        props (tarefas, aoSair), FlatList
```

## Aula interativa

Tudo fica na pasta [`aula/`](aula/). Abra [`aula/index.html`](aula/index.html)
no navegador (duplo clique) para a apresentação que constrói o mock de
tarefas e a tela de listagem do zero, partindo do código pronto da aula 3.

A apresentação **para em três pontos** e propõe um desafio para a turma
resolver sozinha antes de ver a solução sendo digitada, ver
[`AULA-ROTEIRO.md`](AULA-ROTEIRO.md) para o roteiro completo do professor e
[`BRIEF.md`](BRIEF.md) para o escopo.

- [`shared/player/`](../shared/player/), motor reutilizável (CSS + JS), o
  mesmo das aulas anteriores. Veja o [README dele](../shared/player/README.md)
  para usar em outras aulas.
- [`aula/aulas/listando-tarefas.js`](aula/aulas/listando-tarefas.js), o
  conteúdo desta aula, em um arquivo só. O código herdado da aula 3 fica no
  `INITIAL_FILES`, no topo do arquivo.
- [`aula/aulas/_template.js`](aula/aulas/_template.js), ponto de partida
  para uma aula nova.

### Mantendo a aula sincronizada com o código

Sempre que `App.tsx`, `src/screens/LoginScreen.tsx` ou os arquivos de
`src/data`/`src/screens/tarefas` forem alterados, os trechos digitados na
aula podem ficar desatualizados. Rode:

```bash
pnpm check-aula
```

O script reconstrói cada arquivo a partir do `INITIAL_FILES` mais as etapas
da aula e compara com o código real, apontando exatamente qual trecho ficou
divergente. Saída limpa = aula em sincronia.

Isso também valida as âncoras `after`/`before` das etapas `insert`: uma
âncora que não existe mais faz o texto cair no fim do arquivo, e o diff
mostra na hora.

## Próxima aula

`editando-tarefas/` completa o CRUD: criar, editar e excluir uma tarefa de
verdade, a partir do que esta aula deixou pronto.
