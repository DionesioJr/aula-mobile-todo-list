/* =========================================================================
   AULA 3: Tela de Cadastro e navegação (React Native puro, sem libs)

   Continuação direta da aula 2: a tela de Login já existe e já funciona.
   Hoje a turma cria a SEGUNDA tela (Cadastro) e, o conceito novo, faz as
   duas conversarem: navegação e props.

   Mesma regra da aula 2: NENHUMA biblioteca externa. Nada de
   @react-navigation. A navegação é feita na mão, com um `useState` no
   App.tsx e um `if`: justamente para a turma entender o que qualquer
   biblioteca de navegação faz por baixo do capô.

   Formato também igual: a aula PARA em cartões roxos de desafio; a turma
   tenta sozinha antes de ver a solução sendo digitada.

   Motor da apresentação: ../player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* =========================================================================
   PONTO DE PARTIDA, o resultado da aula 2 já está no projeto.
   A aula de hoje começa com estes dois arquivos prontos na árvore.
   ========================================================================= */
const INITIAL_ENTRIES = [
  {path:'App.tsx', type:'file'},
  {path:'src', type:'dir'},
  {path:'src/screens', type:'dir'},
  {path:'src/screens/LoginScreen.tsx', type:'file'},
];

const INITIAL_FILES = {
'App.tsx':
`import React from 'react';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return <LoginScreen />;
}
`,
'src/screens/LoginScreen.tsx':
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }
    Alert.alert('Bem-vindo!', \`Login efetuado como \${usuario}.\`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Aplicação</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.botao}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  botao: { backgroundColor: '#2e6de6', borderRadius: 8, padding: 14, marginTop: 8 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
`,
};

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert
   ========================================================================= */
const STEPS = [

/* ----------------------------------------------------------------------
   PARTE 1: De onde partimos
   ---------------------------------------------------------------------- */
{
  part:'De onde partimos', op:'intro',
  title:'Cadastro e navegação',
  eyebrow:'Aula 3 · React Native',
  md:
`Na aula passada a tela de login ficou pronta, mas ela não levava a lugar nenhum, porque não existia um segundo lugar. Hoje esse lugar nasce: a **tela de cadastro**, e a **navegação** entre as duas.

- **Tela nova:** \`CadastroScreen\`, nome, usuário, senha e confirmação de senha, com validação de verdade.
- **Conceito novo:** \`props\`, como uma tela recebe informação (e funções) de fora.
- **Navegação na mão:** sem \`@react-navigation\`, sem instalar nada. Um \`useState\` no \`App.tsx\` decide qual tela aparece. É exatamente isso que qualquer biblioteca de navegação faz por baixo do capô.

> Mesmo formato da aula passada: nos cartões **roxos de desafio** a aula para e é a vez da turma tentar. **→** avança · **←** volta · **↑ ↓** mudam a velocidade.`
},
{
  part:'De onde partimos', op:'note',
  title:'O que já está pronto',
  md:
`O projeto **não começa vazio hoje**. Clique nos arquivos da barra lateral para relembrar o que a turma escreveu na aula 2:

- \`src/screens/LoginScreen.tsx\`, dois campos controlados (\`useState\` + \`value\` + \`onChangeText\`) e um \`handleLogin\` que só checa se os campos estão preenchidos.
- \`App.tsx\`, três linhas: ele só devolve \`<LoginScreen />\`. Nenhuma decisão, nenhum estado.

> **É o \`App.tsx\` que vai mudar mais hoje.** Ele deixa de ser um atalho para a tela de login e vira quem **decide** qual tela está no ar.`
},

/* ----------------------------------------------------------------------
   PARTE 2: A tela de cadastro
   ---------------------------------------------------------------------- */
{
  part:'Tela de cadastro', op:'note',
  title:'Mesmos componentes, mais campos',
  md:
`A tela de cadastro não traz **nenhum componente novo**: é o mesmo \`View\`, \`Text\`, \`TextInput\` e \`TouchableOpacity\` da aula passada. O que muda é a quantidade:

- **Nome**: \`placeholder="Nome"\`, texto comum.
- **Usuário**: \`placeholder="Usuário"\` mais \`autoCapitalize="none"\`.
- **Senha**: \`placeholder="Senha"\` mais \`secureTextEntry\`.
- **Confirmar senha**: \`placeholder="Confirmar senha"\` mais \`secureTextEntry\`.

Quatro campos = quatro \`useState\` = quatro pares \`value\` + \`onChangeText\`. **Nada disso é novo**: é literalmente o padrão da aula 2, repetido mais duas vezes.

> Por isso o primeiro desafio de hoje é grande: a turma consegue fazer a tela inteira sozinha. Só a validação e a navegação ficam para depois.`
},
{
  part:'Tela de cadastro', op:'challenge', time:'8 min',
  title:'Monte a tela de cadastro inteira',
  md:
`Crie o arquivo \`src/screens/CadastroScreen.tsx\` e faça a tela **completa**, do jeito que aprendemos na aula passada:

1. Os imports (\`React\` com \`useState\`, e os componentes do \`react-native\`).
2. Um título \`Criar conta\`.
3. Os **quatro** \`TextInput\` da lista anterior, cada um controlado: \`useState\`, \`value\` e \`onChangeText\`.
4. Um \`TouchableOpacity\` com o texto **Cadastrar**.
5. Os estilos, pode copiar o \`StyleSheet\` do \`LoginScreen\` e colar aqui.

**Ainda não** faça a validação nem a navegação, o botão pode ficar sem \`onPress\`.

> Travou em algum campo? Abra o \`LoginScreen.tsx\` na barra lateral e copie o padrão dele. Copiar do próprio código anterior é o jeito certo de trabalhar, não é cola.`
},
{
  part:'Tela de cadastro', op:'file', target:'src/screens/CadastroScreen.tsx',
  title:'Criar CadastroScreen.tsx',
  explain:'Uma tela por arquivo, dentro de <code>src/screens</code>, a pasta já existe desde a aula passada.'
},
{
  part:'Tela de cadastro', op:'code', file:'src/screens/CadastroScreen.tsx',
  title:'Imports',
  explain:'Os mesmos da tela de login, menos o <code>Alert</code>, esse entra só quando a validação chegar.',
  code:
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
`
},
{
  part:'Tela de cadastro', op:'code', file:'src/screens/CadastroScreen.tsx',
  title:'O componente e os quatro estados',
  explain:'Quatro <code>useState</code>, quatro campos controlados, o mesmo padrão da aula 2, sem novidade nenhuma. O botão ainda não tem <code>onPress</code>: não existe função pra chamar.',
  code:
`
export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
`
},
{
  part:'Tela de cadastro', op:'code', file:'src/screens/CadastroScreen.tsx',
  title:'Estilos (os mesmos do login)',
  explain:'Copiados do <code>LoginScreen</code> sem mudar nada. Sim, é código duplicado, e é um dos desafios de casa: juntar os dois num arquivo só de estilos.',
  code:
`
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  botao: { backgroundColor: '#2e6de6', borderRadius: 8, padding: 14, marginTop: 8 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
`
},

/* ----------------------------------------------------------------------
   PARTE 3: Navegação: o conceito novo da aula
   ---------------------------------------------------------------------- */
{
  part:'Navegação', op:'note',
  title:'Salve e olhe o celular: nada mudou',
  md:
`A tela de cadastro existe, está escrita, está salva, e **ninguém a vê**. O celular continua mostrando o login.

Por quê? Porque \`App.tsx\` continua com aquelas três linhas:

\`\`\`tsx
export default function App() {
  return <LoginScreen />;
}
\`\`\`

Um arquivo só existe na tela quando **alguém o renderiza**. E hoje só o \`LoginScreen\` é renderizado.

> Esse é o problema que a navegação resolve. E ele é bem menos misterioso do que parece.`
},
{
  part:'Navegação', op:'note',
  title:'Navegar é trocar o que está na tela',
  md:
`Não existe "trocar de página" no React Native, não tem URL, não tem \`href\`. Existe só isto: **um componente sai da tela e outro entra no lugar**.

E "decidir qual componente aparece" é uma decisão como qualquer outra, dá para fazer com um \`if\` comum:

\`\`\`tsx
if (tela === 'cadastro') {
  return <CadastroScreen />;
}
return <LoginScreen />;
\`\`\`

Falta só uma coisa: guardar em algum lugar **qual é a tela atual**. E lugar de guardar algo que muda e precisa re-renderizar a tela, a turma já conhece: \`useState\`.

- \`const [tela, setTela] = useState('login')\`, o estado guarda o **nome** da tela.
- \`setTela('cadastro')\` troca a tela, exatamente como \`setUsuario\` trocava o texto do campo.

> Existe sim uma biblioteca famosa pra isso (\`@react-navigation\`), e ela vai aparecer numa aula futura, com pilha de telas, botão de voltar e animação. Mas por dentro ela faz **isso aqui**. Entender o mecanismo primeiro faz a biblioteca deixar de ser mágica.`
},
{
  part:'Navegação', op:'insert', file:'App.tsx',
  before:" from 'react';",
  title:'App.tsx também vai ter estado',
  explain:'Até agora só as telas tinham <code>useState</code>. Agora o <code>App</code> também precisa lembrar de algo: qual tela está no ar.',
  code:', { useState }'
},
{
  part:'Navegação', op:'insert', file:'App.tsx',
  after:"import LoginScreen from './src/screens/LoginScreen';",
  title:'Importar a tela nova',
  explain:'Sem esse import, o <code>App</code> não conhece o <code>CadastroScreen</code>, o arquivo existe no projeto, mas não neste arquivo.',
  code:
`import CadastroScreen from './src/screens/CadastroScreen';
`
},
{
  part:'Navegação', op:'insert', file:'App.tsx',
  after:'export default function App() {',
  title:'O estado que guarda a tela atual',
  explain:'Começa em <code>\'login\'</code>, é a primeira tela que o app mostra. É só uma string comum; o React não tem ideia do que ela significa, quem dá sentido a ela é o nosso <code>if</code>.',
  code:
`  const [tela, setTela] = useState('login');

`
},
{
  part:'Navegação', op:'insert', file:'App.tsx',
  before:'  return <LoginScreen',
  title:'O if que decide',
  explain:'Se o estado for <code>\'cadastro\'</code>, a função devolve a tela de cadastro e <b>para ali</b>, o <code>return</code> encerra a função, então a linha do <code>LoginScreen</code> nem é alcançada. É JavaScript comum, sem nada de React.',
  code:
`  if (tela === 'cadastro') {
    return <CadastroScreen />;
  }

`
},
{
  part:'Navegação', op:'note',
  title:'Teste na marra, e o que ainda falta',
  md:
`Troque **na mão** o valor inicial do estado para \`useState('cadastro')\`, salve, e olhe o celular: a tela de cadastro aparece. Volte para \`useState('login')\` e ela some.

Isso prova que o mecanismo funciona. Mas ainda tem um buraco grande:

- Quem troca o estado hoje é **o professor editando o código**. O usuário do app não tem como.
- Quem sabe mexer em \`tela\` é só o \`App.tsx\`. O botão que o usuário vai tocar está **dentro do \`LoginScreen\`**: outro arquivo, outro componente.

> Como é que um componente filho pede pro pai trocar a tela? É a próxima peça: **props**.`
},
{
  part:'Navegação', op:'note',
  title:'Props: o controle remoto que o pai entrega',
  md:
`**Prop** é qualquer informação que um componente recebe de fora, escrita como atributo no JSX, igual a \`placeholder\` ou \`value\`, que a turma já usa desde a aula 2. A diferença é que agora **nós** vamos criar as nossas.

E a informação passada pode ser uma **função**:

\`\`\`tsx
<LoginScreen aoCriarConta={() => setTela('cadastro')} />
\`\`\`

O \`App\` está dizendo pro \`LoginScreen\`: **"toma esse botão; quando você quiser, aperta"**. O \`LoginScreen\` não sabe (e não precisa saber) o que acontece quando ele aperta, só chama.

Do lado de dentro, a tela declara o que espera receber e usa o nome direto:

\`\`\`tsx
type Props = {
  aoCriarConta: () => void;
};

export default function LoginScreen({ aoCriarConta }: Props) {
\`\`\`

- \`type Props = { ... }\` é TypeScript: a lista do que essa tela aceita receber.
- \`() => void\` significa "uma função que não recebe nada e não devolve nada".
- \`{ aoCriarConta }\` entre chaves pega essa prop de dentro do pacote que chegou.

> **Regra de ouro:** dado desce (pai → filho), aviso sobe (filho chama a função do pai). O filho nunca mexe direto no estado do pai.`
},
{
  part:'Navegação', op:'challenge', time:'5 min',
  title:'Do login para o cadastro',
  md:
`Faça o botão existir e funcionar: um link no fim da tela de login que leva ao cadastro.

1. No \`App.tsx\`, passe a prop: \`<LoginScreen aoCriarConta={() => setTela('cadastro')} />\`.
2. No \`LoginScreen.tsx\`, declare o \`type Props\` com \`aoCriarConta: () => void;\`.
3. Ainda no \`LoginScreen\`, receba a prop na assinatura: \`function LoginScreen({ aoCriarConta }: Props)\`.
4. Depois do botão "Entrar", adicione um \`TouchableOpacity\` com \`onPress={aoCriarConta}\` e um \`Text\` escrito **Não tem conta? Cadastre-se**.
5. Crie um estilo \`link\` pra esse texto (uma cor e um \`marginTop\` já bastam).

> Lembra da aula passada: \`onPress={aoCriarConta}\`, **sem** os parênteses. Com \`()\` a função seria chamada na hora de montar a tela, e o app trocaria de tela sozinho, num loop.`
},
{
  part:'Navegação', op:'insert', file:'App.tsx',
  before:'/>;\n}',
  title:'Passar a função como prop',
  explain:'<code>() => setTela(\'cadastro\')</code> é uma função escrita ali mesmo (<i>arrow function</i>): ela ainda não roda, só fica guardada esperando alguém chamar.',
  code:'aoCriarConta={() => setTela(\'cadastro\')} '
},
{
  part:'Navegação', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:'export default function LoginScreen',
  title:'Declarar o que a tela recebe',
  explain:'O <code>type Props</code> é a "ficha de inscrição" da tela: se alguém esquecer de passar <code>aoCriarConta</code>, o TypeScript reclama antes de o app rodar.',
  code:
`type Props = {
  aoCriarConta: () => void;
};

`
},
{
  part:'Navegação', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:') {\n  const [usuario',
  title:'Receber a prop',
  explain:'As chaves em <code>{ aoCriarConta }</code> tiram a prop de dentro do objeto que chegou, daí em diante ela é uma variável comum dentro do componente.',
  code:'{ aoCriarConta }: Props'
},
{
  part:'Navegação', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:'    </View>',
  title:'O link "Cadastre-se"',
  explain:'Sem <code>style={styles.botao}</code>: é só um texto tocável, não um botão azul. Repare que <code>onPress</code> recebe a prop direto, a tela não sabe o que essa função faz.',
  code:
`
      <TouchableOpacity onPress={aoCriarConta}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
`
},
{
  part:'Navegação', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:'});',
  title:'O estilo do link',
  explain:'Só cor e um respiro em cima. Estilo continua não sendo o assunto da aula.',
  code:
`  link: { color: '#2e6de6', textAlign: 'center', marginTop: 16 },
`
},
{
  part:'Navegação', op:'challenge', time:'4 min',
  title:'Agora o caminho de volta',
  md:
`O app já vai do login pro cadastro, mas ficou preso lá. Faça o caminho inverso, **repetindo exatamente o que acabou de ser feito**, agora no \`CadastroScreen\`:

1. No \`App.tsx\`: \`<CadastroScreen aoVoltar={() => setTela('login')} />\`.
2. No \`CadastroScreen.tsx\`: \`type Props\` com \`aoVoltar: () => void;\`.
3. Receber a prop na assinatura do componente.
4. Um \`TouchableOpacity\` com \`onPress={aoVoltar}\` e o texto **Já tenho conta, voltar**.
5. O estilo \`link\`, igual ao do login.

> Zero conceito novo aqui, é o mesmo padrão com outro nome. Se a turma fez o desafio anterior, esse sai em dois minutos.`
},
{
  part:'Navegação', op:'insert', file:'App.tsx',
  before:'/>;\n  }',
  title:'A prop de voltar',
  explain:'Outra função guardada numa prop. O <code>App</code> é o único lugar do projeto que chama <code>setTela</code>, as telas só pedem.',
  code:'aoVoltar={() => setTela(\'login\')} '
},
{
  part:'Navegação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:'export default function CadastroScreen',
  title:'O type Props do cadastro',
  explain:'Cada tela tem o seu <code>type Props</code>, com o que ela precisa receber, não existe um Props global.',
  code:
`type Props = {
  aoVoltar: () => void;
};

`
},
{
  part:'Navegação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:') {\n  const [nome',
  title:'Receber aoVoltar',
  explain:'Mesma sintaxe da tela de login.',
  code:'{ aoVoltar }: Props'
},
{
  part:'Navegação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:'    </View>',
  title:'O link de voltar',
  explain:'Ainda não existe botão de voltar do sistema (aquele do topo), isso vem com a biblioteca de navegação, numa próxima aula. Hoje o caminho de volta é explícito.',
  code:
`
      <TouchableOpacity onPress={aoVoltar}>
        <Text style={styles.link}>Já tenho conta, voltar</Text>
      </TouchableOpacity>
`
},
{
  part:'Navegação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:'});',
  title:'O estilo do link',
  explain:'Idêntico ao do login, mais uma duplicação para o desafio de casa resolver.',
  code:
`  link: { color: '#2e6de6', textAlign: 'center', marginTop: 16 },
`
},
{
  part:'Navegação', op:'note',
  title:'Teste, navegando pros dois lados',
  md:
`Salve e teste no celular:

- Toque em **"Não tem conta? Cadastre-se"** → a tela de cadastro aparece.
- Toque em **"Já tenho conta, voltar"** → volta pro login.
- Digite algo num campo do cadastro, volte pro login e entre de novo no cadastro: **o campo está vazio de novo**.

> Esse último ponto vale comentar: ao trocar de tela, o \`CadastroScreen\` é **desmontado**: o \`useState\` dele vai embora junto. Estado que precisa sobreviver à troca de tela tem que morar num lugar mais alto: no \`App.tsx\`. Guarde essa ideia, ela volta no fim da aula.`
},

/* ----------------------------------------------------------------------
   PARTE 4: Validação do cadastro
   ---------------------------------------------------------------------- */
{
  part:'Validação', op:'note',
  title:'Três regras, três ifs',
  md:
`O \`handleLogin\` da aula passada tinha **uma** regra. O cadastro tem três, e elas são checadas em ordem, a primeira que falhar mostra o alerta e **para** com \`return\`:

1. **Campos vazios**: nenhum dos quatro pode estar em branco: \`if (!nome || !usuario || !senha || !confirmarSenha)\`.
2. **Senha muito curta**: \`senha.length < 4\`. Todo texto em JavaScript tem \`.length\`, que é o número de caracteres.
3. **Senhas diferentes**: \`senha !== confirmarSenha\`. Aqui a validação compara **dois estados entre si**, coisa que a tela de login nunca precisou fazer.

Se passar pelas três, aí sim: alerta de sucesso.

> \`!==\` é "diferente de", com comparação estrita. Em JavaScript sempre use \`===\` e \`!==\` (três sinais), os de dois sinais fazem conversões silenciosas que dão dor de cabeça.`
},
{
  part:'Validação', op:'challenge', time:'7 min',
  title:'Escreva o handleCadastrar',
  md:
`Sozinha: escreva a função \`handleCadastrar\` dentro do \`CadastroScreen\` e ligue ela ao botão **Cadastrar**.

- Importe o \`Alert\` junto dos outros componentes do \`react-native\`.
- Aplique as três regras do slide anterior, **nessa ordem**, cada uma com sua mensagem de \`Alert.alert\` e um \`return\` para parar.
- Passando por todas: um \`Alert.alert\` de sucesso usando o \`nome\` digitado.
- Ligue no botão: \`onPress={handleCadastrar}\`.

> Cada regra é um \`if\` separado, um embaixo do outro, não tente juntar tudo num \`if\` gigante. Assim cada erro tem sua mensagem própria, que é o que faz a tela ser útil pra quem usa.`
},
{
  part:'Validação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:" } from 'react-native';",
  title:'Importar o Alert',
  explain:'De fábrica no <code>react-native</code>, igual na aula passada, nada para instalar.',
  code:', Alert'
},
{
  part:'Validação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  after:"const [confirmarSenha, setConfirmarSenha] = useState('');",
  title:'A função handleCadastrar',
  explain:'Repare no formato: valida, avisa, <code>return</code>. Quando a execução chega na última linha, é porque as três regras passaram, não precisa de <code>else</code> nenhum.',
  code:
`
  function handleCadastrar() {
    if (!nome || !usuario || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (senha.length < 4) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 4 caracteres.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }
    Alert.alert('Conta criada!', \`Bem-vindo, \${nome}. Agora é só entrar.\`);
  }
`
},
{
  part:'Validação', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:'style={styles.botao}',
  title:'Ligar o botão à função',
  explain:'Sem parênteses, passamos a função, quem chama é o React quando o dedo tocar a tela.',
  code:'onPress={handleCadastrar} '
},
{
  part:'Validação', op:'note',
  title:'Teste, as três regras',
  md:
`Salve e toque em **Cadastrar** em quatro situações:

- Tudo vazio → **"Preencha todos os campos."**
- Preenchido, mas senha \`123\` → **"A senha precisa ter pelo menos 4 caracteres."**
- Senha \`1234\` e confirmação \`4321\` → **"As senhas não são iguais."**
- Tudo certo → **"Conta criada!"** com o nome digitado.

> Funciona bem, mas tem uma mentira aí: o alerta diz "conta criada" e **nada foi criado**. Feche o alerta, volte pro login e tente entrar com o usuário que acabou de cadastrar, o login aceita qualquer coisa, porque ele nem sabe que o cadastro existe.`
},

/* ----------------------------------------------------------------------
   PARTE 5: A conta criada de verdade
   ---------------------------------------------------------------------- */
{
  part:'Conta de verdade', op:'note',
  title:'Falta o dado subir',
  md:
`Até aqui as props só levaram **funções** pra baixo. Agora a informação precisa fazer o caminho contrário: o que foi digitado no cadastro tem que chegar até o login.

O truque é o mesmo de sempre, só que a função passada como prop **recebe parâmetros**:

\`\`\`tsx
// no App.tsx: a função que vai receber os dados
function cadastrar(usuario: string, senha: string) {
  setConta({ usuario: usuario, senha: senha });
  setTela('login');
}

// no CadastroScreen: chamando com os valores digitados
aoCadastrar(usuario, senha);
\`\`\`

- O estado \`conta\` mora no \`App.tsx\`, o único lugar que **não** é desmontado ao trocar de tela.
- \`useState({ usuario: '', senha: '' })\` mostra que estado não precisa ser texto: pode ser um objeto com vários campos.
- Depois de guardar, \`cadastrar\` já chama \`setTela('login')\`, o app volta sozinho pra tela de entrar.

> Isso tem nome: **elevar o estado**: em inglês, **lifting state up**. Quando dois componentes precisam do mesmo dado, ele sobe para o pai que os contém.`
},
{
  part:'Conta de verdade', op:'insert', file:'App.tsx',
  after:"const [tela, setTela] = useState('login');",
  title:'Onde a conta vai morar',
  explain:'Enquanto o app estiver aberto, essa conta existe. Fechou o app, perdeu, memória permanente (<code>AsyncStorage</code>, banco de dados) é assunto de outra aula.',
  code:
`  const [conta, setConta] = useState({ usuario: '', senha: '' });

  function cadastrar(usuario: string, senha: string) {
    setConta({ usuario: usuario, senha: senha });
    setTela('login');
  }
`
},
{
  part:'Conta de verdade', op:'insert', file:'App.tsx',
  before:'aoVoltar=',
  title:'Entregar a função ao cadastro',
  explain:'Duas props agora na mesma tela. Aqui passamos o <b>nome</b> da função (<code>cadastrar</code>), sem <code>()</code>, mesma regra do <code>onPress</code>.',
  code:'aoCadastrar={cadastrar} '
},
{
  part:'Conta de verdade', op:'insert', file:'src/screens/CadastroScreen.tsx',
  after:'type Props = {',
  title:'Declarar a nova prop',
  explain:'<code>(usuario: string, senha: string) => void</code> descreve uma função que <b>recebe dois textos</b> e não devolve nada. É o contrato: quem passar essa prop tem que aceitar esses dois parâmetros.',
  code:
`  aoCadastrar: (usuario: string, senha: string) => void;
`
},
{
  part:'Conta de verdade', op:'insert', file:'src/screens/CadastroScreen.tsx',
  before:'aoVoltar }: Props',
  title:'Receber as duas props',
  explain:'A vírgula separa as props dentro das chaves, é o mesmo desempacotar de antes, com dois itens.',
  code:'aoCadastrar, '
},
{
  part:'Conta de verdade', op:'insert', file:'src/screens/CadastroScreen.tsx',
  after:"Alert.alert('Conta criada!'",
  title:'Avisar o App de quem se cadastrou',
  explain:'Última linha da função, depois de todas as validações, só chega aqui quem passou por elas. O <code>CadastroScreen</code> não sabe o que o <code>App</code> faz com esses dados; ele só entrega.',
  code:
`    aoCadastrar(usuario, senha);
`
},
{
  part:'Conta de verdade', op:'challenge', time:'5 min',
  title:'Faça o login recusar quem não tem conta',
  md:
`Falta fechar o ciclo: a conta já está guardada no \`App.tsx\`, mas o login ainda deixa qualquer um entrar.

1. No \`App.tsx\`, passe a conta pra tela de login: \`<LoginScreen conta={conta} ... />\`.
2. No \`LoginScreen.tsx\`, adicione ao \`type Props\`: \`conta: { usuario: string; senha: string };\`.
3. Receba \`conta\` junto com \`aoCriarConta\` na assinatura do componente.
4. No \`handleLogin\`, **entre** a checagem de campos vazios e o alerta de boas-vindas, adicione uma regra: se \`usuario\` for diferente de \`conta.usuario\` **ou** \`senha\` for diferente de \`conta.senha\`, mostre um \`Alert\` de erro e \`return\`.

> Aqui a prop leva **dado**, não função, e é um objeto, então os campos são acessados com ponto: \`conta.usuario\`, \`conta.senha\`.`
},
{
  part:'Conta de verdade', op:'insert', file:'App.tsx',
  before:'aoCriarConta=',
  title:'Passar a conta para o login',
  explain:'Uma prop de dado, não de função, o valor desce do pai para o filho.',
  code:'conta={conta} '
},
{
  part:'Conta de verdade', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:'type Props = {',
  title:'Declarar a prop conta',
  explain:'O tipo descreve o formato do objeto: um <code>usuario</code> texto e uma <code>senha</code> texto. Dentro de um <code>type</code>, os campos são separados por ponto e vírgula.',
  code:
`  conta: { usuario: string; senha: string };
`
},
{
  part:'Conta de verdade', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:'aoCriarConta }: Props',
  title:'Receber a conta',
  explain:'A ordem dentro das chaves não importa, o que importa é o nome bater com o do <code>type Props</code>.',
  code:'conta, '
},
{
  part:'Conta de verdade', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:"    Alert.alert('Bem-vindo!'",
  title:'A checagem que faltava',
  explain:'A ordem das regras importa: primeiro "está vazio?", depois "confere com a conta?". Só quem passa pelas duas vê o alerta de boas-vindas.',
  code:
`    if (usuario !== conta.usuario || senha !== conta.senha) {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
      return;
    }
`
},
{
  part:'Conta de verdade', op:'note',
  title:'Teste final, o ciclo completo',
  md:
`Recarregue o app e faça o caminho inteiro:

1. Na tela de login, tente entrar com qualquer coisa → **"Usuário ou senha inválidos."**
2. Toque em **"Não tem conta? Cadastre-se"**.
3. Preencha o cadastro corretamente → alerta de conta criada e o app **volta sozinho** para o login.
4. Entre com o usuário e a senha que acabou de cadastrar → **"Bem-vindo!"**.
5. Erre a senha de propósito → **"Usuário ou senha inválidos."**

> Duas telas, navegação nos dois sentidos, dados atravessando de uma para a outra, e o \`package.json\` continua sem uma única dependência a mais do que o Snack já criou.`
},

/* ----------------------------------------------------------------------
   PARTE 6: Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Duas telas conversando',
  md:
`O app deixou de ser uma tela solta. Agora tem um \`App.tsx\` que **decide** o que aparece, duas telas que **pedem** a troca, e um dado que **atravessa** de uma para a outra.

## Conceitos de hoje
\`props\` (dados e funções), \`type Props\` no TypeScript, renderização condicional com \`if\`, navegação como estado, elevar o estado (lifting state up), validação com várias regras, \`.length\` e \`!==\`.

## Desafios pra casa
Todos possíveis com o que já foi visto:

1. **Fim da duplicação:** crie \`src/styles.ts\` exportando o \`StyleSheet\` e use o mesmo nos dois arquivos, hoje eles são idênticos, copiados.
2. **Campo de e-mail** no cadastro, com uma validação simples: recusar se o texto não tiver \`@\` (dica: \`email.includes('@')\`).
3. **Mostrar/ocultar senha** nos dois campos de senha do cadastro, com um \`useState\` booleano controlando o \`secureTextEntry\`.
4. **Tela de boas-vindas:** uma terceira tela (\`HomeScreen\`) que o login abre quando dá certo, no lugar do \`Alert\`, só mais um valor possível no estado \`tela\`, e mais um \`if\` no \`App.tsx\`.
5. **Erro na tela em vez de \`Alert\`:** guarde a mensagem num estado e mostre num \`Text\` vermelho acima do botão.
6. **(avançado, gancho pra próxima aula)** Pesquise \`@react-navigation/native-stack\`: como seria essa mesma navegação com uma biblioteca, e o que ela dá de brinde (botão de voltar, animação, histórico de telas).

> Entrega: o link do Snack com as duas telas funcionando e pelo menos **dois** desafios feitos.`
},
];

global.AULA_CADASTRO_RN = {
  meta: {
    titulo:    'Cadastro e Navegação (React Native)',
    projeto:   'cadastro-navegacao-react-native',
    subtitulo: 'React Native puro · sem bibliotecas externas',
    vazio:     'Projeto da aula 2.<br>A tela de login já está pronta.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    null, // continua sem nenhuma dependência nova
  steps:   STEPS,
};

})(window);
