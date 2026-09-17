# Roteiro: Editando tarefas (React Native, sem libs externas)

Documento de apoio do professor para a apresentação interativa
[`aula/index.html`](aula/index.html).

---

## 1. Onde essa aula entra

A aula 4 terminou com uma listagem de tarefas funcionando, mas só leitura:
o dado vem de uma constante importada (`TAREFAS_MOCK`) direto na prop da
tela. Hoje essa lista vira editável de verdade.

| | Aula 4 | Aula 5 |
|---|---|---|
| Ponto de partida | Projeto vazio | **Código da aula 4 já na árvore** |
| Escopo | Mostrar uma lista | Criar, editar e excluir um item dela |
| Conceito central | `FlatList` | **Lista como estado**, atualização imutável |
| Bibliotecas | Nenhuma | Nenhuma, tudo com `useState` + métodos de array |
| Formato | Digitação + 3 desafios | Digitação + **3 desafios** |

O motor de apresentação é o mesmo ([`shared/player/`](../shared/player/)),
sem mudanças. A novidade é de conteúdo: primeira vez que a turma **muda**
uma lista guardada em estado, em vez de só mostrá-la.

### A decisão que define a aula: reescrever em vez de remendar

`App.tsx` e `ListaTarefasScreen.tsx` acumulam mudanças demais pra ir só
inserindo trechos pontuais: ambos são **limpos e reescritos por completo**
durante a aula (etapas `clear` seguidas de `code`), em vez de uma sequência
longa de inserções cirúrgicas. O resultado final é o mesmo, mas o caminho é
mais legível pra quem acompanha digitando.

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
o recap (etapa 2). O player mostra o arquivo escolhido com a marca
`(visualizando)`; a próxima seta volta a seguir a etapa normalmente.

### Os cartões de desafio

Quando aparecer um cartão **roxo** com "Desafio":

1. **Pare de apertar seta.** Leia o enunciado em voz alta.
2. Dê à turma o tempo do selo (6–8 min) para tentar no próprio Snack.
3. Circule, veja quem travou, dê a dica que já está no rodapé do cartão.
4. Só depois avance: as etapas `clear`/`code` seguintes digitam a solução
   oficial, a turma **compara** com o que fez, não copia do zero.

---

## 3. Estrutura da aula, ~30 etapas em 6 partes

| # | Parte | O que entrega |
|---|---|---|
| 1 | De onde partimos | Recap do código da aula 4 |
| 2 | Formulário de tarefa | `FormularioTarefaScreen.tsx`, **desafio** |
| 3 | Tarefas viram estado | `useState` + 3 funções no `App`, **desafio** |
| 4 | Lista aciona o CRUD | Botões na `ListaTarefasScreen`, **desafio** |
| 5 | Conectando tudo | `if` do formulário + props na lista |
| 6 | Fechamento | Recap + 5 desafios pra casa |

**3 desafios ao vivo**, ~21 min só de desafio. Duração sugerida:
**70–85 min** com os desafios valendo tempo real.

### Se o tempo apertar
**A aula está completa no fim da Parte 5.** Criar, editar, concluir e
excluir funcionando é uma entrega redonda. Se sobrar pouco tempo, a Parte 4
(botões da lista) pode ser mais guiada, com desafio menor.

---

## 4. O que cada parte ensina

### Parte 1: De onde partimos
Abra os arquivos na barra lateral e releia o código da aula passada.
Ponto a martelar: **a lista funciona, mas é uma fotografia parada**, o
mesmo `TAREFAS_MOCK` sempre, porque é uma constante, não um estado.

### Parte 2: Formulário de tarefa
Introduz reaproveitar **um** componente pra **dois** modos, via uma prop
que pode ser `null`. É a primeira vez que a turma vê um union type
(`Tarefa | null`) e usa esse valor pra decidir tanto o texto da tela quanto
o valor inicial de um campo.

> **Fale sobre:** por que não fazer duas telas quase iguais. Menos código
> pra manter, um só lugar onde a validação do título existe.

### Parte 3: Tarefas viram estado (o coração da aula)
O ponto mais denso: `useState(TAREFAS_MOCK)` troca a constante por estado,
e três funções (`salvarTarefa`, `alternarConcluida`, `excluirTarefa`)
manipulam essa lista **sem nunca mutar o array original**.

> **Fale sobre:** por que não mutar (`tarefas[i].titulo = x`,
> `tarefas.push(x)`). O React decide re-renderizar comparando a
> **referência** do array com a anterior; mutar no lugar mantém a mesma
> referência, e o React simplesmente não percebe a mudança.

> **Fale sobre:** o spread em dois contextos diferentes,
> `{ ...tarefa, titulo }` (copia um objeto, sobrescreve um campo) e
> `[...tarefas, novaTarefa]` (copia um array, acrescenta um item). Mesmo
> símbolo, mesma ideia, "espalha o que já existe aqui dentro".

> **Fale sobre:** `useState<Tarefa | null>(null)`. Sem o `<Tarefa | null>`
> explícito, o TypeScript enxergaria o tipo do estado como `null` pra
> sempre, e reclamaria na primeira vez que a turma tentasse guardar uma
> tarefa ali.

### Parte 4: Lista aciona o CRUD
A `ListaTarefasScreen` ganha os botões que faltavam. Ponto de atenção de
UI, não de lógica: três `TouchableOpacity` **lado a lado**, não aninhados.

> **Fale sobre:** por que não aninhar tocáveis. Um `TouchableOpacity`
> dentro de outro cria ambiguidade sobre quem deveria responder ao toque, o
> app do dia evita o problema simplesmente não fazendo isso.

> **Fale sobre:** a forma de `Alert.alert` com lista de botões, primeira
> vez no curso. `style: 'destructive'` é só visual (deixa o botão vermelho
> no iOS), quem decide o que acontece é sempre o `onPress` de cada botão.

### Parte 5: Conectando tudo
Menos desafio, mais demonstração: o `App.tsx` ganha o `if` do formulário e
a chamada de `ListaTarefasScreen` passa a receber `tarefas={tarefas}` (o
estado) no lugar de `tarefas={TAREFAS_MOCK}` (a constante), junto das
quatro novas props de ação.

> **Fale sobre:** essa troca de uma palavra (`TAREFAS_MOCK` → `tarefas`) é
> o momento em que a lista "acorda". Vale destacar isso explicitamente,
> é fácil passar batido.

O teste final percorre as quatro operações em sequência: criar, editar,
alternar status, excluir com confirmação.

### Parte 6: Fechamento
Recap e 5 desafios pra casa. O de número 5 é o gancho pra uma aula futura
sobre persistência (`AsyncStorage`): a turma já vai ter sentido, no teste
final, que fechar o app apaga tudo.

---

## 5. Estrutura final do projeto

```
App.tsx                                   estado da tela + conta + tarefas + navegação
src/
  data/
    tarefas.ts                            inalterado desde a aula 4
  screens/
    LoginScreen.tsx                       inalterado desde a aula 4
    CadastroScreen.tsx                    inalterado desde a aula 3
    tarefas/
      ListaTarefasScreen.tsx              6 props, 3 ações por item
      FormularioTarefaScreen.tsx          reaproveitada pra criar e editar
```

Nenhuma dependência declarada além do que o Expo Snack já cria.

---

## 6. Conceitos cobertos

| Conceito | Onde aparece |
|---|---|
| Union type (`Tarefa \| null`) | Parte 2 |
| Reaproveitar um componente para dois modos via prop | Parte 2 |
| Lista como estado (`useState` com um array) | Parte 3 |
| Atualização imutável: `.map()`, `.filter()`, spread | Parte 3 |
| `useState<T>` com tipo genérico explícito | Parte 3 |
| `Alert.alert` com lista de botões e `style: 'destructive'` | Parte 4 |
| Evitar `TouchableOpacity` aninhado | Parte 4 |
| Revisão: mais um valor no estado de navegação | Parte 5 |

---

## 7. Perguntas frequentes na hora da aula

**"Por que não dá só `tarefas.push(novaTarefa)` e pronto?"**
Dá pra escrever, mas o React não vai re-renderizar a tela: ele compara a
referência do array antes e depois, e `push` muda o array **no lugar**,
sem criar uma referência nova. `[...tarefas, novaTarefa]` cria um array
novo, e é essa referência nova que avisa o React que algo mudou.

**"As tarefas ficam salvas se eu fechar o app?"**
Não, tudo em `useState` vive na memória enquanto o app está aberto.
Persistência de verdade (`AsyncStorage`, banco, API) é assunto de outra
aula, é literalmente o desafio avançado de hoje.

**"Por que o formulário de criar e o de editar são a mesma tela?"**
Porque são quase idênticos, o único jeito de diferenciar é se existe uma
`tarefaEditando` ou não. Duas telas quase iguais seriam duplicação sem
necessidade.

**"Dá pra editar mais de um campo, tipo uma descrição?"**
Dá, é o primeiro desafio de casa. O padrão é o mesmo: mais um `useState`
no formulário, mais um campo no tipo `Tarefa`, e incluir esse campo no
`aoSalvar`.

---

## 8. Manutenção da apresentação

Todo o conteúdo está em
[`aula/aulas/editando-tarefas.js`](aula/aulas/editando-tarefas.js), um
arquivo só, no formato do [`_template.js`](aula/aulas/_template.js). Os
slides de conceito/desafio usam o campo `md` (Markdown); ver
[`shared/player/README.md`](../shared/player/README.md#o-campo-md-slides-de-conceitodesafio)
para a sintaxe suportada, atenção: **não há suporte a tabela nem a itálico
com asterisco simples** nos slides.

O ponto de partida da aula (o código da aula 4) fica em `INITIAL_FILES`, no
topo do arquivo. Se ele mudar, a aula inteira muda junto.

Depois de qualquer alteração no roteiro ou no código real, rode:

```bash
pnpm check-aula
```

Ele reconstrói `App.tsx`, `src/data/tarefas.ts`,
`src/screens/LoginScreen.tsx`, `src/screens/CadastroScreen.tsx`,
`src/screens/tarefas/ListaTarefasScreen.tsx` e
`src/screens/tarefas/FormularioTarefaScreen.tsx` a partir de
`INITIAL_FILES` + as etapas, e compara byte a byte com os arquivos reais.
Isso também valida todas as âncoras `after`/`before` dos `insert` (e os
`target` dos `clear`): se uma âncora não for encontrada, o texto vai parar
no fim do arquivo e o diff aponta na hora. Ver
[`aula/tools/check-sync.js`](aula/tools/check-sync.js).
