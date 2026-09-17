# Roteiro: Navegando entre telas (React Navigation)

Documento de apoio do professor para a apresentação interativa
[`aula/index.html`](aula/index.html).

---

## 1. Onde essa aula entra

A aula 3 terminou com três telas funcionando (Login, Cadastro e Lista de
tarefas) e uma navegação improvisada: `useState('tela')` mais uma fila de
`if` no `App.tsx`. Hoje essa improvisação vira navegação de verdade.

| | Aula 3 | Aula 4 |
|---|---|---|
| Ponto de partida | Projeto vazio | **Código da aula 3 já na árvore** |
| Escopo | Mostrar uma lista | Trocar de tela do jeito certo |
| Conceito central | `FlatList` | **`navigation.navigate`** e a pilha |
| Bibliotecas | Nenhuma | **React Navigation**, a primeira do curso |
| Formato | Digitação + desafios | **Teoria primeiro**, depois digitação |

O motor de apresentação é o mesmo ([`shared/player/`](../shared/player/)).
A única mudança nele foi a operação `replace`, criada para esta aula: ela
edita um trecho de um arquivo existente no lugar, em vez de esvaziar o
arquivo e redigitar tudo. As aulas anteriores não usam e continuam
funcionando igual.

### A decisão que define a aula: quatro slides de teoria antes de digitar

As aulas anteriores começam a digitar cedo. Essa não: a Parte 2 são
**quatro slides seguidos de conceito**, sem uma linha de código do
projeto. O motivo é que navegação é o primeiro assunto do curso em que o
aluno precisa de um **modelo mental** (a pilha) antes do código, senão
`navigate`, `push`, `replace` e `goBack` viram quatro nomes decorados sem
diferença clara entre eles.

Use o modo slide a favor: o cabeçalho e a barra lateral somem, dá pra
falar olhando a turma. Se ela estiver ansiosa pra digitar, avise no começo
que os primeiros 15 minutos são de quadro, não de teclado.

### A segunda decisão: ajustar o código existente, não redigitar

As três telas já existem desde as aulas anteriores, e é assim que elas
aparecem na apresentação: inteiras, na tela, sendo **editadas ponto a
ponto**. Cada etapa do código troca um trecho específico (a linha antiga
some e a nova é digitada no lugar dela), que é exatamente o que a turma vai
fazer no próprio editor. Nenhum arquivo é apagado e redigitado do zero.

Isso muda o que dizer em cada etapa: a pergunta deixa de ser "o que estou
escrevendo" e passa a ser **"o que essa linha era antes, e por que ela
muda"**. Vale pausar meio segundo antes de avançar e deixar a turma ler a
linha que vai sumir.

Só o `src/navigation/tipos.ts` é criado do zero, porque é o único arquivo
que não existia.

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
o recap (etapa 2). Na etapa 8 (o slide de instalação) as quatro
dependências novas acendem na lateral.

### Os cartões de desafio

Quando aparecer um cartão **roxo** com "Desafio":

1. **Pare de apertar seta.** Leia o enunciado em voz alta.
2. Dê à turma o tempo do selo (6–7 min) para tentar no próprio Snack.
3. Circule, veja quem travou, dê a dica que já está no rodapé do cartão.
4. Só depois avance: as etapas seguintes aplicam a solução oficial no
   código, a turma **compara** com o que fez, não copia do zero.

---

## 3. Estrutura da aula, 42 etapas em 6 partes

| # | Parte | O que entrega |
|---|---|---|
| 1 | De onde partimos | Recap da navegação manual e seus cinco limites |
| 2 | Teoria: a pilha | Pilha, as três peças, a prop `navigation`, params |
| 3 | Instalando | `npx expo install` das quatro dependências |
| 4 | O mapa de rotas | `tipos.ts` novo + `App.tsx` ajustado, **desafio** |
| 5 | As telas navegam | As três telas usando `navigation`, **2 desafios** |
| 6 | Fechamento | Teste do fluxo + recap + 5 desafios pra casa |

**3 desafios ao vivo**, ~20 min só de desafio. Duração sugerida:
**70–85 min** com os desafios valendo tempo real.

### Se o tempo apertar
**A aula está completa no fim da Parte 5.** O que dá pra comprimir é a
Parte 5: os ajustes do Cadastro e da Lista são repetição do padrão do
Login, dá pra transformar o terceiro desafio em demonstração guiada. O que
**não** vale cortar é a Parte 2, a aula inteira depende dela.

---

## 4. O que cada parte ensina

### Parte 1: De onde partimos
Abra o `App.tsx` na barra lateral e releia a navegação manual. Ponto a
martelar: **não existe "tela anterior"**, existe uma string no estado. Os
cinco limites do segundo slide não são defeito de quem escreveu, são o
limite do próprio arranjo.

> **Fale sobre:** o botão físico de voltar do Android. É o argumento que
> convence mais rápido, porque a turma sente o app "errado" na hora.

### Parte 2: Teoria (o coração da aula)
Quatro slides, nenhuma linha digitada. Se der, desenhe a pilha no quadro
junto com o slide.

> **Fale sobre:** a pilha guarda telas **vivas**, não uma foto. Quando o
> usuário volta, a tela anterior reaparece com o texto digitado e a
> rolagem onde estavam, ela nunca foi destruída. Isso explica por que a
> navegação manual parecia funcionar mas perdia tudo.

> **Fale sobre:** `navigate` vs `push`. `navigate('Login')` com o Login já
> na pilha **volta** até ele em vez de criar um segundo Login. É por isso
> que o cadastro consegue devolver a conta pro login que já existia.

> **Fale sobre:** `replace` e `popToTop` como "as duas formas de fechar
> uma tela pra sempre". `replace` troca a atual, `popToTop` esvazia a
> pilha até a primeira. Fluxo de login costuma usar um dos dois.

> **Fale sobre:** params são **dado pequeno de rota** (id, nome, filtro),
> não gerenciamento de estado. A conta cabe; a lista de tarefas não
> caberia. Esse é o gancho honesto pra próxima aula.

### Parte 3: Instalando
Primeira dependência externa do curso, vale marcar o momento.

> **Fale sobre:** `npx expo install` versus `npm install`. O primeiro
> pergunta ao SDK do projeto qual versão é compatível; o segundo pega a
> mais nova, que pode exigir uma versão de React Native que o projeto não
> tem. É o erro número um de quem está começando com Expo.

> **Fale sobre:** por que quatro pacotes e não um. `native-stack` usa a
> navegação **nativa** do sistema, e é isso que exige `react-native-screens`
> e `react-native-safe-area-context`.

### Parte 4: O mapa de rotas
O `App.tsx` encolhe e muda de natureza: de imperativo ("se o estado é X,
mostre Y") pra declarativo ("estas são as rotas do app").

> **Fale sobre:** `createNativeStackNavigator()` fora do componente. Se
> ficasse dentro, cada renderização criaria uma pilha nova e a navegação
> se perderia. É o mesmo raciocínio do `StyleSheet.create`, que também
> mora fora.

> **Fale sobre:** `RootStackParamList`. Sem ele, `navigate('Lst')`
> compila e falha no celular. Com ele, o editor sublinha o erro na hora e
> ainda completa os nomes das rotas sozinho.

Aviso esperado: depois desta parte o TypeScript reclama das três telas,
que ainda pedem props que ninguém passa. Diga isso **antes** de alguém
levantar a mão.

### Parte 5: As telas navegam
Repetição proposital do mesmo padrão três vezes: tipo da prop, assinatura,
troca dos callbacks.

> **Fale sobre:** a linha que resume a aula,
> `navigation.navigate('Login', { usuario, senha })` no cadastro. O dado
> não sobe pro pai nem desce de volta: ele viaja **junto com a
> navegação**. Foi isso que apagou o `useState` de `conta` do `App.tsx`.

> **Fale sobre:** a `ListaTarefasScreen` importando `TAREFAS_MOCK` direto.
> Assuma em voz alta que é uma regressão: a tela virou rota e perdeu o pai
> que passava props. Compartilhar estado entre rotas é exatamente o
> assunto da próxima aula, e a turma acabou de sentir a falta.

### Parte 6: Fechamento
O teste final percorre o fluxo inteiro pensando na pilha a cada passo.
Peça pra turma **prever** o que vai acontecer antes de tocar, sobretudo no
passo 3 (o `navigate` que volta pro Login com params) e no passo 5 (o
`popToTop` preservando a conta cadastrada).

---

## 5. Estrutura final do projeto

```
App.tsx                                   só o mapa de rotas, sem estado e sem if
src/
  data/
    tarefas.ts                            inalterado desde a aula 3
  navigation/
    tipos.ts                              RootStackParamList (arquivo novo)
  screens/
    LoginScreen.tsx                       navigation + route.params
    CadastroScreen.tsx                    navigate('Login', { usuario, senha })
    tarefas/
      ListaTarefasScreen.tsx              navigation.popToTop(), mock importado
```

Quatro dependências novas no `package.json`.

---

## 6. Conceitos cobertos

| Conceito | Onde aparece |
|---|---|
| Pilha de navegação (empilhar/desempilhar) | Parte 2 |
| `NavigationContainer`, `Stack.Navigator`, `Stack.Screen` | Partes 2 e 4 |
| `navigation.navigate`, `goBack`, `push`, `replace`, `popToTop` | Partes 2 e 5 |
| Params de rota (`route.params`) | Partes 2 e 5 |
| `options`: `title`, `headerShown`, `headerBackVisible` | Parte 4 |
| `npx expo install` e por que não `npm install` | Parte 3 |
| Rotas tipadas: `RootStackParamList`, `NativeStackScreenProps` | Partes 4 e 5 |
| Union type (`{ ... } \| undefined`) | Parte 4 |

---

## 7. Perguntas frequentes na hora da aula

**"Qual a diferença entre `navigate` e `push`?"**
`push` empilha sempre. `navigate` só empilha se a rota ainda não estiver
na pilha; se já estiver, ele **volta** até ela. Em um app com telas
distintas (o caso de hoje), os dois parecem iguais. A diferença aparece em
tela de detalhe que abre outra tela de detalhe: com `navigate` o app
ficaria preso na primeira.

**"Por que a tela de login continua mostrando o usuário certo depois de
sair?"**
Porque "sair" é `popToTop()`, que desempilha tudo **menos** a primeira
tela. A rota Login nunca saiu da pilha, e os params que o cadastro entregou
continuam nela.

**"Dá pra navegar de um componente que não é uma tela?"**
Dá, com o hook `useNavigation`, que pega a `navigation` do navigator mais
próximo sem receber nada por prop. É o desafio de casa número 5.

**"Por que a lista de tarefas voltou a importar o mock direto?"**
Porque o `App.tsx` não tem mais estado pra passar: quem cria a tela agora
é o `Stack.Screen`, não o `App`. Passar dado entre rotas irmãs é o assunto
da próxima aula (Context). Params resolvem dado pequeno, não estado
compartilhado.

**"Preciso instalar tudo isso no Snack também?"**
Não. O Snack lê os imports e resolve as dependências sozinho. A instalação
manual vale pro projeto local, com `npx expo start`.

---

## 8. Manutenção da apresentação

Todo o conteúdo está em
[`aula/aulas/usando-react-navigation.js`](aula/aulas/usando-react-navigation.js),
um arquivo só, no formato do [`_template.js`](aula/aulas/_template.js). Os
slides de conceito/desafio usam o campo `md` (Markdown); ver
[`shared/player/README.md`](../shared/player/README.md#o-campo-md-slides-de-conceitodesafio)
para a sintaxe suportada, atenção: **não há suporte a tabela nem a itálico
com asterisco simples** nos slides.

Quase todas as etapas de código são `replace` (`{file, find, code}`): o
trecho de `find` some do arquivo e o de `code` é digitado no lugar dele.
`find` é **texto literal** e vale a primeira ocorrência, então precisa ser
único no arquivo, inclusive com o `\n` final quando a ideia é trocar a
linha inteira. Uma etapa sem `code` só remove o trecho. Se o `find` não
existir mais (porque o código real mudou), a etapa não faz nada e o
`check-sync` aponta a divergência.

O ponto de partida da aula (o código da aula 3) fica em `INITIAL_FILES`, no
topo do arquivo. As quatro dependências novas ficam em `DEPS`, e `DEP_STEP`
é o índice da etapa a partir da qual elas acendem na lateral (hoje 7, o
slide de instalação). Se uma etapa for inserida antes dele, ajuste o
número.

Depois de qualquer alteração no roteiro ou no código real, rode:

```bash
pnpm check-aula
```

Ele reconstrói `App.tsx`, `src/navigation/tipos.ts`, `src/data/tarefas.ts`
e as três telas a partir de `INITIAL_FILES` + as etapas, compara byte a
byte com os arquivos reais e ainda confere se as dependências declaradas
na aula batem com o `package.json`. Ver
[`aula/tools/check-sync.js`](aula/tools/check-sync.js).
