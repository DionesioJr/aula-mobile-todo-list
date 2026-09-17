# Roteiro: Editando tarefas (CRUD sobre as rotas)

Documento de apoio do professor para a apresentação interativa
[`aula/index.html`](aula/index.html).

---

## 1. Onde essa aula entra

A aula 4 entregou navegação de verdade (React Navigation, pilha, cabeçalho,
params) e terminou com uma dívida assumida em voz alta: a
`ListaTarefasScreen`, ao virar rota, perdeu o pai que passava props e
voltou a importar `TAREFAS_MOCK` direto. Hoje essa dívida é paga, e no
caminho a lista vira editável.

| | Aula 4 | Aula 5 |
|---|---|---|
| Ponto de partida | Código da aula 3 | **Código da aula 4 já na árvore** |
| Escopo | Trocar de tela do jeito certo | Criar, editar e excluir um item |
| Conceito central | `navigation.navigate` e a pilha | **Lista como estado**, atualização imutável |
| Conceito de navegação | Rotas e params com texto | **Params com objeto** e **props numa rota** |
| Bibliotecas | Instala o React Navigation | Nenhuma nova |

O motor de apresentação é o mesmo ([`shared/player/`](../shared/player/)),
sem mudanças.

### A decisão que define a aula: ajustar, não recriar

Como na aula 4, todo arquivo que já existe é **editado ponto a ponto**
(etapas `replace`/`insert`): o trecho antigo some e o novo é digitado no
lugar dele, que é o que a turma vai fazer no próprio editor. O único
arquivo escrito do zero é a `FormularioTarefaScreen.tsx`, porque não
existia.

Isso muda o que dizer em cada etapa de código: a pergunta é **"o que essa
linha era antes, e por que ela muda"**. Vale pausar meio segundo antes de
avançar e deixar a turma ler a linha que vai sumir.

---

## 2. Como usar a apresentação

Abra `aula/index.html` no navegador (duplo clique), tela cheia (`F11`).
Mesmos atalhos: `→`/`Espaço`/`Enter` avança, `←`/`Backspace` volta,
`↑`/`↓` mudam a velocidade da digitação, clique na barra de progresso pula
direto para um ponto.

`C` recolhe o cabeçalho e `R` esconde o rodapé com a nota didática, úteis
em projetor de baixa resolução. Os dois têm botão na topbar (`⤒` e `⤓`) e o
estado fica salvo entre apresentações.

Clique nos arquivos da barra lateral para abrir o código da aula 4 durante
o recap (etapa 2). As quatro dependências aparecem acesas desde o começo:
elas vieram da aula passada, hoje não se instala nada.

### Os cartões de desafio

Quando aparecer um cartão **roxo** com "Desafio":

1. **Pare de apertar seta.** Leia o enunciado em voz alta.
2. Dê à turma o tempo do selo (6–8 min) para tentar no próprio Snack.
3. Circule, veja quem travou, dê a dica que já está no rodapé do cartão.
4. Só depois avance: as etapas seguintes aplicam a solução oficial no
   código, a turma **compara** com o que fez, não copia do zero.

---

## 3. Estrutura da aula, 34 etapas em 6 partes

| # | Parte | O que entrega |
|---|---|---|
| 1 | De onde partimos | Recap do código da aula 4 e da dívida que sobrou |
| 2 | Formulário de tarefa | Rota `Formulario` + a tela nova, **desafio** |
| 3 | Tarefas viram estado | `useState` + as 3 funções do CRUD, **desafio** |
| 4 | Rotas com props | `<Stack.Screen>` com função filha, `options` função |
| 5 | Lista aciona o CRUD | Botões e navegação na lista, **desafio** |
| 6 | Fechamento | Teste do fluxo + recap + 5 desafios pra casa |

**3 desafios ao vivo**, ~21 min só de desafio. Duração sugerida:
**70–85 min** com os desafios valendo tempo real.

### Se o tempo apertar
**A aula está completa no fim da Parte 5.** Criar, editar, concluir e
excluir funcionando é uma entrega redonda. Se sobrar pouco tempo, a Parte 5
pode ser mais guiada, com desafio menor. A Parte 4 é curta e não deve ser
cortada: é ela que responde a pergunta que a aula 4 deixou aberta.

---

## 4. O que cada parte ensina

### Parte 1: De onde partimos
Abra os arquivos na barra lateral e releia o código da aula passada. Ponto
a martelar: **a lista funciona, mas é uma fotografia parada**, sempre o
mesmo `TAREFAS_MOCK`, porque é uma constante importada pela própria tela.

> **Fale sobre:** por que aquele import ficou lá. Quando a tela virou rota,
> o `App` parou de criar a tela (quem cria é o navigator), então não havia
> como passar props. Hoje a turma aprende a forma de passar.

### Parte 2: Formulário de tarefa
Uma tela para dois modos, e o que decide o modo é **a navegação**: com
params é edição, sem params é criação.

> **Fale sobre:** por que não fazer duas telas quase iguais. Menos código
> para manter, um só lugar onde a validação do título existe.

> **Fale sobre:** params levando um **objeto**. Na aula 4 foram dois
> textos; agora é uma `Tarefa` inteira. Vale repetir o limite: params são
> para dado pequeno, não para estado compartilhado.

> **Fale sobre:** o `&` no `type Props`. Se o `|` da aula 4 é "ou um, ou
> outro", o `&` é "tudo isso e também aquilo". A tela tem as props da rota
> **e** as props do pai.

### Parte 3: Tarefas viram estado (o coração da aula)
O ponto mais denso: `useState(TAREFAS_MOCK)` no `App.tsx` e três funções
que manipulam essa lista **sem nunca mutar o array original**.

> **Fale sobre:** por que não mutar (`tarefas[i].titulo = x`,
> `tarefas.push(x)`). O React decide re-renderizar comparando a
> **referência** do array com a anterior; mutar no lugar mantém a mesma
> referência, e o React não percebe a mudança.

> **Fale sobre:** o spread em dois contextos, `{ ...tarefa, titulo }`
> (copia um objeto, sobrescreve um campo) e `[...tarefas, novaTarefa]`
> (copia um array, acrescenta um item). Mesmo símbolo, mesma ideia.

> **Fale sobre:** nenhuma das três funções navega. Quem volta para a lista
> é o formulário, com `goBack()`. Navegar é da tela, mudar o dado é do
> `App`; misturar os dois é o começo de um componente difícil de ler.

### Parte 4: Rotas com props (a resposta da aula 4)
Curta e decisiva. `component={Tela}` não deixa passar props, então o
`<Stack.Screen>` recebe uma **função filha** e o `{...props}` repassa
`navigation` e `route` para a tela.

> **Fale sobre:** o que é aquele `props` da função. É o pacote que o
> navigator monta (`navigation` e `route`); `{...props}` evita escrever os
> dois na mão, e ao lado deles entram as props do `App`.

> **Fale sobre:** `options` como função, lendo `route.params` para decidir
> o título. O cabeçalho muda de "Nova tarefa" para "Editar tarefa" sem que
> a tela saiba que isso existe.

> **Fale sobre:** quando isso **não** basta. Se a árvore crescesse e a
> lista precisasse descer três níveis, o caminho seria `Context`. É o
> desafio de casa número 5 e a próxima aula.

### Parte 5: A lista aciona o CRUD
A `ListaTarefasScreen` ganha as props, os botões e a navegação que
faltavam. Ponto de atenção de UI, não de lógica: três `TouchableOpacity`
**lado a lado**, nunca aninhados.

> **Fale sobre:** a troca de `data={TAREFAS_MOCK}` por `data={tarefas}`. É
> o momento em que a lista acorda, e é fácil passar batido.

> **Fale sobre:** a forma de `Alert.alert` com lista de botões, primeira
> vez no curso. `style: 'destructive'` é só visual (botão vermelho no iOS),
> quem decide o que acontece é sempre o `onPress`.

### Parte 6: Fechamento
O teste percorre as quatro operações e fecha com a seta do cabeçalho: sair
do formulário pela seta ou pelo gesto é o mesmo `goBack()` do botão
"Cancelar", de graça, porque é uma rota de verdade.

---

## 5. Estrutura final do projeto

```
App.tsx                                   rotas + estado das tarefas + as 3 funções
src/
  data/
    tarefas.ts                            inalterado desde a aula 3
  navigation/
    tipos.ts                              ganha a rota Formulario, com params
  screens/
    LoginScreen.tsx                       inalterado desde a aula 4
    CadastroScreen.tsx                    inalterado desde a aula 4
    tarefas/
      ListaTarefasScreen.tsx              props da rota + props do App, 3 ações por item
      FormularioTarefaScreen.tsx          criar e editar, decidido por route.params
```

Nenhuma dependência além das quatro da aula 4.

---

## 6. Conceitos cobertos

| Conceito | Onde aparece |
|---|---|
| Params levando um objeto (`{ tarefa }`) | Parte 2 |
| Interseção de tipos (`&`) | Partes 2 e 5 |
| Lista como estado (`useState` com um array) | Parte 3 |
| Atualização imutável: `.map()`, `.filter()`, spread | Parte 3 |
| Props numa rota: função filha do `<Stack.Screen>` | Parte 4 |
| `options` como função, lendo `route.params` | Parte 4 |
| `Alert.alert` com lista de botões e `style: 'destructive'` | Parte 5 |
| Evitar `TouchableOpacity` aninhado | Parte 5 |

---

## 7. Perguntas frequentes na hora da aula

**"Por que não dá só `tarefas.push(novaTarefa)` e pronto?"**
Dá para escrever, mas a tela não re-renderiza: o React compara a referência
do array antes e depois, e `push` muda o array **no lugar**, sem criar
referência nova. `[...tarefas, novaTarefa]` cria um array novo, e é essa
referência nova que avisa o React.

**"Por que o formulário não recebe a tarefa por prop, como a lista recebe a
lista?"**
Porque são coisas diferentes. A lista inteira é **estado compartilhado**,
vive no `App` e desce por props. Qual tarefa abrir é **um detalhe daquela
navegação específica**, e isso é exatamente para o que params existem.

**"Dá para passar props sem essa função dentro do `<Stack.Screen>`?"**
Dá, com `Context`, e é o caminho recomendado quando as props começam a
viajar por muitos níveis. Para duas telas e três props, a função filha é
mais simples e usa só o que a turma já sabe.

**"As tarefas ficam salvas se eu fechar o app?"**
Não, tudo em `useState` vive na memória enquanto o app está aberto.
Persistência de verdade (`AsyncStorage`, banco, API) é assunto de outra
aula.

**"Por que o formulário de criar e o de editar são a mesma tela?"**
Porque são quase idênticos; a única diferença é se veio uma tarefa nos
params ou não. Duas telas quase iguais seriam duplicação sem necessidade.

---

## 8. Manutenção da apresentação

Todo o conteúdo está em
[`aula/aulas/editando-tarefas.js`](aula/aulas/editando-tarefas.js), um
arquivo só, no formato do [`_template.js`](aula/aulas/_template.js). Os
slides de conceito/desafio usam o campo `md` (Markdown); ver
[`shared/player/README.md`](../shared/player/README.md#o-campo-md-slides-de-conceitodesafio)
para a sintaxe suportada, atenção: **não há suporte a tabela nem a itálico
com asterisco simples** nos slides.

Quase todas as etapas de código são `replace` (`{file, find, code}`) ou
`insert`: o trecho de `find` some do arquivo e o de `code` é digitado no
lugar. `find` é **texto literal** e vale a primeira ocorrência, então
precisa ser único no arquivo, inclusive com o `\n` final quando a ideia é
trocar a linha inteira. Se o trecho não existir mais, a etapa não faz nada
e o `check-sync` aponta a divergência.

O ponto de partida da aula (o código da aula 4) fica em `INITIAL_FILES`, no
topo do arquivo. Se a aula 4 mudar, este bloco muda junto.

Depois de qualquer alteração no roteiro ou no código real, rode:

```bash
pnpm check-aula
```

Ele reconstrói os sete arquivos a partir de `INITIAL_FILES` + as etapas,
compara byte a byte com os arquivos reais e confere as dependências contra
o `package.json`. Isso também valida todas as âncoras `after`/`before` dos
`insert` e os `find` dos `replace`. Ver
[`aula/tools/check-sync.js`](aula/tools/check-sync.js).
