/* =========================================================================
   AULA 4: Navegando entre telas com React Navigation

   Continuação direta da aula 3: o app tem três telas (Login, Cadastro e
   Lista de tarefas) e troca entre elas com um `useState('tela')` e uma
   sequência de `if` dentro do App.tsx. Funciona, mas é navegação de
   mentira: não tem pilha, não tem botão de voltar, não tem animação, não
   tem gesto, e cada tela nova exige mais props de callback.

   Hoje entra a PRIMEIRA biblioteca externa do curso: o React Navigation.
   A aula começa pela TEORIA (o que é uma pilha de navegação, quem são o
   NavigationContainer, o Navigator e o Screen, o que a prop `navigation`
   oferece) e só depois ajusta o código, tela por tela, pra usar
   `navigation.navigate` no lugar das props de callback.

   Formato igual ao das aulas anteriores: a apresentação PARA em cartões
   roxos de desafio; a turma tenta sozinha antes de ver a solução sendo
   digitada.

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* =========================================================================
   PONTO DE PARTIDA, o resultado da aula 3 já está no projeto.
   A aula de hoje começa com estes cinco arquivos prontos na árvore.
   ========================================================================= */
const INITIAL_ENTRIES = [
  {path:'App.tsx', type:'file'},
  {path:'src', type:'dir'},
  {path:'src/data', type:'dir'},
  {path:'src/data/tarefas.ts', type:'file'},
  {path:'src/screens', type:'dir'},
  {path:'src/screens/LoginScreen.tsx', type:'file'},
  {path:'src/screens/CadastroScreen.tsx', type:'file'},
  {path:'src/screens/tarefas', type:'dir'},
  {path:'src/screens/tarefas/ListaTarefasScreen.tsx', type:'file'},
];

const INITIAL_FILES = {
'App.tsx':
`import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';
import { TAREFAS_MOCK } from './src/data/tarefas';

export default function App() {
  const [tela, setTela] = useState('login');
  const [conta, setConta] = useState({ usuario: '', senha: '' });

  function cadastrar(usuario: string, senha: string) {
    setConta({ usuario: usuario, senha: senha });
    setTela('login');
  }

  if (tela === 'cadastro') {
    return <CadastroScreen aoCadastrar={cadastrar} aoVoltar={() => setTela('login')} />;
  }

  if (tela === 'lista') {
    return <ListaTarefasScreen tarefas={TAREFAS_MOCK} aoSair={() => setTela('login')} />;
  }

  return <LoginScreen conta={conta} aoCriarConta={() => setTela('cadastro')} aoLogar={() => setTela('lista')} />;
}
`,
'src/screens/LoginScreen.tsx':
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Props = {
  conta: { usuario: string; senha: string };
  aoCriarConta: () => void;
  aoLogar: () => void;
};

export default function LoginScreen({ conta, aoCriarConta, aoLogar }: Props) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }
    if (usuario !== conta.usuario || senha !== conta.senha) {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
      return;
    }
    Alert.alert('Bem-vindo!', \`Login efetuado como \${usuario}.\`);
    aoLogar();
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

      <TouchableOpacity onPress={aoCriarConta}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
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
  link: { color: '#2e6de6', textAlign: 'center', marginTop: 16 },
});
`,
'src/screens/CadastroScreen.tsx':
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Props = {
  aoCadastrar: (usuario: string, senha: string) => void;
  aoVoltar: () => void;
};

export default function CadastroScreen({ aoCadastrar, aoVoltar }: Props) {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

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
    aoCadastrar(usuario, senha);
  }

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

      <TouchableOpacity onPress={handleCadastrar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={aoVoltar}>
        <Text style={styles.link}>Já tenho conta, voltar</Text>
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
  link: { color: '#2e6de6', textAlign: 'center', marginTop: 16 },
});
`,
'src/data/tarefas.ts':
`export type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
};

export const TAREFAS_MOCK: Tarefa[] = [
  { id: '1', titulo: 'Estudar React Native', concluida: true },
  { id: '2', titulo: 'Terminar o cadastro do app', concluida: true },
  { id: '3', titulo: 'Criar a tela de listagem', concluida: false },
  { id: '4', titulo: 'Revisar os desafios de casa', concluida: false },
  { id: '5', titulo: 'Tomar um café', concluida: false },
];
`,
'src/screens/tarefas/ListaTarefasScreen.tsx':
`import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Tarefa } from '../../data/tarefas';

type Props = {
  tarefas: Tarefa[];
  aoSair: () => void;
};

export default function ListaTarefasScreen({ tarefas, aoSair }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minhas tarefas</Text>
        <TouchableOpacity onPress={aoSair}>
          <Text style={styles.link}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(tarefa) => tarefa.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={item.concluida ? styles.status : styles.statusPendente}>
              {item.concluida ? 'Concluída' : 'Pendente'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  link: { color: '#2e6de6' },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitulo: { fontSize: 16 },
  status: { color: '#2e6de6', fontWeight: 'bold' },
  statusPendente: { color: '#999' },
});
`,
};

/* Dependências mostradas na lateral. Acendem a partir do slide de
   instalação (índice 7, a etapa que fecha a parte teórica). */
const DEP_STEP = 7;
const DEPS = [
  {name:'@react-navigation/native', ver:'^7.1.17'},
  {name:'@react-navigation/native-stack', ver:'^7.3.26'},
  {name:'react-native-screens', ver:'~4.16.0'},
  {name:'react-native-safe-area-context', ver:'~5.6.0'},
];

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert | clear
   ========================================================================= */
const STEPS = [

/* ----------------------------------------------------------------------
   PARTE 1: De onde partimos (índices 0 a 2)
   ---------------------------------------------------------------------- */
{
  part:'De onde partimos', op:'intro',
  title:'Navegando entre telas',
  eyebrow:'Aula 4 · React Native',
  md:
`Hoje o app troca de tela com um \`useState\` e uma fila de \`if\` dentro do \`App.tsx\`. Funciona, mas não é navegação de verdade: não existe histórico, nem botão de voltar, nem gesto, nem animação.

- **Teoria primeiro:** o que é uma **pilha** de navegação e quem são o \`NavigationContainer\`, o \`Stack.Navigator\` e o \`Stack.Screen\`.
- **Depois o código:** ajustar as três telas pra trocar as props de callback (\`aoLogar\`, \`aoVoltar\`, \`aoSair\`) por \`navigation.navigate\`.
- **Primeira biblioteca externa do curso:** até aqui foi tudo React Native puro; o React Navigation é a primeira dependência que a turma instala.

> Nos cartões **roxos de desafio** a aula para e é a vez da turma tentar. **→** avança · **←** volta · **↑ ↓** mudam a velocidade.`
},
{
  part:'De onde partimos', op:'note',
  title:'Como o app navega hoje',
  md:
`Clique no \`App.tsx\` na barra lateral. A "navegação" atual cabe em três pedaços:

\`\`\`tsx
const [tela, setTela] = useState('login');

if (tela === 'cadastro') { return <CadastroScreen ... />; }
if (tela === 'lista')    { return <ListaTarefasScreen ... />; }
return <LoginScreen ... />;
\`\`\`

- Uma **string** no estado (\`'login'\`, \`'cadastro'\`, \`'lista'\`) diz qual tela está no ar.
- Cada tela recebe **funções por prop** (\`aoLogar\`, \`aoCriarConta\`, \`aoVoltar\`, \`aoSair\`) só pra conseguir pedir a troca de tela.
- Quem manda em tudo é o \`App.tsx\`: ele é dono do estado, das funções e dos \`if\`.

> Isso foi ótimo pra entender props e estado, que era o objetivo daquela aula. Mas repare: **existe uma tela por vez e só**. Não existe "a tela anterior".`
},
{
  part:'De onde partimos', op:'note',
  title:'Onde a navegação manual trava',
  md:
`Cinco problemas que não dá pra resolver com mais \`if\`:

1. **Sem histórico.** O app não sabe de onde o usuário veio, só onde ele está. Voltar só funciona se alguém programar um botão específico pra isso, em cada tela.
2. **O botão voltar do Android não faz nada** (ou fecha o app), e o gesto de arrastar da borda no iOS também não. Os dois falam com a pilha de navegação do sistema, que o app não tem.
3. **Sem cabeçalho e sem animação.** Toda tela troca instantaneamente, e cada uma precisa desenhar o próprio título na mão.
4. **O \`App.tsx\` cresce sem parar.** Cada tela nova é mais um valor de estado, mais um \`if\`, mais um punhado de props de callback.
5. **As props de navegação viajam.** Um botão enterrado três componentes abaixo só consegue navegar se as funções descerem, prop por prop, até ele.

> Por isso praticamente todo app React Native usa uma biblioteca de navegação, e a mais usada é o **React Navigation**. Antes de instalar, a teoria: entender a pilha resolve 90% das dúvidas depois.`
},

/* ----------------------------------------------------------------------
   PARTE 2: A teoria (índices 3 a 6)
   ---------------------------------------------------------------------- */
{
  part:'Teoria: a pilha', op:'note',
  title:'Navegação é uma pilha',
  md:
`**Pilha** (stack) é a estrutura por trás da navegação de qualquer app de celular. Pense numa pilha de papéis na mesa: só dá pra ver o de cima, e só dá pra tirar o de cima.

- **Empilhar** (push): abrir uma tela nova. Ela entra por cima; a anterior continua ali embaixo, intacta.
- **Desempilhar** (pop): voltar. A de cima sai e a de baixo reaparece **do jeito que estava**, com o texto digitado, a rolagem, tudo.

\`\`\`
[ Login ]            [ Cadastro ]           [ Login ]
                     [ Login    ]
 abriu o app          navegou p/ Cadastro    voltou
 1 tela na pilha      2 telas na pilha       1 tela na pilha
\`\`\`

Essa pilha é o histórico que falta no app hoje. É dela que saem, de graça, o botão de voltar no cabeçalho, o gesto de arrastar da borda, o botão físico de voltar do Android e a animação de deslizar.

> A pilha pertence ao **navegador**, não a uma tela. Nenhuma tela precisa saber quem veio antes dela: ela só pede "me leva pra rota X" ou "me tira daqui".`
},
{
  part:'Teoria: a pilha', op:'note',
  title:'As três peças do React Navigation',
  md:
`A biblioteca se monta com três componentes encaixados:

\`\`\`tsx
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Cadastro" component={CadastroScreen} />
  </Stack.Navigator>
</NavigationContainer>
\`\`\`

1. **\`NavigationContainer\`**, envolve o app inteiro e guarda o estado da navegação: quais telas existem na pilha e em que ordem. Aparece uma vez só, no topo de tudo.
2. **\`Stack.Navigator\`**, criado por \`createNativeStackNavigator()\`. É a pilha em si: decide qual tela está visível, desenha o cabeçalho e anima a transição.
3. **\`Stack.Screen\`**, cada rota. Um \`name\` (o apelido usado pra navegar) e um \`component\` (a tela a renderizar). A primeira da lista é a inicial, a não ser que \`initialRouteName\` diga outra coisa.

> Repare no que sumiu: **nenhum \`if\`**. A lista de \`Stack.Screen\` é o mapa de rotas do app, declarado uma vez; quem escolhe o que mostrar é o navigator.`
},
{
  part:'Teoria: a pilha', op:'note',
  title:'A prop navigation, o centro da aula',
  md:
`Toda tela registrada num \`Stack.Screen\` recebe **de graça** duas props que ninguém passou na mão: \`navigation\` e \`route\`. Elas vêm do navigator.

\`\`\`tsx
export default function LoginScreen({ navigation }) {
  // dentro de qualquer onPress:
  navigation.navigate('Cadastro');
}
\`\`\`

O que dá pra pedir pra \`navigation\`:

- **\`navigate('Cadastro')\`**, o método do dia. Vai pra rota \`Cadastro\`: se ela ainda não está na pilha, **empilha**; se já está, **volta** até ela em vez de abrir uma segunda cópia.
- **\`goBack()\`**, desempilha a tela atual. É exatamente o que a seta do cabeçalho faz.
- **\`push('Cadastro')\`**, empilha **sempre**, mesmo que a rota já esteja na pilha. Útil em tela de detalhe que abre outra tela de detalhe.
- **\`replace('Lista')\`**, troca a tela atual pela nova: a atual sai da pilha, então não dá mais pra voltar pra ela.
- **\`popToTop()\`**, volta direto pra primeira tela da pilha e descarta todo o resto.

> \`navigate\` resolve quase tudo. A diferença pro \`push\` só aparece quando a mesma rota pode aparecer duas vezes na pilha, e a do \`replace\` quando você **não quer** que dê pra voltar.`
},
{
  part:'Teoria: a pilha', op:'note',
  title:'Levando dados junto: os params',
  md:
`Navegar não serve só pra trocar de tela, serve pra **levar dado** até ela. O segundo argumento do \`navigate\` é um objeto livre, os **params** da rota:

\`\`\`tsx
// quem manda
navigation.navigate('Login', { usuario: 'ana', senha: '1234' });

// quem recebe
export default function LoginScreen({ route }) {
  const conta = route.params;   // { usuario: 'ana', senha: '1234' }
}
\`\`\`

- \`route.params\` é o que veio junto na navegação. Se ninguém mandou nada, é \`undefined\`, então sempre vale checar antes de usar.
- Se a rota de destino **já está na pilha**, o \`navigate\` volta até ela **e atualiza os params**. É assim que o cadastro vai devolver a conta criada pra tela de login, hoje à tarde.
- **Params são pra dado pequeno**: um id, um nome, um filtro. Estado que o app inteiro compartilha (a lista de tarefas, o usuário logado) pede outra solução, e isso é assunto da próxima aula.

> Isso substitui o \`conta\` que hoje mora num \`useState\` no \`App.tsx\`: em vez de subir o dado pro pai e ele passar pra baixo, a tela manda o dado **junto com a navegação**.`
},

/* ----------------------------------------------------------------------
   PARTE 3: Instalando (índice 7, DEP_STEP)
   ---------------------------------------------------------------------- */
{
  part:'Instalando', op:'note',
  title:'Instalando o React Navigation',
  md:
`Primeira dependência externa do curso. No terminal, dentro da pasta do projeto:

\`\`\`bash
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
\`\`\`

- **\`@react-navigation/native\`**, o núcleo: o \`NavigationContainer\` e toda a mecânica da prop \`navigation\`.
- **\`@react-navigation/native-stack\`**, a pilha que usa o componente de navegação **nativo** de cada sistema. É por isso que a animação e o cabeçalho têm cara de app de verdade, e não de página web.
- **\`react-native-screens\`** e **\`react-native-safe-area-context\`**, exigidas pelos dois de cima: telas nativas e respeito à área segura (recorte da câmera, barra de status).

Por que \`npx expo install\` e não \`npm install\`? Porque o \`expo install\` escolhe a **versão compatível com o SDK do projeto**. O \`npm install\` pega sempre a mais recente, que pode não bater com a versão do Expo e quebrar o app na hora de abrir.

> No **Expo Snack** não precisa instalar nada: basta importar a biblioteca no código que ele resolve sozinho. Olhe a lateral: as quatro dependências acabaram de acender.`
},

/* ----------------------------------------------------------------------
   PARTE 4: O mapa de rotas (índices 8 a 15)
   ---------------------------------------------------------------------- */
{
  part:'O mapa de rotas', op:'note',
  title:'Dando nome (e tipo) às rotas',
  md:
`Antes de montar o navigator, um passo que o TypeScript agradece: declarar **quais rotas existem** e **o que cada uma recebe de params**.

\`\`\`tsx
export type RootStackParamList = {
  Login: { usuario: string; senha: string } | undefined;
  Cadastro: undefined;
  Lista: undefined;
};
\`\`\`

- Cada chave é o \`name\` de um \`Stack.Screen\`. Com isso, escrever \`navigation.navigate('Lst')\` vira **erro na hora de digitar**, em vez de um botão que não faz nada no celular.
- O valor descreve os params. \`undefined\` quer dizer "essa rota não recebe nada".
- \`Login\` usa uma novidade de TypeScript, o \`|\` (union): **ou** recebe uma conta, **ou** \`undefined\`, porque na primeira abertura do app ninguém se cadastrou ainda.

> Esse tipo vai num arquivo só dele, \`src/navigation/tipos.ts\`, porque o \`App.tsx\` e as três telas vão importar dele.`
},
{
  part:'O mapa de rotas', op:'challenge', time:'7 min',
  title:'Monte o mapa de rotas',
  md:
`Com a biblioteca instalada, ajuste o \`App.tsx\` pra ele virar **só** o mapa de rotas, sem estado e sem \`if\`:

1. Crie \`src/navigation/tipos.ts\` exportando \`RootStackParamList\` com as três rotas: \`Login\` (recebe \`{ usuario: string; senha: string }\` ou \`undefined\`), \`Cadastro\` e \`Lista\` (sem params).
2. No \`App.tsx\`, importe \`NavigationContainer\` de \`@react-navigation/native\` e \`createNativeStackNavigator\` de \`@react-navigation/native-stack\`.
3. Crie a pilha **fora** do componente: \`const Stack = createNativeStackNavigator<RootStackParamList>();\`
4. O \`App\` passa a retornar só o \`NavigationContainer\`, com o \`Stack.Navigator\` dentro e três \`Stack.Screen\`: \`Login\`, \`Cadastro\` e \`Lista\`.
5. Apague o que sobrou: os dois \`useState\`, a função \`cadastrar\` e os \`if\`. Quem faz esse trabalho agora é o navigator.

> O TypeScript vai reclamar das três telas, elas ainda esperam props (\`conta\`, \`aoLogar\`, \`aoVoltar\`…) que ninguém passa mais. É esperado; a Parte 5 arruma isso.`
},
{
  part:'O mapa de rotas', op:'file', target:'src/navigation/tipos.ts',
  title:'Criar src/navigation/tipos.ts',
  explain:'Pasta nova, <code>src/navigation/</code>, criada junto com o arquivo. Aqui só moram tipos, nenhum componente.'
},
{
  part:'O mapa de rotas', op:'code', file:'src/navigation/tipos.ts',
  title:'As rotas do app, em tipo',
  explain:'<code>| undefined</code> diz que a rota <b>pode</b> ser aberta sem params: é o caso do Login quando o app acabou de abrir.',
  code:
`export type RootStackParamList = {
  Login: { usuario: string; senha: string } | undefined;
  Cadastro: undefined;
  Lista: undefined;
};
`
},
{
  part:'O mapa de rotas', op:'replace', file:'App.tsx',
  title:'Os imports da biblioteca',
  explain:'O <code>useState</code> sai do import do React na mesma linha em que entram as duas peças da biblioteca: o <code>App</code> não vai mais guardar estado nenhum.',
  find:
`import React, { useState } from 'react';
`,
  code:
`import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
`
},
{
  part:'O mapa de rotas', op:'replace', file:'App.tsx',
  title:'O mock dá lugar à pilha',
  explain:'<code>createNativeStackNavigator</code> é chamado <b>fora</b> do componente, uma vez só: lá dentro, uma pilha nova nasceria a cada renderização, e a navegação se perderia.',
  find:
`import { TAREFAS_MOCK } from './src/data/tarefas';
`,
  code:
`import { RootStackParamList } from './src/navigation/tipos';

const Stack = createNativeStackNavigator<RootStackParamList>();
`
},
{
  part:'O mapa de rotas', op:'replace', file:'App.tsx',
  title:'O App perde o estado',
  explain:'Os dois <code>useState</code> e a função <code>cadastrar</code> somem sem substituto: quem controla a tela agora é a pilha, e a conta vai viajar pelos params da rota.',
  find:
`  const [tela, setTela] = useState('login');
  const [conta, setConta] = useState({ usuario: '', senha: '' });

  function cadastrar(usuario: string, senha: string) {
    setConta({ usuario: usuario, senha: senha });
    setTela('login');
  }

`
},
{
  part:'O mapa de rotas', op:'replace', file:'App.tsx',
  title:'Os três if viram três rotas',
  explain:'A troca que resume a parte: sai o código que <b>decide</b> qual tela mostrar, entra o que <b>declara</b> quais telas existem. <code>headerBackVisible: false</code> esconde a seta de voltar na lista, sair da conta é pelo botão "Sair".',
  find:
`  if (tela === 'cadastro') {
    return <CadastroScreen aoCadastrar={cadastrar} aoVoltar={() => setTela('login')} />;
  }

  if (tela === 'lista') {
    return <ListaTarefasScreen tarefas={TAREFAS_MOCK} aoSair={() => setTela('login')} />;
  }

  return <LoginScreen conta={conta} aoCriarConta={() => setTela('cadastro')} aoLogar={() => setTela('lista')} />;
`,
  code:
`  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Criar conta' }}
        />
        <Stack.Screen
          name="Lista"
          component={ListaTarefasScreen}
          options={{ title: 'Minhas tarefas', headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
`
},
{
  part:'O mapa de rotas', op:'note',
  title:'O que o navigator já dá de graça',
  md:
`O \`App.tsx\` inteiro virou uma declaração: estas são as rotas, estas são as telas. Nenhum estado, nenhum \`if\`, nenhuma prop de navegação.

Rodando assim, mesmo com as telas ainda escritas no modelo antigo, já aparece:

- Um **cabeçalho nativo** no Cadastro e na Lista, com o título que o \`options\` definiu.
- Uma **seta de voltar** no cabeçalho do Cadastro, funcionando, sem ninguém ter programado nada.
- O **gesto de arrastar da borda** no iOS e o **botão voltar** do Android, os dois ligados na mesma pilha.
- A **animação** de entrar e sair de tela.

Falta a outra metade: as três telas ainda pedem \`conta\`, \`aoLogar\`, \`aoCriarConta\`, \`aoVoltar\`, \`aoSair\` e \`tarefas\` por prop. Ninguém passa mais nada disso.

> É esse ajuste, trocar prop de callback por \`navigation\`, que fecha a aula.`
},

/* ----------------------------------------------------------------------
   PARTE 5: As telas usam navigation (índices 16 a 32)
   ---------------------------------------------------------------------- */
{
  part:'As telas navegam', op:'note',
  title:'O ajuste, sempre o mesmo',
  md:
`Em cada uma das três telas, três passos:

**1.** O \`type Props\` escrito na mão vira um tipo que a própria biblioteca fornece:

\`\`\`tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/tipos';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
\`\`\`

\`NativeStackScreenProps\` recebe o mapa de rotas e o **nome desta rota**, e daí tipa sozinho o \`navigation\` e o \`route.params\` dela.

**2.** A desestruturação troca as props antigas por \`{ navigation }\` (mais \`route\`, quando a tela lê params).

**3.** Cada chamada de callback vira uma chamada de navegação:

- \`aoCriarConta()\` vira \`navigation.navigate('Cadastro')\`
- \`aoLogar()\` vira \`navigation.navigate('Lista')\`
- \`aoVoltar()\` vira \`navigation.goBack()\`
- \`aoSair()\` vira \`navigation.popToTop()\`

> As telas ficam **mais independentes**: nenhuma depende mais de um pai que saiba montar as props certas. Dá pra abrir qualquer uma delas a partir de qualquer lugar do app.`
},
{
  part:'As telas navegam', op:'challenge', time:'6 min',
  title:'LoginScreen com navigation',
  md:
`Ajuste \`src/screens/LoginScreen.tsx\`:

1. Importe \`NativeStackScreenProps\` e \`RootStackParamList\`, e troque o \`type Props\` escrito na mão por \`NativeStackScreenProps<RootStackParamList, 'Login'>\`.
2. Receba \`{ navigation, route }\` no lugar de \`{ conta, aoCriarConta, aoLogar }\`.
3. A conta agora chega pela navegação: \`const conta = route.params;\`
4. No \`handleLogin\`, lembre que \`conta\` pode ser \`undefined\` (ninguém se cadastrou ainda). Esse caso também é "usuário ou senha inválidos".
5. Troque \`aoLogar()\` por \`navigation.navigate('Lista')\` e o \`onPress\` do link por \`() => navigation.navigate('Cadastro')\`.

> O \`StyleSheet\` e os campos do formulário não mudam nada. Só o topo do arquivo e os dois \`onPress\`.`
},
{
  part:'As telas navegam', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:`import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';`,
  title:'Os dois imports novos',
  explain:'A tela existente continua inteira na tela; a partir daqui a aula só <b>ajusta</b> pedaços dela. Estas duas linhas entram logo abaixo do import do react-native.',
  code:
`import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/tipos';
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/LoginScreen.tsx',
  title:'As props escritas na mão dão lugar às da biblioteca',
  explain:'<code>NativeStackScreenProps&lt;RootStackParamList, \'Login\'&gt;</code> lê o mapa de rotas e descobre sozinho que, aqui, <code>route.params</code> é uma conta ou <code>undefined</code>. Quatro linhas viram uma.',
  find:
`type Props = {
  conta: { usuario: string; senha: string };
  aoCriarConta: () => void;
  aoLogar: () => void;
};
`,
  code:
`type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/LoginScreen.tsx',
  title:'A assinatura recebe navigation e route',
  explain:'As três props antigas somem da desestruturação. Ninguém passa <code>navigation</code> e <code>route</code> pra essa tela: elas chegam porque ela é um <code>Stack.Screen</code>.',
  find:
`export default function LoginScreen({ conta, aoCriarConta, aoLogar }: Props) {
`,
  code:
`export default function LoginScreen({ navigation, route }: Props) {
`
},
{
  part:'As telas navegam', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:`  const [senha, setSenha] = useState('');`,
  title:'A conta passa a vir dos params',
  explain:'O resto do arquivo continua usando a variável <code>conta</code> exatamente como antes. Só mudou de onde ela vem: era prop do pai, virou params da rota.',
  code:
`  const conta = route.params;
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/LoginScreen.tsx',
  title:'Uma checagem a mais na validação',
  explain:'<code>!conta</code> cobre a primeira abertura do app, quando ninguém se cadastrou ainda e <code>route.params</code> é <code>undefined</code>. Sem isso o TypeScript reclama, com razão.',
  find:
`    if (usuario !== conta.usuario || senha !== conta.senha) {
`,
  code:
`    if (!conta || usuario !== conta.usuario || senha !== conta.senha) {
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/LoginScreen.tsx',
  title:'Entrar: de callback para navegação',
  explain:'A primeira troca de verdade: em vez de avisar o pai com <code>aoLogar()</code>, a tela empilha a rota <code>Lista</code> por conta própria.',
  find:
`    aoLogar();
`,
  code:
`    navigation.navigate('Lista');
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/LoginScreen.tsx',
  title:'E o link de cadastro, idem',
  explain:'Último ajuste da tela: o <code>onPress</code> chama <code>navigation.navigate(\'Cadastro\')</code> direto. O JSX dos campos e o <code>StyleSheet</code> não mudaram nem uma vírgula.',
  find:
`      <TouchableOpacity onPress={aoCriarConta}>
`,
  code:
`      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
`
},
{
  part:'As telas navegam', op:'challenge', time:'7 min',
  title:'Cadastro e Lista, mesmo roteiro',
  md:
`**\`src/screens/CadastroScreen.tsx\`**

1. \`type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;\` e receba \`{ navigation }\`.
2. No fim do \`handleCadastrar\`, em vez de \`aoCadastrar(usuario, senha)\`, **navegue levando a conta**: \`navigation.navigate('Login', { usuario: usuario, senha: senha })\`. Como \`Login\` já está na pilha, isso volta pra ela **e** entrega os params.
3. O link "Já tenho conta, voltar" chama \`navigation.goBack()\`.
4. Apague o \`<Text style={styles.titulo}>Criar conta</Text>\` do corpo: o cabeçalho nativo já mostra esse título. Tire também \`titulo\` do \`StyleSheet\`, ninguém mais usa.

**\`src/screens/tarefas/ListaTarefasScreen.tsx\`**

1. \`type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;\` e receba \`{ navigation }\`.
2. A tela não recebe mais \`tarefas\` por prop, o \`App.tsx\` não tem mais estado: importe \`TAREFAS_MOCK\` de \`../../data/tarefas\` e use direto no \`data\` do \`FlatList\`.
3. "Sair" chama \`navigation.popToTop()\`, que volta pro Login descartando a pilha.
4. Tire o título duplicado do cabeçalho, igual ao Cadastro, e deixe o "Sair" sozinho, alinhado à direita.

> A lista importar o mock direto é uma **regressão proposital**: virou rota, deixou de receber props do pai. Compartilhar estado entre rotas é exatamente o assunto da próxima aula.`
},
{
  part:'As telas navegam', op:'insert', file:'src/screens/CadastroScreen.tsx',
  after:`import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';`,
  title:'Cadastro: os mesmos dois imports',
  explain:'Exatamente as mesmas duas linhas do login. O caminho do <code>tipos</code> é o mesmo porque as duas telas moram na mesma pasta.',
  code:
`import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/tipos';
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/CadastroScreen.tsx',
  title:'O tipo das props, agora da rota',
  explain:'Mesma troca do login, com o nome da rota trocado. Aqui a tela só vai precisar de <code>navigation</code>: ela <b>manda</b> params, não recebe.',
  find:
`type Props = {
  aoCadastrar: (usuario: string, senha: string) => void;
  aoVoltar: () => void;
};
`,
  code:
`type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/CadastroScreen.tsx',
  title:'A assinatura recebe navigation',
  explain:'Sem <code>route</code> na desestruturação: essa tela não lê params, então não há motivo pra pedir o que não vai usar.',
  find:
`export default function CadastroScreen({ aoCadastrar, aoVoltar }: Props) {
`,
  code:
`export default function CadastroScreen({ navigation }: Props) {
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/CadastroScreen.tsx',
  title:'A linha que resume a aula',
  explain:'<code>navigate(\'Login\', {...})</code> encontra o Login <b>que já está na pilha</b>, volta até ele e entrega a conta nos params. O dado viaja junto com a navegação, sem passar pelo pai. O resto do <code>handleCadastrar</code>, as três validações, ficou intacto.',
  find:
`    aoCadastrar(usuario, senha);
`,
  code:
`    navigation.navigate('Login', { usuario: usuario, senha: senha });
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/CadastroScreen.tsx',
  title:'Fora o título duplicado',
  explain:'Some só o <code>&lt;Text&gt;</code> com "Criar conta", sem nada no lugar: quem mostra esse título agora é o cabeçalho nativo, definido no <code>options</code> da rota.',
  find:
`      <Text style={styles.titulo}>Criar conta</Text>

`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/CadastroScreen.tsx',
  title:'Voltar vira goBack',
  explain:'<code>goBack()</code> desempilha a tela atual, é literalmente o que a seta do cabeçalho faz. O link e a seta agora são dois caminhos pra mesma coisa.',
  find:
`      <TouchableOpacity onPress={aoVoltar}>
`,
  code:
`      <TouchableOpacity onPress={() => navigation.goBack()}>
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/CadastroScreen.tsx',
  title:'E o estilo que ficou órfão',
  explain:'O <code>titulo</code> sai da folha de estilos junto com o <code>&lt;Text&gt;</code> que o usava. Estilo sem dono é lixo que atrapalha quem for ler o arquivo depois.',
  find:
`  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Lista: o import do tipo vira três',
  explain:'O tipo <code>Tarefa</code> sai (ninguém tipa mais uma prop de lista aqui) e entram os dois da navegação mais o <code>TAREFAS_MOCK</code>, que agora a própria tela busca.',
  find:
`import { Tarefa } from '../../data/tarefas';
`,
  code:
`import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/tipos';
import { TAREFAS_MOCK } from '../../data/tarefas';
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O tipo das props, pela terceira vez',
  explain:'Mesmo padrão das outras duas telas. Na terceira repetição já dá pra perguntar pra turma o que vem antes de digitar.',
  find:
`type Props = {
  tarefas: Tarefa[];
  aoSair: () => void;
};
`,
  code:
`type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'A assinatura perde as duas props',
  explain:'Some <code>tarefas</code> junto com <code>aoSair</code>: o <code>App.tsx</code> não tem mais estado nenhum pra passar pra cá.',
  find:
`export default function ListaTarefasScreen({ tarefas, aoSair }: Props) {
`,
  code:
`export default function ListaTarefasScreen({ navigation }: Props) {
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O cabeçalho perde o título e ganha o popToTop',
  explain:'O título sai (o cabeçalho nativo já mostra "Minhas tarefas") e o "Sair" chama <code>popToTop()</code>, que descarta a pilha e volta pro Login: ninguém deveria conseguir voltar pra lista depois de sair.',
  find:
`        <Text style={styles.titulo}>Minhas tarefas</Text>
        <TouchableOpacity onPress={aoSair}>
`,
  code:
`        <TouchableOpacity onPress={() => navigation.popToTop()}>
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'A FlatList lê o mock direto',
  explain:'Uma palavra de diferença, e é a regressão que a aula assume: o dado deixou de vir de fora. <b>Toda</b> a <code>FlatList</code> em volta, <code>keyExtractor</code> e <code>renderItem</code>, continua igual à da aula passada.',
  find:
`        data={tarefas}
`,
  code:
`        data={TAREFAS_MOCK}
`
},
{
  part:'As telas navegam', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Último ajuste: o cabeçalho encolheu',
  explain:'Com uma coisa só na linha, <code>space-between</code> não faz mais sentido: <code>flex-end</code> empurra o "Sair" pra direita. O <code>titulo</code> sai da folha de estilos, como no cadastro.',
  find:
`    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: { fontSize: 24, fontWeight: 'bold' },
`,
  code:
`    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
`
},

/* ----------------------------------------------------------------------
   PARTE 6: Fechamento (índices 33 e 34)
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'note',
  title:'Teste o fluxo inteiro',
  md:
`Recarregue o app e siga o roteiro, pensando na **pilha** a cada passo:

1. **Login → "Não tem conta? Cadastre-se"**: a tela desliza da direita e aparece um cabeçalho "Criar conta" com uma seta de voltar que ninguém programou. Pilha: \`Login → Cadastro\`.
2. **Arraste da borda** (ou toque na seta, ou use o botão voltar do Android): volta pro Login **com o que já estava digitado**. A tela não foi recriada, ela só reapareceu, estava ali embaixo o tempo todo.
3. **Cadastre uma conta**: depois do alerta, o app volta sozinho pro Login, porque \`navigate('Login', ...)\` encontrou o Login na pilha, voltou até ele e entregou usuário e senha nos params.
4. **Entre com essa conta**: vai pra lista, com cabeçalho "Minhas tarefas" e **nenhuma** seta de voltar, foi o \`headerBackVisible: false\`.
5. **"Sair"**: \`popToTop()\` limpa a pilha e volta pro Login. Repare que a conta cadastrada **continua valendo**: ela está nos params da rota Login, que nunca saiu da pilha.

> Teste também o erro: feche e reabra o app, e tente entrar sem se cadastrar. \`route.params\` é \`undefined\`, e o \`!conta\` do \`handleLogin\` segura o caso.`
},
{
  part:'Fechamento', op:'outro',
  title:'Navegação de verdade',
  md:
`O \`App.tsx\` saiu de um punhado de estado e \`if\` pra um mapa de rotas declarativo, e o app ganhou histórico, botão de voltar, gesto, cabeçalho e animação, sem uma linha de interface a mais.

## Conceitos de hoje
Pilha de navegação (empilhar e desempilhar), \`NavigationContainer\`, \`createNativeStackNavigator\`, \`Stack.Navigator\` e \`Stack.Screen\`, a prop \`navigation\` (\`navigate\`, \`goBack\`, \`push\`, \`replace\`, \`popToTop\`), params de rota (\`route.params\`), \`options\` de cabeçalho (\`title\`, \`headerShown\`, \`headerBackVisible\`), rotas tipadas com \`RootStackParamList\` e \`NativeStackScreenProps\`, e instalar dependência com \`npx expo install\`.

## Desafios pra casa
1. **Tela "Sobre"**: crie uma quarta rota, com um texto qualquer, e um link pra ela na tela de login. Não esqueça de acrescentá-la ao \`RootStackParamList\`.
2. **Boas-vindas com params**: mande o usuário logado como param da rota \`Lista\` (\`navigate('Lista', { usuario })\`) e mostre "Olá, fulano" no topo da lista.
3. **\`replace\` no lugar de \`navigate\`**: troque o \`navigate('Lista')\` do login por \`replace('Lista')\`. O que acontece com o botão "Sair", e por quê? (Pense no que sobrou na pilha.)
4. **Cabeçalho com a cara do app**: use \`screenOptions\` no \`Stack.Navigator\` pra mudar a cor de fundo (\`headerStyle\`) e a cor do texto (\`headerTintColor\`) do cabeçalho das três rotas de uma vez.
5. **(avançado, gancho pra próxima aula)** Pesquise \`useNavigation\`: como um componente lá no fundo da árvore, que não é uma tela, consegue navegar sem receber \`navigation\` por prop.

> Entrega: o link do Snack com as três rotas funcionando, indo e voltando pelo cabeçalho, pelo gesto e pelos botões.`
},
];

global.AULA_USANDO_REACT_NAVIGATION = {
  meta: {
    titulo:    'Navegando entre telas (React Navigation)',
    projeto:   'usando-react-navigation',
    subtitulo: 'React Native · @react-navigation/native-stack',
    vazio:     'Projeto da aula 3.<br>Login, cadastro e lista de tarefas já prontos.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências novas', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
