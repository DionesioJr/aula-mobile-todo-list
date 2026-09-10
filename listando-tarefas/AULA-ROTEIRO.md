# Roteiro: Listando tarefas (React Native, sem libs externas)

Documento de apoio do professor para a apresentação interativa
[`aula/index.html`](aula/index.html).

---

## 1. Onde essa aula entra

A aula 3 terminou com Login e Cadastro conversando entre si, mas o login
acaba num `Alert` e "não leva a lugar nenhum de verdade". Hoje esse lugar
existe: a listagem de tarefas.

| | Aula 3 | Aula 4 |
|---|---|---|
| Ponto de partida | Projeto vazio | **Código da aula 3 já na árvore** |
| Escopo | Duas telas + navegação | Terceira tela **+ dado mocado** |
| Conceito central | `props` (função e dado) | **Renderizar lista** (`FlatList`) |
| Bibliotecas | Nenhuma | Nenhuma, `FlatList` é nativo do RN |
| Formato | Digitação + 5 desafios | Digitação + **3 desafios** |

O motor de apresentação é o mesmo ([`shared/player/`](../shared/player/)),
sem mudanças. A novidade é de conteúdo: primeira vez que a turma separa
**dado** de **tela** num arquivo próprio.

### A decisão que define a aula: dado mocado, ainda sem CRUD

`TAREFAS_MOCK` é uma constante importada e só leitura. Ainda não dá para
criar, marcar como concluída ou apagar uma tarefa, isso é proposital: a
turma primeiro aprende a **mostrar** uma lista, depois (aula 5) aprende a
**mudar** essa lista. Misturar os dois na mesma aula deixaria o assunto
principal (`FlatList`) menos claro.

---

## 2. Como usar a apresentação

Abra `aula/index.html` no navegador (duplo clique), tela cheia (`F11`).
Mesmos atalhos: `→`/`Espaço`/`Enter` avança, `←`/`Backspace` volta,
`↑`/`↓` mudam a velocidade da digitação, clique na barra de progresso pula
direto para um ponto.

`C` recolhe o cabeçalho e `R` esconde o rodapé com a nota didática, úteis
em projetor de baixa resolução. Os dois têm botão na topbar (`⤒` e `⤓`) e o
estado fica salvo entre apresentações.

Clique nos arquivos da barra lateral para abrir o código da aula 3 durante
o recap (etapa 2). O player mostra o arquivo escolhido com a marca
`(visualizando)`; a próxima seta volta a seguir a etapa normalmente.

### Os cartões de desafio

Quando aparecer um cartão **roxo** com "Desafio":

1. **Pare de apertar seta.** Leia o enunciado em voz alta.
2. Dê à turma o tempo do selo (4–8 min) para tentar no próprio Snack.
3. Circule, veja quem travou, dê a dica que já está no rodapé do cartão.
4. Só depois avance: as etapas `code`/`insert` seguintes digitam a solução
   oficial, a turma **compara** com o que fez, não copia do zero.

---

## 3. Estrutura da aula, ~35 etapas em 5 partes

| # | Parte | O que entrega |
|---|---|---|
| 1 | De onde partimos | Recap do código da aula 3 |
| 2 | Dados mocados | `src/data/tarefas.ts`, **desafio** |
| 3 | Tela de listagem | `ListaTarefasScreen.tsx` com `FlatList`, **desafio** |
| 4 | Login leva a algum lugar | Prop `aoLogar`, terceiro `if` no `App`, **desafio** |
| 5 | Fechamento | Recap + 5 desafios pra casa |

**3 desafios ao vivo**, ~19 min só de desafio. Duração sugerida:
**60–75 min** com os desafios valendo tempo real.

### Se o tempo apertar
**A aula está completa no fim da Parte 4.** Login levando à listagem com
dado mocado é uma entrega redonda. A Parte 3 pode ser mais guiada (menos
tempo de desafio) sem perder o conceito principal.

---

## 4. O que cada parte ensina

### Parte 1: De onde partimos
Abra os três arquivos na barra lateral e releia o código da aula passada
com a turma. Ponto a martelar: **o login termina num `Alert` e some**, não
tem "próxima tela" ainda.

### Parte 2: Dados mocados
Introduz a ideia de **mock**: dado fixo, escrito à mão, no lugar de uma API
que ainda não existe. O `type Tarefa` é a primeira vez que a turma usa
`type` para descrever um **dado**, não uma lista de props de tela.

> **Fale sobre:** por que separar dado de UI vale a pena mesmo num projeto
> pequeno, quando a API de verdade chegar, só esse arquivo muda.

> **Fale sobre:** `id` é string, não number. Fica mais claro pra turma por
> que, quando o `keyExtractor` entrar na Parte 3.

### Parte 3: Tela de listagem (o coração da aula)
`FlatList` com três props: `data`, `keyExtractor`, `renderItem`. Compare com
o que a turma já sabe: `renderItem` é "a mesma coisa que escrever JSX
condicional com `if`", só que roda **uma vez por item do array**.

> **Fale sobre:** performance. `FlatList` só desenha o que está visível na
> tela, ao contrário de simplesmente mapear o array inteiro em `<Text>`
> soltos dentro de um `ScrollView`. Não precisa entrar em detalhe técnico,
> só que existe motivo pra ela existir.

> **Fale sobre:** o operador ternário (`?:`) no estilo condicional. Muita
> gente da turma já viu em outras linguagens, vale nomear explicitamente.

### Parte 4: Login leva a algum lugar
Repetição do padrão de prop de função já visto (aula 3), aplicado a mais
uma transição de tela. O ponto novo é que o `Alert.alert('Bem-vindo!', ...)`
**continua existindo**: `aoLogar()` é chamado **depois** dele, não no lugar.

> **Fale sobre:** por que não apagamos o `Alert`. O motor de apresentação
> só digita, não edita texto já escrito, mas isso também é uma decisão
> válida numa aplicação de verdade: mostrar feedback e navegar não são
> mutuamente exclusivos.

O teste final fecha o ciclo: entrar errado continua bloqueado, cadastrar e
entrar leva à lista mocada, sair volta pro login.

### Parte 5: Fechamento
Recap e 5 desafios pra casa. O de número 5 é o gancho direto pra aula 5:
fazer a turma perceber, sozinha, que uma constante importada não muda, e
que "marcar como concluída" vai exigir mexer em **estado**, não em
constante.

---

## 5. Estrutura final do projeto

```
App.tsx                             estado da tela + conta + navegação
src/
  data/
    tarefas.ts                      tipo Tarefa + mock TAREFAS_MOCK
  screens/
    LoginScreen.tsx                 props (conta, aoCriarConta, aoLogar)
    CadastroScreen.tsx              inalterado desde a aula 3
    tarefas/
      ListaTarefasScreen.tsx        props (tarefas, aoSair)
```

Nenhuma dependência declarada além do que o Expo Snack já cria.

---

## 6. Conceitos cobertos

| Conceito | Onde aparece |
|---|---|
| `type` para descrever um dado (não só `Props`) | Parte 2 |
| Separar dado mocado da UI num módulo próprio | Parte 2 |
| `FlatList`: `data`, `keyExtractor`, `renderItem` | Parte 3 |
| Operador ternário (`?:`) para estilo condicional | Parte 3 |
| Import relativo subindo mais de uma pasta (`../../`) | Parte 3 |
| Revisão: `props` de função (`aoLogar`) | Parte 4 |
| Revisão: navegação como estado (mais um valor no `if`) | Parte 4 |

---

## 7. Perguntas frequentes na hora da aula

**"De onde vêm essas tarefas de verdade?"**
De lugar nenhum ainda, é um mock: um array escrito à mão em
`src/data/tarefas.ts`. Quando existir uma API, só esse arquivo muda.

**"Por que `FlatList` e não só um `.map()` dentro de uma `View`?"**
Funcionaria para uma lista pequena, mas `FlatList` só desenha os itens
visíveis na tela, o que importa numa lista que pode crescer muito. E ela já
vem de fábrica, não é uma escolha "avançada".

**"Dá pra tocar numa tarefa e marcar como concluída?"**
Ainda não, `TAREFAS_MOCK` é uma constante importada, mudar um valor dela
não re-renderiza nada. Isso é exatamente o assunto da aula 5: colocar as
tarefas num `useState` lá no `App.tsx`.

**"Por que o `Alert` de bem-vindo ainda aparece antes de trocar de tela?"**
Decisão da aula: mostrar feedback e navegar não se excluem. Dá pra tirar o
`Alert` como exercício, mas não é o padrão desta aula.

---

## 8. Manutenção da apresentação

Todo o conteúdo está em
[`aula/aulas/listando-tarefas.js`](aula/aulas/listando-tarefas.js), um
arquivo só, no formato do [`_template.js`](aula/aulas/_template.js). Os
slides de conceito/desafio usam o campo `md` (Markdown); ver
[`shared/player/README.md`](../shared/player/README.md#o-campo-md-slides-de-conceitodesafio)
para a sintaxe suportada, atenção: **não há suporte a tabela nem a itálico
com asterisco simples** nos slides.

O ponto de partida da aula (o código da aula 3) fica em `INITIAL_FILES`, no
topo do arquivo. Se ele mudar, a aula inteira muda junto.

Depois de qualquer alteração no roteiro ou no código real, rode:

```bash
pnpm check-aula
```

Ele reconstrói `App.tsx`, `src/screens/LoginScreen.tsx`,
`src/screens/CadastroScreen.tsx`, `src/data/tarefas.ts` e
`src/screens/tarefas/ListaTarefasScreen.tsx` a partir de `INITIAL_FILES` +
as etapas, e compara byte a byte com os arquivos reais. Isso também valida
todas as âncoras `after`/`before` dos `insert`: se uma âncora não for
encontrada, o texto vai parar no fim do arquivo e o diff aponta na hora. Ver
[`aula/tools/check-sync.js`](aula/tools/check-sync.js).
