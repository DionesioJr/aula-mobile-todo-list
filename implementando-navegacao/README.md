# Cadastro e Navegação

App React Native com duas telas (Login e Cadastro) e navegação entre elas,
**sem nenhuma biblioteca externa**. Nem de UI, nem de navegação: só o que o
React e o React Native trazem por padrão (`useState`, `View`, `Text`,
`TextInput`, `TouchableOpacity`, `StyleSheet`, `Alert`) e `props`.

Continuação direta da aula 2, que entregou a tela de login.

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

## Como funciona a navegação (sem `@react-navigation`)

`App.tsx` guarda o nome da tela atual num `useState` e um `if` decide o que
renderizar. As telas não trocam de tela sozinhas: elas recebem funções por
`props` e só chamam.

```tsx
const [tela, setTela] = useState('login');

if (tela === 'cadastro') {
  return <CadastroScreen aoCadastrar={cadastrar} aoVoltar={() => setTela('login')} />;
}
return <LoginScreen conta={conta} aoCriarConta={() => setTela('cadastro')} />;
```

A conta criada no cadastro também mora no `App.tsx` (elevar o estado) e
desce como prop para o login validar quem entra. Tudo em memória, fechou o
app, sumiu.

## Estrutura

```
App.tsx                       estado da tela + estado da conta + navegação
src/
  screens/
    LoginScreen.tsx           props (conta, aoCriarConta)
    CadastroScreen.tsx        props (aoCadastrar, aoVoltar)
```

## Aula interativa

Tudo fica na pasta [`aula/`](aula/). Abra [`aula/index.html`](aula/index.html)
no navegador (duplo clique) para a apresentação que constrói a tela de
cadastro e a navegação do zero, partindo do código pronto da aula 2.

A apresentação **para em cinco pontos** e propõe um desafio para a turma
resolver sozinha antes de ver a solução sendo digitada, ver
[`AULA-ROTEIRO.md`](AULA-ROTEIRO.md) para o roteiro completo do professor e
[`BRIEF.md`](BRIEF.md) para o escopo.

- [`aula/player/`](aula/player/), motor reutilizável (CSS + JS), o mesmo das
  aulas anteriores. Veja o [README dele](aula/player/README.md) para usar em
  outras aulas.
- [`aula/aulas/cadastro-navegacao.js`](aula/aulas/cadastro-navegacao.js), o
  conteúdo desta aula, em um arquivo só. O código herdado da aula 2 fica no
  `INITIAL_FILES`, no topo do arquivo.
- [`aula/aulas/_template.js`](aula/aulas/_template.js), ponto de partida
  para uma aula nova.

### Mantendo a aula sincronizada com o código

Sempre que `App.tsx`, `src/screens/LoginScreen.tsx` ou
`src/screens/CadastroScreen.tsx` forem alterados, os trechos digitados na
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
