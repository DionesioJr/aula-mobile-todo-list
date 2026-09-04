# Brief, Aula 3: Tela de Cadastro e navegação

## Por que essa aula existe
A aula 2 entregou uma tela de login que funcionava mas não levava a lugar
nenhum, de propósito, porque não existia um segundo lugar. Esta aula cria
esse segundo lugar e, com ele, o assunto que ficou pendente: **como duas
telas conversam**.

O formato da aula 2 deu certo e continua igual: escopo pequeno, e a
apresentação **para em pontos fixos** para a turma tentar sozinha antes de
ver a solução sendo digitada.

## O que é
A tela de **Cadastro** (nome, usuário, senha, confirmação) mais a
**navegação** entre ela e o Login que já existe. Sem SQLite, sem API: a
"conta" criada vive num `useState` do `App.tsx` e some quando o app fecha,
o suficiente para o login parar de aceitar qualquer coisa.

## Regra principal: nenhuma biblioteca externa
Igual à aula 2, e agora com um alvo específico: **nada de
`@react-navigation`**. A navegação é feita na mão, um `useState` no
`App.tsx` guardando o nome da tela e um `if` decidindo o que renderizar.

Isso não é uma limitação, é o conteúdo: a turma vê que "trocar de tela" é
só trocar qual componente é devolvido. Quando `@react-navigation` aparecer
numa aula futura, ela deixa de ser mágica, vira uma conveniência (pilha de
telas, botão de voltar, animação) sobre um mecanismo já entendido.

## Ponto de partida
O projeto **não começa vazio**. `App.tsx` e `src/screens/LoginScreen.tsx`
já estão na árvore, exatamente como ficaram no fim da aula 2, o player
carrega esses dois arquivos como estado inicial (`inicial.files`).

## O conceito novo: props
É a primeira vez que a turma escreve props próprias. A progressão:

1. **Prop de função, um sentido**: `App` passa `aoCriarConta={() =>
   setTela('cadastro')}` para o `LoginScreen`. Dado desce, aviso sobe.
2. **A mesma coisa de volta**: `aoVoltar` no `CadastroScreen`. Repetição
   pura, feita pela turma como desafio.
3. **Prop de função com parâmetros**: `aoCadastrar(usuario, senha)` leva os
   dados digitados de volta para o pai.
4. **Prop de dado**: `conta={conta}` desce do `App` para o `LoginScreen`,
   que finalmente consegue validar quem entra.

Junto vem `type Props` do TypeScript: cada tela declara o que aceita
receber.

## Progressão da aula
| Parte | Entrega | Formato |
|---|---|---|
| 1. De onde partimos | Recap do código da aula 2 | Slide |
| 2. Tela de cadastro | `CadastroScreen.tsx` visual + 4 campos controlados | **Desafio** (é tudo revisão) |
| 3. Navegação | `useState` no `App`, `if`, props de função nas duas telas | Demonstrado + 2 **desafios** |
| 4. Validação | `handleCadastrar` com 3 regras | **Desafio** |
| 5. Conta de verdade | Dados subindo, login validando | Demonstrado + 1 **desafio** |
| 6. Fechamento | Recap + 6 desafios pra casa | Slide |

**48 etapas, 5 desafios ao vivo** (~29 min só de desafio). Cada desafio usa
só o que já apareceu até ali.

## Estilização: o mínimo possível
`StyleSheet.create` copiado do `LoginScreen`, mais um estilo `link`. A
duplicação entre os dois arquivos é **proposital e assumida em voz alta**: vira o primeiro desafio de casa (extrair para um arquivo de estilos).

## Estrutura de arquivos
```
App.tsx                     estado da tela + estado da conta + navegação
src/
  screens/
    LoginScreen.tsx         recebe props (conta, aoCriarConta)
    CadastroScreen.tsx      recebe props (aoCadastrar, aoVoltar)
```

## Linguagem / Bibliotecas
- **TypeScript**, agora com `type Props`: mas ainda sem nenhum tipo de
  biblioteca de navegação (`NativeStackScreenProps` etc. não existem aqui).
- Zero dependências além do que o Expo Snack cria por padrão. O
  `package.json` não é tocado nesta aula.

## Compatibilidade com Expo Snack
Igual às aulas anteriores: `App.tsx` como entry point, `src/screens/`
funciona normalmente, sem `.env`, sem build nativo.

## Desafios pra casa
1. Extrair o `StyleSheet` duplicado para `src/styles.ts`.
2. Campo de e-mail no cadastro, recusando texto sem `@`.
3. Mostrar/ocultar senha nos dois campos de senha.
4. Uma terceira tela (`HomeScreen`) aberta após o login bem-sucedido.
5. Erro na tela (`Text` vermelho) em vez de `Alert`.
6. (avançado, gancho pra próxima aula) pesquisar
   `@react-navigation/native-stack`.

---
**Escopo confirmado.** Este documento descreve o resultado final; o roteiro
de apresentação está em [`AULA-ROTEIRO.md`](AULA-ROTEIRO.md).
