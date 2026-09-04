# Roteiro da Aula 3: Cadastro e navegação (React Native, sem libs externas)

Documento de apoio do professor para a apresentação interativa
[`aula/index.html`](aula/index.html).

---

## 1. Onde essa aula entra

A aula 2 terminou com uma tela de login pronta e um "por que não navega pra
lugar nenhum?" no ar. A resposta era: **ainda não existe outra tela**. Hoje
ela existe.

| | Aula 2 | Aula 3 |
|---|---|---|
| Ponto de partida | Projeto vazio | **Código da aula 2 já na árvore** |
| Escopo | Uma tela | Uma tela nova **+ a conversa entre as duas** |
| Conceito central | `useState` (estado local) | **`props`** (estado atravessando componentes) |
| Bibliotecas | Nenhuma | Nenhuma, **inclusive sem `@react-navigation`** |
| Formato | Digitação + 3 desafios | Digitação + **5 desafios** |

O motor de apresentação é o mesmo ([`aula/player/`](aula/player/)), sem
mudanças. A novidade é de uso, não de código: a aula usa o campo
`inicial.files` para **começar com arquivos prontos** em vez de um projeto
vazio.

### A decisão que define a aula: navegação na mão

Não usar `@react-navigation` aqui é escolha didática, não economia. A turma
vê que navegar é:

```tsx
const [tela, setTela] = useState('login');
if (tela === 'cadastro') return <CadastroScreen />;
return <LoginScreen />;
```

Quando a biblioteca aparecer numa aula futura, ela vira uma **conveniência
compreendida** (pilha de telas, botão de voltar, animação, histórico) em
cima de um mecanismo que já não é mistério. Vale dizer isso em voz alta na
Parte 3, a turma costuma perguntar "mas o certo não é usar a biblioteca?".

---

## 2. Como usar a apresentação

Abra `aula/index.html` no navegador (duplo clique), tela cheia (`F11`).
Mesmos atalhos: `→`/`Espaço`/`Enter` avança, `←`/`Backspace` volta,
`↑`/`↓` mudam a velocidade da digitação, clique na barra de progresso pula
direto para um ponto.

`C` recolhe o cabeçalho e `R` esconde o rodapé com a nota didática, úteis
em projetor de baixa resolução. Os dois têm botão na topbar (`⤒` e `⤓`) e o
estado fica salvo entre apresentações.

**Novo nesta aula:** clique nos arquivos da barra lateral para abrir o
código da aula 2 durante o recap (etapa 2). O player mostra o arquivo
escolhido com a marca `(visualizando)`; a próxima seta volta a seguir a
etapa normalmente.

### Os cartões de desafio

Quando aparecer um cartão **roxo** com "🧩 Desafio":

1. **Pare de apertar seta.** Leia o enunciado em voz alta.
2. Dê à turma o tempo do selo (4–8 min) para tentar no próprio Snack.
3. Circule, veja quem travou, dê a dica que já está no rodapé do cartão.
4. Só depois avance: as etapas `code`/`insert` seguintes digitam a solução
   oficial, a turma **compara** com o que fez, não copia do zero.

---

## 3. Estrutura da aula, 48 etapas em 6 partes

| # | Parte | Etapas | O que entrega |
|---|---|---|---|
| 1 | De onde partimos | 2 | Recap do código da aula 2 |
| 2 | Tela de cadastro | 6 | `CadastroScreen.tsx` visual + 4 campos controlados, **desafio grande** |
| 3 | Navegação | 21 | `useState` no `App`, `if`, props de função, **2 desafios** |
| 4 | Validação | 6 | `handleCadastrar` com 3 regras, **desafio** |
| 5 | Conta de verdade | 12 | Dados subindo, login validando, **desafio** |
| 6 | Fechamento | 1 | Recap + 6 desafios pra casa |

**5 desafios ao vivo**, ~29 min só de desafio. Duração sugerida:
**70–90 min** com os desafios valendo tempo real.

### Se o tempo apertar
**A aula está completa no fim da Parte 4.** Duas telas, navegação nos dois
sentidos e cadastro validado, é uma entrega redonda.

A Parte 5 ("conta de verdade") é o fecho bonito, não o essencial: ela existe
para tirar a mentira do alerta "Conta criada!" e mostrar dado subindo por
prop. Se sobrar pouco tempo, mostre o resultado pronto e mande a Parte 5
como exercício. **Não corte os desafios**: são o formato, não o enfeite.

---

## 4. O que cada parte ensina

### Parte 1: De onde partimos
Abra os dois arquivos na barra lateral e releia o código da aula passada com
a turma. Ponto a martelar: **`App.tsx` tem três linhas e nenhuma decisão**: é ele que mais muda hoje.

Quem faltou na aula 2 (ou perdeu o Snack) precisa desses dois arquivos: eles
estão neste repositório, e o código aparece na íntegra na etapa 2 da
apresentação.

### Parte 2: Tela de cadastro
Desafio de 8 min, o maior da aula, e o mais fácil, porque é **100%
revisão**: quatro `useState`, quatro campos controlados, um `StyleSheet`
copiado. Nenhum componente novo.

> **Fale sobre:** copiar o próprio código anterior é o jeito certo de
> trabalhar. E assuma a duplicação do `StyleSheet` na hora, vira o primeiro
> desafio de casa.

### Parte 3: Navegação (o coração da aula)
Três movimentos, nessa ordem:

1. **O problema**: a tela existe, está salva, e ninguém a vê. Porque
   `App.tsx` só renderiza `<LoginScreen />`.
2. **O mecanismo**: `useState` guardando o nome da tela + `if`. Demonstrado
   pelo professor. Depois, o **teste na marra**: trocar `useState('login')`
   por `useState('cadastro')` à mão e ver a tela mudar. Isso prova que
   funciona e deixa óbvio o que falta: o usuário não tem como fazer isso.
3. **Props**: o `App` entrega uma função pronta (`aoCriarConta={() =>
   setTela('cadastro')}`) e a tela só chama. Explicado, depois desafio; e o
   caminho de volta (`aoVoltar`) é desafio puro, sem conceito novo.

> **Fale sobre:** a regra de ouro, **dado desce, aviso sobe**. O filho nunca
> mexe no estado do pai; ele chama a função que o pai entregou.

> **Fale sobre:** `onPress={aoCriarConta}` sem `()`. Com `()` a função rodaria
> na montagem da tela, e o app trocaria de tela sozinho, em loop. É o mesmo
> erro da aula 2, agora com consequência visível e engraçada.

> **Fale sobre (no teste final da parte):** digite algo no cadastro, volte
> pro login, entre no cadastro de novo, os campos estão vazios. O
> `CadastroScreen` foi **desmontado** e o `useState` dele foi junto. Esse
> comentário é o gancho da Parte 5.

### Parte 4: Validação do cadastro
Três regras em sequência, cada uma com `Alert` e `return` próprios:
campos vazios → `senha.length < 4` → `senha !== confirmarSenha`.

> **Fale sobre:** a terceira regra compara **dois estados entre si**, coisa
> que o login nunca precisou. E o formato "valida, avisa, `return`" dispensa
> `else`: se chegou na última linha, passou por tudo.

> **Fale sobre:** `!==` e `===` com três sinais, sempre. Os de dois fazem
> conversão silenciosa.

O teste desta parte termina com a provocação certa: o alerta diz "Conta
criada!" e **nada foi criado**. Volte ao login e entre com qualquer coisa:
funciona. É a deixa da Parte 5.

### Parte 5: A conta criada de verdade
O estado `conta` sobe para o `App.tsx` (o único componente que não é
desmontado ao trocar de tela) e desce de novo como prop para o login.

Duas novidades pequenas:
- A prop de função agora **recebe parâmetros**:
  `aoCadastrar: (usuario: string, senha: string) => void`.
- O estado pode ser um **objeto**: `useState({ usuario: '', senha: '' })`.

> **Fale sobre:** isso tem nome, **elevar o estado** (*lifting state up*).
> Quando dois componentes precisam do mesmo dado, ele sobe para o pai comum.

> **Fale sobre:** a conta some quando o app fecha. Memória permanente
> (`AsyncStorage`, banco) é assunto de outra aula, e é bom deixar isso
> explícito para ninguém achar que "cadastrou de verdade".

### Parte 6: Fechamento
Recap e 6 desafios pra casa. O de número 4 (uma `HomeScreen` aberta após o
login) é o mais valioso: mostra que a navegação criada hoje **escala**: mais um valor no estado `tela`, mais um `if`.

---

## 5. Estrutura final do projeto

```
App.tsx                       estado da tela + estado da conta + navegação
src/
  screens/
    LoginScreen.tsx           props (conta, aoCriarConta) + validação contra a conta
    CadastroScreen.tsx        props (aoCadastrar, aoVoltar) + 4 campos + 3 regras
```

Nenhuma dependência declarada além do que o Expo Snack já cria.

---

## 6. Conceitos cobertos

| Conceito | Onde aparece |
|---|---|
| Revisão: `useState` e componente controlado | Parte 2 (desafio inteiro) |
| Renderização condicional (`if` + `return` no componente) | Parte 3 |
| Navegação como estado | Parte 3 |
| `props` de função (arrow function inline) | Parte 3 |
| `type Props` do TypeScript | Partes 3 e 5 |
| Desestruturação nos parâmetros (`{ aoVoltar }: Props`) | Partes 3 e 5 |
| Ciclo de vida: componente desmontado perde o estado | Parte 3 (teste) |
| Validação com várias regras em sequência | Parte 4 |
| `.length` de string, `!==` estrito | Parte 4 |
| `props` de função **com parâmetros** (dado subindo) | Parte 5 |
| Estado como objeto | Parte 5 |
| Elevar o estado (*lifting state up*) | Parte 5 |
| `props` de dado, acesso com ponto (`conta.usuario`) | Parte 5 |

---

## 7. Perguntas frequentes na hora da aula

**"Mas o certo não é usar `@react-navigation`?"**
Em app de produção, normalmente sim. Aqui a gente faz na mão para entender o
que ela faz, e ela vai aparecer numa aula futura, quando o mecanismo já não
for mistério. Note que a versão manual não tem botão de voltar do sistema,
animação nem histórico: é exatamente o que a biblioteca dá de brinde.

**"Perdi o Snack da aula passada."**
Os dois arquivos da aula 2 aparecem na íntegra na etapa 2 da apresentação e
estão neste repositório. Dá para colar e seguir.

**"Meu app trocou de tela sozinho, sem parar."**
`onPress={aoCriarConta()}` com parênteses. Tire os parênteses.

**"Digitei no cadastro, voltei pro login e perdi o que digitei."**
Não é bug, é o comportamento correto. Ao trocar de tela o componente é
desmontado e o `useState` dele vai junto. É justamente o problema que a
Parte 5 resolve, colocando o dado no `App.tsx`.

**"Cadastrei, fechei o app, e a conta sumiu."**
Também correto. O estado vive na memória enquanto o app está aberto. Guardar
de verdade é `AsyncStorage` ou banco, assunto de outra aula.

**"Posso deixar o botão de cadastrar desabilitado até preencher tudo?"**
Pode, e é um ótimo mini-desafio bônus, mas não faz parte do arquivo final
desta aula.

---

## 8. Manutenção da apresentação

Todo o conteúdo está em
[`aula/aulas/cadastro-navegacao.js`](aula/aulas/cadastro-navegacao.js), um
arquivo só, no formato do [`_template.js`](aula/aulas/_template.js). Os
slides de conceito/desafio usam o campo `md` (Markdown); ver
[`aula/player/README.md`](aula/player/README.md#o-campo-md-slides-de-conceitodesafio)
para a sintaxe suportada, atenção: **não há suporte a tabela nem a itálico
com asterisco simples** nos slides.

O ponto de partida da aula (o código da aula 2) fica em `INITIAL_FILES`, no
topo do arquivo. Se ele mudar, a aula inteira muda junto.

Depois de qualquer alteração no roteiro ou no código real, rode:

```bash
pnpm check-aula
```

Ele reconstrói `App.tsx`, `src/screens/LoginScreen.tsx` e
`src/screens/CadastroScreen.tsx` a partir de `INITIAL_FILES` + as etapas, e
compara byte a byte com os arquivos reais. Isso também valida todas as
âncoras `after`/`before` dos `insert`: se uma âncora não for encontrada, o
texto vai parar no fim do arquivo e o diff aponta na hora. Ver
[`aula/tools/check-sync.js`](aula/tools/check-sync.js).
