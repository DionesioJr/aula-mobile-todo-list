# Roteiro da Aula 2 — Tela de Login (React Native, sem libs externas)

Documento de apoio do professor para a apresentação interativa
[`aula/index.html`](aula/index.html).

---

## 1. O que mudou em relação à aula 1

A aula 1 (todo list completo, 5 telas, navegação, `DateTimePicker`) levou
**3 horas de digitação contínua** e a turma saiu cansada, sem absorver o
conteúdo — o problema não era só o tamanho, era o formato: ninguém parava
para pensar, só copiava.

Duas mudanças, não uma:

| | Aula 1 | Aula 2 |
|---|---|---|
| Escopo | App inteiro (5 telas, navegação) | **Só a tela de Login** |
| Bibliotecas | `react-navigation`, `datetimepicker`, `react-native-paper` | **Nenhuma** — só o que o RN já traz |
| Formato | Digitação contínua, aluno só copia | **Etapas de digitação + pausas de desafio**, aluno tenta antes de ver |
| Estado | Os dois campos ganham `useState` juntos | **Progressivo**: sem estado → 1 campo → 2 campos → validação |

O motor de apresentação é o mesmo ([`aula/player/`](aula/player/)), com duas
adições:

- Um tipo de etapa novo: **`challenge`** (cartão roxo, com selo de tempo sugerido).
- Os cartões de conceito (`intro`/`note`/`outro`/`challenge`) agora abrem em
  **tela cheia** — sidebar, abas e faixa de ação somem — e o conteúdo é escrito
  em **Markdown** (campo `md`), não mais em HTML na mão. Isso evita que uma
  explicação mais longa fique espremida no espaço do editor de código.

---

## 2. Como usar a apresentação

Abra `aula/index.html` no navegador (duplo clique), tela cheia (`F11`).
Mesmos atalhos da aula 1: `→`/`Espaço`/`Enter` avança, `←`/`Backspace` volta,
`↑`/`↓` mudam a velocidade da digitação, clique na barra de progresso pula
direto para um ponto.

**Tela pequena ou projetor com pouca resolução?** `C` recolhe o cabeçalho
(fica só a marca do projeto sumindo — os botões continuam ali) e `R` esconde
o rodapé com a nota didática. Os dois têm botão equivalente na topbar (`⤒`
e `⤓`, ao lado do toggle do Explorer). O estado fica salvo entre uma
apresentação e outra.

### O cartão de desafio

Quando aparecer um cartão **roxo** com "🧩 Desafio" no canto:

1. **Pare de apertar seta.** Leia o enunciado em voz alta.
2. Dê à turma o tempo sugerido no selo (3–5 min) para tentar no próprio
   Snack — sozinhos ou em dupla.
3. Circule, veja quem travou, dê uma dica pontual (o cartão já tem uma).
4. Só depois avance: as próximas etapas `code`/`insert` digitam a solução
   "oficial" — a turma compara com o que tentou, não copia do zero.

Isso é o oposto da aula 1: lá, a digitação vinha primeiro e era a única
fonte de código. Aqui, a digitação é a **conferência**, não a primeira vez
que o aluno vê o problema.

---

## 3. Estrutura da aula — 27 etapas em 6 partes

| # | Parte | O que entrega |
|---|---|---|
| 1 | Preparação | Projeto vazio, pasta `src/screens` |
| 2 | Tela estática | `LoginScreen.tsx` visual (sem estado) + `App.tsx` — **Teste 1** |
| 3 | Estado: usuário | Campo usuário controlado (demonstrado) |
| 4 | Estado: senha | Campo senha controlado (**desafio**) |
| 5 | Login e validação | `handleLogin` com `Alert` (**desafio**) — **Teste final** |
| 6 | Fechamento | Recap + 5 desafios pra casa |

**3 desafios ao vivo**, cada um resolvido só com o que já apareceu na tela
até aquele ponto. Duração sugerida: **45–70 min** com os desafios valendo
tempo real (3–5 min cada) — bem menos que as 3 horas da aula 1.

### Se o tempo apertar
A tela funciona (visualmente) desde o fim da Parte 2. Se sobrar pouco tempo,
dá pra pular direto pro final da Parte 5 e mostrar o resultado pronto,
deixando os desafios como exercício de casa — mas o ideal é não cortar os
desafios, são o ponto principal da mudança de formato.

---

## 4. O que cada parte ensina

### Parte 1 — Preparação
Abrir o Snack (ou reaproveitar o da aula 1), criar `src/screens/LoginScreen.tsx`
vazio. Sem `package.json` para editar — não há dependência nova.

### Parte 2 — Tela estática (sem estado)
`View`, `Text`, `TextInput`, `TouchableOpacity`, `StyleSheet`. O desafio
aqui é **antes** do código: a turma monta a estrutura visual sozinha, sem
nenhum `useState`. Só depois vem a digitação (imports, componente, estilos)
e o registro em `App.tsx` (que hoje só renderiza `<LoginScreen />`, sem
navegação).

> **Fale sobre:** por que dá pra digitar nos campos mesmo sem `value` — o
> `TextInput` guarda texto sozinho, só que o componente React não sabe disso.
> É o gancho pra Parte 3.

### Parte 3 — Estado: usuário
`useState`, componente controlado (`value` + `onChangeText`). **Demonstrado
pelo professor**, não é desafio — é a primeira vez que a turma vê o padrão.

> **Fale sobre:** a "caixinha de memória"; por que `setUsuario` (e não mexer
> na variável direto) é o jeito certo de mudar o estado; o que é re-render.

### Parte 4 — Estado: senha
Desafio: repetir o padrão da Parte 3 no campo senha. Sem novidade nenhuma —
o ponto é a repetição consolidar o padrão sozinha, sem o professor guiando
passo a passo de novo.

### Parte 5 — Login e validação
Concept note sobre `Alert` e condicionais com estado, depois o desafio
principal: escrever `handleLogin` (valida campos vazios, mostra `Alert` de
erro ou de boas-vindas com o nome digitado via template string). Fecha com
o import do `Alert`, a função e o `onPress` no botão.

> **Fale sobre:** por que `onPress={handleLogin}` (sem `()`) — passar a
> função, não chamar ela; a diferença entre aspas simples e crase pra
> template string.

### Parte 6 — Fechamento
Recap dos conceitos e 5 desafios pra casa (mostrar/ocultar senha, erro na
tela em vez de `Alert`, desabilitar botão, contador de tentativas,
`AsyncStorage` como gancho pra próxima aula).

---

## 5. Estrutura final do projeto

```
App.tsx                       só renderiza <LoginScreen /> — sem navegação ainda
src/
  screens/
    LoginScreen.tsx           useState (usuário, senha) + handleLogin + StyleSheet
```

Nenhuma dependência declarada além do que o Expo Snack já cria (`expo`,
`react`, `react-native`, `@types/react`, `typescript`).

---

## 6. Conceitos cobertos

| Conceito | Onde aparece |
|---|---|
| Componente funcional e JSX | toda a tela |
| Tela **sem** estado (baseline) | Parte 2 |
| `useState` (progressivo: 1 campo, depois 2) | Partes 3 e 4 |
| Componente controlado (`value` + `onChangeText`) | Partes 3 e 4 |
| Edição de um arquivo já escrito (`insert`) | Partes 3–5 — o import e o JSX crescem aos poucos, não nascem prontos |
| Condicional simples com estado (`if (!a \|\| !b)`) | Parte 5 |
| Template string (`` `texto ${variavel}` ``) | Parte 5 |
| API nativa (`Alert`) | Parte 5 |
| `StyleSheet`, Flexbox básico | Parte 2 |

---

## 7. Perguntas frequentes na hora da aula

**"Meu desafio ficou diferente do que apareceu depois."**
Ótimo sinal de discussão — pare e compare as duas abordagens antes de seguir.
Não existe só uma forma certa de resolver; o que importa é o resultado.

**"Posso deixar o texto digitado aparecendo embaixo do campo, tipo
'Você digitou: ...'?"**
Pode — é um ótimo jeito extra de provar que o estado está funcionando. Não
faz parte do arquivo final da aula, mas é um bom mini-desafio bônus.

**"O botão não fez nada depois que eu toquei."**
Confira se `onPress={handleLogin}` foi escrito sem os parênteses — com
`()` a função seria chamada na hora de montar a tela, não quando o botão for
tocado.

**"Por que não navega pra lugar nenhum depois do login?"**
Proposital — ainda não existe outra tela. `Alert.alert` de boas-vindas é o
resultado de hoje; navegação é o assunto da próxima aula.

---

## 8. Manutenção da apresentação

Todo o conteúdo está em [`aula/aulas/login-react-native.js`](aula/aulas/login-react-native.js)
— um arquivo só, no formato do [`_template.js`](aula/aulas/_template.js) do
motor. Os slides de conceito/desafio usam o campo `md` (Markdown — títulos,
listas, código, citação como caixa de dica); ver
[`aula/player/README.md`](aula/player/README.md#o-campo-md-slides-de-conceitodesafio)
para a sintaxe suportada. Depois de qualquer mudança no roteiro ou no código
real, rode:

```bash
pnpm check-aula
```

Ele reconstrói `App.tsx` e `src/screens/LoginScreen.tsx` a partir das etapas
e compara byte a byte com os arquivos reais — qualquer divergência aparece
com diff. Ver [`aula/tools/check-sync.js`](aula/tools/check-sync.js).
