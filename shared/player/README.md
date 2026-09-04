# Aula Player

Motor de apresentação de aulas de código: mostra um editor falso com árvore de
arquivos, digita o código letra por letra e avança por teclado. Não depende de
nenhuma biblioteca e roda abrindo o HTML direto no navegador (`file://`).

## Arquivos

Tudo vive dentro da pasta `aula/`, separado do código do projeto:

```
aula/
  index.html            casca: carrega o CSS, a aula e o motor
  player/player.css     aparência (tema escuro, layout, realce de sintaxe)
  player/highlight.js   realce de sintaxe TS/TSX (puro, sem DOM)
  player/icons.js       ícones de pasta/arquivo por extensão
  player/virtual-fs.js  FS virtual: aplica as etapas e monta a árvore
  player/markdown.js    markdown mínimo → HTML, usado nos slides de conceito/desafio
  player/markup.js      HTML do esqueleto da interface (topbar, sidebar, editor…)
  player/player.js      motor principal: digitação, navegação, progresso, eventos
  aulas/*.js            conteúdo de cada aula — só dados, nada de interface
```

Os módulos de `player/` se registram em `window.AulaEngine` (`highlight`, `icons`,
`fs`, `markdown`, `markup`) e devem ser carregados **antes** de `player.js`, que
os consome e expõe `window.AulaPlayer`.

## Usar em outro projeto de aula

Copie a pasta `aula/` inteira e troque o conteúdo de `aulas/`. O `index.html`
fica assim:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Aula — Título</title>
  <link rel="stylesheet" href="player/player.css" />
</head>
<body>
  <div id="app"></div>
  <script src="aulas/minha-aula.js"></script>
  <script src="player/highlight.js"></script>
  <script src="player/icons.js"></script>
  <script src="player/virtual-fs.js"></script>
  <script src="player/markdown.js"></script>
  <script src="player/markup.js"></script>
  <script src="player/player.js"></script>
  <script>AulaPlayer.iniciar(MINHA_AULA);</script>
</body>
</html>
```

## Formato de uma aula

```js
{
  meta:    { titulo, projeto, subtitulo, vazio },
  inicial: { entries: [{path, type}], files: {caminho: conteudo} }, // opcional
  deps:    { titulo, desde, lista: [{name, ver}] },                 // opcional
  steps:   [ ...etapas... ]
}
```

### Operações de etapa (`op`)

| op | Campos | O que faz |
| --- | --- | --- |
| `intro` / `note` / `outro` | `title`, `eyebrow`, `md` | **Slide em tela cheia** (sidebar, abas e faixa de ação somem): título + corpo em Markdown |
| `challenge` | `title`, `md`, `time` | Mesmo slide em tela cheia, com sotaque roxo: propõe um exercício para a turma resolver sozinha antes de ver a solução (as etapas `code`/`insert` seguintes). `time` é um selo opcional (ex.: `'5 min'`) |
| `folder` | `target` | Cria pasta |
| `file` | `target` | Cria arquivo vazio e abre |
| `code` | `file`, `code` | Digita no fim do arquivo |
| `insert` | `file`, `code`, `after` \| `before` | Digita em um ponto do arquivo |
| `clear` | `target` | Esvazia o arquivo |
| `delete` | `target` | Apaga arquivo ou pasta |
| `rename` | `from`, `to` | Renomeia |

Todas as etapas aceitam `part` (nome da parte, usado no progresso), `title` e
`explain` (a nota do rodapé do editor — só aparece fora do modo slide). Os
textos de `explain` aceitam HTML.

### O campo `md` (slides de conceito/desafio)

`intro`, `note`, `outro` e `challenge` recebem o corpo do slide em **Markdown**
puro (campo `md`), renderizado por `player/markdown.js` — um conversor mínimo,
sem dependências, que suporta:

```
# / ## / ###        títulos (sempre menores que o título do slide)
texto solto          parágrafo
- item                lista com marcador
1. item               lista numerada
> texto               citação — vira a caixa de destaque/dica
**negrito**  `código`  [texto](url)   formatação em linha
```` ```               bloco de código cercado
---                   régua horizontal
```

**Não suportado** (some ou aparece literal): tabela, itálico com asterisco
simples (`*assim*` — use `**negrito**`), lista aninhada, imagem.

Isso evita escrever HTML na mão e — o motivo de existir — evita que uma
explicação longa "quebre" o layout: o slide ocupa a tela toda (ver `.slide-mode`
em `player.css`), então listas, títulos e blocos de código cabem soltos, sem
depender do espaço apertado do editor+sidebar.

`title`/`eyebrow` continuam fora do markdown — são o cabeçalho do slide, não o
corpo. Etapas antigas com `lead`/`bullets[]`/`tip` (sem `md`) ainda funcionam,
como compatibilidade — mas prefira `md` em aulas novas.

## Controles

`→` `Espaço` `Enter` avança (a primeira seta durante a digitação completa o
bloco na hora) · `←` volta · `↑` `↓` velocidade · `Home` / `End` primeira e
última etapa · clique na barra de progresso pula para o ponto.

`C` recolhe/expande o cabeçalho · `R` oculta/mostra o rodapé (nota didática) —
úteis em telas ou projeções pequenas. Os mesmos dois botões ficam na topbar
(`⤒`/`⤓`), ao lado do toggle do Explorer; o estado de cada um fica salvo no
`localStorage`, igual ao Explorer e ao tema.

## API

`AulaPlayer.iniciar(aula, opcoes?)` devolve a instância:

```js
const player = AulaPlayer.iniciar(MINHA_AULA, { raiz: '#app', etapaInicial: 0 });
player.proxima(); player.anterior(); player.irPara(10);
player.etapaAtual(); player.total(); player.estado(); player.destruir();
```
