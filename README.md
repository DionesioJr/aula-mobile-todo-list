# Aulas de Mobile

Plataforma com todas as aulas de React Native. Cada aula é uma apresentação
interativa que constrói um app passo a passo, direto no navegador — sem
instalar nada. [`index.html`](index.html) é a página inicial, com um card
por aula.

Publicado na Vercel como site estático (sem build): a raiz do repositório é
servida como está, então basta apontar o projeto da Vercel para este
repositório sem nenhuma configuração extra.

## Estrutura

```
index.html            página inicial (catálogo de aulas)
shared/player/         motor da apresentação, usado por todas as aulas
aula-02/                projeto React Native da aula 2
  aula/
    index.html          apresentação interativa da aula 2
    aulas/*.js           conteúdo da aula (etapas, slides, desafios)
aula-03/                projeto React Native da aula 3
  aula/...               idem
```

Cada `aula-XX/` também tem o projeto Expo usado em aula (`App.tsx`,
`src/screens/`, `package.json`) — isso é o código que os alunos acompanham
sendo digitado na apresentação, não faz parte do site publicado.

## Adicionar uma aula nova

1. Duplique uma pasta `aula-XX/` existente (ex.: `aula-03/`) com o próximo
   número.
2. Escreva o conteúdo da aula em `aula-XX/aula/aulas/minha-aula.js` — use
   [`shared/player/README.md`](shared/player/README.md) como referência do
   formato (`meta`, `inicial`, `steps`). O arquivo
   `aula-XX/aula/aulas/_template.js` é o ponto de partida.
3. Em `aula-XX/aula/index.html`, aponte os `<script>`/`<link>` do player
   para `../../shared/player/...` (copie o `index.html` de uma aula
   existente e troque só o título e o nome do arquivo em `aulas/`).
4. Acrescente um item ao array `AULAS` em [`index.html`](index.html) da
   raiz, com `titulo`, `subtitulo`, `conceito`, `resumo` e o `href` para
   `aula-XX/aula/index.html`.

O player é compartilhado (`shared/player/`) — não copie essa pasta para a
aula nova, todas as aulas usam a mesma versão.

## Rodar localmente

Não precisa de servidor: abra `index.html` (ou qualquer
`aula-XX/aula/index.html`) direto no navegador, ou sirva a pasta com
qualquer servidor estático:

```bash
npx serve .
```

Para rodar o app React Native de uma aula específica:

```bash
cd aula-03
npm install
npx expo start
```
