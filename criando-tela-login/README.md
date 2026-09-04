# Aula 2: Tela de Login

App React Native com uma única tela (Login), sem nenhuma biblioteca externa,
só o que o React e o React Native trazem por padrão (`useState`, `View`,
`Text`, `TextInput`, `TouchableOpacity`, `StyleSheet`, `Alert`).

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

## Aula interativa

Tudo fica na pasta [`aula/`](aula/). Abra [`aula/index.html`](aula/index.html)
no navegador (duplo clique) para a apresentação que constrói a tela do zero.

Diferente da aula 1, essa apresentação **para em três pontos** e propõe um
desafio para a turma resolver sozinha antes de ver a solução sendo digitada,
veja [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md) para o roteiro completo do
professor.

- [`aula/player/`](aula/player/), motor reutilizável (CSS + JS), o mesmo da
  aula 1, com um tipo de etapa novo (`challenge`). Veja o
  [README dele](aula/player/README.md) para usar em outras aulas.
- [`aula/aulas/login-react-native.js`](aula/aulas/login-react-native.js), o
  conteúdo desta aula, em um arquivo só.
- [`aula/aulas/_template.js`](aula/aulas/_template.js), ponto de partida
  para uma aula nova.

### Mantendo a aula sincronizada com o código

Sempre que `App.tsx` ou `src/screens/LoginScreen.tsx` forem alterados, os
trechos digitados na aula podem ficar desatualizados. Rode:

```bash
pnpm check-aula
```

O script reconstrói cada arquivo a partir das etapas da aula e compara com o
código real, apontando exatamente qual trecho ficou divergente. Saída limpa
= aula em sincronia; qualquer divergência é reportada com diff.
