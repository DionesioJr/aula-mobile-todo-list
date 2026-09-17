/* =========================================================================
   AULA 5: Editando tarefas (CRUD sobre as rotas da aula 4)

   Continuação direta da aula 4: o app já navega com React Navigation, mas a
   lista de tarefas mostra um mock imutável que a própria tela importa. Hoje
   a turma completa o CRUD: criar, editar, concluir e excluir uma tarefa de
   verdade (em memória, sem API, sem banco).

   Os dois conceitos novos se encaixam:
   1. LISTA COMO ESTADO e atualização imutável (.map/.filter/spread), o
      coração da aula;
   2. como uma ROTA recebe props e params: a tarefa a editar viaja em
      `navigate('Formulario', { tarefa })`, e o estado compartilhado desce
      pela forma de função do <Stack.Screen>. É a resposta à pergunta que a
      aula 4 deixou aberta.

   Formato igual ao das aulas anteriores: a apresentação PARA em cartões
   roxos de desafio, e o código que já existe é AJUSTADO no lugar (etapas
   `replace`/`insert`), nunca apagado e redigitado. Só a tela nova,
   FormularioTarefaScreen, é escrita do zero, porque não existia.

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* =========================================================================
   PONTO DE PARTIDA, o resultado da aula 4 já está no projeto.
   A aula de hoje começa com estes seis arquivos prontos na árvore.
   ========================================================================= */
const INITIAL_ENTRIES = [
  {path:'App.tsx', type:'file'},
  {path:'src', type:'dir'},
  {path:'src/data', type:'dir'},
  {path:'src/data/tarefas.ts', type:'file'},
  {path:'src/navigation', type:'dir'},
  {path:'src/navigation/tipos.ts', type:'file'},
  {path:'src/screens', type:'dir'},
  {path:'src/screens/LoginScreen.tsx', type:'file'},
  {path:'src/screens/CadastroScreen.tsx', type:'file'},
  {path:'src/screens/tarefas', type:'dir'},
  {path:'src/screens/tarefas/ListaTarefasScreen.tsx', type:'file'},
];

const INITIAL_FILES = {
'App.tsx':
`import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';
import { RootStackParamList } from './src/navigation/tipos';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
}
`,
'src/navigation/tipos.ts':
`export type RootStackParamList = {
  Login: { usuario: string; senha: string } | undefined;
  Cadastro: undefined;
  Lista: undefined;
};
`,
'src/screens/LoginScreen.tsx':
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/tipos';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation, route }: Props) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const conta = route.params;

  function handleLogin() {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }
    if (!conta || usuario !== conta.usuario || senha !== conta.senha) {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
      return;
    }
    Alert.alert('Bem-vindo!', \`Login efetuado como \${usuario}.\`);
    navigation.navigate('Lista');
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

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/tipos';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function CadastroScreen({ navigation }: Props) {
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
    navigation.navigate('Login', { usuario: usuario, senha: senha });
  }

  return (
    <View style={styles.container}>
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

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tenho conta, voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/tipos';
import { TAREFAS_MOCK } from '../../data/tarefas';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;

export default function ListaTarefasScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={styles.link}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={TAREFAS_MOCK}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
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

/* As quatro dependências já vieram instaladas da aula 4, então aparecem
   acesas desde a primeira etapa. Nada novo é instalado hoje. */
const DEP_STEP = 0;
const DEPS = [
  {name:'@react-navigation/native', ver:'^7.1.17'},
  {name:'@react-navigation/native-stack', ver:'^7.3.26'},
  {name:'react-native-screens', ver:'~4.16.0'},
  {name:'react-native-safe-area-context', ver:'~5.6.0'},
];

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert |
        replace | clear
   ========================================================================= */
const STEPS = [

/* ----------------------------------------------------------------------
   PARTE 1: De onde partimos
   ---------------------------------------------------------------------- */
{
  part:'De onde partimos', op:'intro',
  title:'Editando tarefas',
  eyebrow:'Aula 5 · React Native',
  md:
`O app já navega direito: rotas, pilha, cabeçalho, botão de voltar. O que ainda não funciona é a lista, que mostra sempre as mesmas cinco tarefas de um mock importado. Hoje a turma completa o CRUD: **C**riar, **R**ead (já tem), **U**pdate (editar) e **D**elete (excluir).

- **Tela nova:** \`FormularioTarefaScreen\`, uma só, reaproveitada pra criar **e** pra editar.
- **Conceito principal:** trabalhar com uma **lista como estado**, adicionando, alterando e removendo itens sem nunca mutar o array original.
- **A ponta solta da aula 4:** como duas rotas irmãs compartilham o mesmo dado. Hoje isso se resolve com params e com props passadas na própria rota.

> Nos cartões **roxos de desafio** a aula para e é a vez da turma tentar. **→** avança · **←** volta · **↑ ↓** mudam a velocidade.`
},
{
  part:'De onde partimos', op:'note',
  title:'O que já está pronto',
  md:
`O projeto começa com o resultado da aula passada. Clique nos arquivos da barra lateral para relembrar:

- \`App.tsx\`, só o mapa de rotas: \`NavigationContainer\`, \`Stack.Navigator\` e três \`Stack.Screen\`. **Sem nenhum estado.**
- \`src/navigation/tipos.ts\`, o \`RootStackParamList\` com as três rotas de hoje.
- \`src/screens/tarefas/ListaTarefasScreen.tsx\`, mostra \`TAREFAS_MOCK\` com \`FlatList\`, e **importa o mock ela mesma**, porque virou rota e perdeu o pai que passava props.

> Aquele import do mock, lá dentro da tela, foi marcado na aula passada como uma regressão proposital. É o primeiro nó que a aula de hoje desata: quando as tarefas viram estado, alguém precisa ser dono delas, e esse alguém volta a ser o \`App.tsx\`.`
},

/* ----------------------------------------------------------------------
   PARTE 2: A tela de formulário
   ---------------------------------------------------------------------- */
{
  part:'Formulário de tarefa', op:'note',
  title:'Uma tela, dois modos, decididos pela rota',
  md:
`Criar e editar uma tarefa têm quase tudo em comum: um campo de título e um botão de salvar. Em vez de duas telas quase iguais, a turma constrói **uma só**, \`FormularioTarefaScreen\`, e o que decide o modo dela é **a navegação**:

\`\`\`tsx
navigation.navigate('Formulario');                    // criar, sem params
navigation.navigate('Formulario', { tarefa: item });  // editar, com a tarefa
\`\`\`

Do outro lado, a tela lê o que chegou:

\`\`\`tsx
const tarefaEditando = route.params ? route.params.tarefa : null;
\`\`\`

- Na aula passada os params levaram dois textos (usuário e senha). Agora levam um **objeto inteiro**, uma \`Tarefa\`. Params aceitam qualquer valor, desde que pequeno.
- A rota precisa declarar isso no \`RootStackParamList\`: \`Formulario: { tarefa: Tarefa } | undefined\`, o mesmo \`|\` (ou um, ou outro) da rota \`Login\`.
- Até o **título do cabeçalho** sai dos params, sem a tela saber de nada: "Editar tarefa" quando veio uma tarefa, "Nova tarefa" quando não veio.

> Repare no que a tela **não** precisa: saber se aquilo vai virar um item novo ou a alteração de um existente. Ela só avisa \`aoSalvar(titulo, tarefaEditando)\` e volta. Quem decide é quem tem a lista inteira.`
},
{
  part:'Formulário de tarefa', op:'challenge', time:'8 min',
  title:'Monte o FormularioTarefaScreen',
  md:
`Primeiro declare a rota nova em \`src/navigation/tipos.ts\`:

\`\`\`tsx
Formulario: { tarefa: Tarefa } | undefined;
\`\`\`

(não esqueça de importar o tipo \`Tarefa\` lá em cima).

Depois crie \`src/screens/tarefas/FormularioTarefaScreen.tsx\` com:

1. Os imports de sempre do \`react-native\`, mais \`NativeStackScreenProps\`, \`RootStackParamList\` e o tipo \`Tarefa\`.
2. Um \`type Props\` que junta o que vem da rota com o que vem por prop:
   \`NativeStackScreenProps<RootStackParamList, 'Formulario'> & { aoSalvar: ... }\`.
3. \`const tarefaEditando = route.params ? route.params.tarefa : null;\`
4. Um \`useState\` pro título, já preenchido se estiver editando.
5. Um \`handleSalvar\` que valida (título não pode estar vazio), chama \`aoSalvar(titulo, tarefaEditando)\` e volta com \`navigation.goBack()\`.
6. Um \`TextInput\` controlado e os botões **Salvar** e **Cancelar** (esse último só \`goBack()\`).

> O \`&\` no \`type Props\` é a **interseção** de tipos: "tem tudo isso **e** também aquilo". É o irmão do \`|\` que a turma viu na aula passada. Copie o \`StyleSheet\` do \`LoginScreen\` como ponto de partida, sem o \`titulo\`: quem mostra o título é o cabeçalho da rota.`
},
{
  part:'Formulário de tarefa', op:'insert', file:'src/navigation/tipos.ts',
  before:`export type RootStackParamList = {`,
  title:'O arquivo de rotas importa o tipo Tarefa',
  explain:'Primeira vez que o mapa de rotas precisa de um tipo do projeto: é o preço de params levarem um objeto de verdade, e não só texto.',
  code:
`import { Tarefa } from '../data/tarefas';

`
},
{
  part:'Formulário de tarefa', op:'replace', file:'src/navigation/tipos.ts',
  title:'A quarta rota, com a tarefa nos params',
  explain:'<code>| undefined</code> de novo, e pelo mesmo motivo do Login: a rota pode ser aberta <b>sem</b> params, e é isso que significa "nova tarefa".',
  find:
`  Lista: undefined;
};
`,
  code:
`  Lista: undefined;
  Formulario: { tarefa: Tarefa } | undefined;
};
`
},
{
  part:'Formulário de tarefa', op:'file', target:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'Criar FormularioTarefaScreen.tsx',
  explain:'Único arquivo escrito do zero hoje, porque é o único que ainda não existe. Mesma pasta da tela de listagem: <code>src/screens/tarefas/</code>.'
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'Imports e o tipo das props',
  explain:'<code>&</code> é <b>interseção</b>: as props dessa tela são as que a rota entrega (<code>navigation</code>, <code>route</code>) <b>mais</b> a função <code>aoSalvar</code>, que vai vir do <code>App.tsx</code>.',
  code:
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/tipos';
import { Tarefa } from '../../data/tarefas';

type Props = NativeStackScreenProps<RootStackParamList, 'Formulario'> & {
  aoSalvar: (titulo: string, tarefaEditando: Tarefa | null) => void;
};

`
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'O modo da tela sai dos params',
  explain:'Duas linhas decidem tudo: a primeira lê o que a navegação trouxe, a segunda faz o campo nascer preenchido (edição) ou vazio (criação). Depois de salvar, <code>goBack()</code> desempilha e a lista reaparece.',
  code:
`export default function FormularioTarefaScreen({ navigation, route, aoSalvar }: Props) {
  const tarefaEditando = route.params ? route.params.tarefa : null;
  const [titulo, setTitulo] = useState(tarefaEditando ? tarefaEditando.titulo : '');

  function handleSalvar() {
    if (!titulo) {
      Alert.alert('Atenção', 'Digite um título para a tarefa.');
      return;
    }
    aoSalvar(titulo, tarefaEditando);
    navigation.goBack();
  }

`
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'O JSX: um campo e dois botões',
  explain:'Nenhum título dentro da tela: "Nova tarefa" e "Editar tarefa" vão sair do cabeçalho da rota, configurado no <code>App.tsx</code>. "Cancelar" e a seta do cabeçalho fazem a mesma coisa, <code>goBack()</code>.',
  code:
`  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity onPress={handleSalvar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

`
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'Estilos (os mesmos de sempre)',
  explain:'Cópia do <code>StyleSheet</code> do <code>LoginScreen</code>, sem o <code>titulo</code>. Mais uma duplicação pro desafio de casa de sempre.',
  code:
`const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
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
`
},

/* ----------------------------------------------------------------------
   PARTE 3: As tarefas viram estado
   ---------------------------------------------------------------------- */
{
  part:'Tarefas viram estado', op:'note',
  title:'O problema da constante',
  md:
`\`TAREFAS_MOCK\` é uma constante importada. Não existe \`setTarefas\` pra ela, porque ela nunca foi estado, é um array fixo dentro de um arquivo. Pra criar, editar ou excluir, as tarefas precisam morar num \`useState\`.

E morar **onde**? Não dentro da \`ListaTarefasScreen\`: o formulário é outra rota, outra tela, e precisa mexer na mesma lista. Quem está acima das duas é o \`App.tsx\`.

\`\`\`tsx
const [tarefas, setTarefas] = useState(TAREFAS_MOCK);
\`\`\`

\`TAREFAS_MOCK\` continua existindo, agora usado uma vez só, como **valor inicial**. Depois disso quem manda é \`tarefas\` e \`setTarefas\`.

> É a mesma ideia de "elevar o estado" das primeiras aulas, agora aplicada a uma **lista** e com duas rotas no meio do caminho.`
},
{
  part:'Tarefas viram estado', op:'note',
  title:'Mudar uma lista sem mutar o array',
  md:
`As operações do CRUD viram três funções no \`App.tsx\`, e nenhuma delas altera o array \`tarefas\` diretamente, todas criam um **array novo**:

\`\`\`tsx
// Editar: troca o título de UMA tarefa, mantém as outras
setTarefas(tarefas.map((tarefa) =>
  tarefa.id === id ? { ...tarefa, titulo } : tarefa
));

// Criar: array novo, com tudo que já tinha + a tarefa nova
setTarefas([...tarefas, novaTarefa]);

// Excluir: array novo, sem a tarefa daquele id
setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
\`\`\`

- \`.map()\` percorre cada item e devolve um **novo array**: a maioria dos itens volta igual, só o que bate o \`id\` vira uma cópia com o campo trocado.
- \`{ ...tarefa, titulo }\` copia todos os campos e sobrescreve só \`titulo\`; \`[...tarefas, novaTarefa]\` copia o array e acrescenta um item. Mesmo \`...\`, mesma ideia: "espalha o que já existe aqui dentro".
- \`.filter()\` devolve só os itens que passam no teste, aqui "não é o que eu quero apagar".

> **Por que não mutar direto** (\`tarefas[i].titulo = novo\`, \`tarefas.push(...)\`)? O React decide re-renderizar comparando a **referência** do array com a anterior. Mutar no lugar mantém a mesma referência, e o React simplesmente não percebe que algo mudou.`
},
{
  part:'Tarefas viram estado', op:'challenge', time:'6 min',
  title:'Escreva as três funções',
  md:
`No \`App.tsx\`, que hoje não tem estado nenhum:

1. Importe \`FormularioTarefaScreen\` e, do arquivo de dados, \`Tarefa\` e \`TAREFAS_MOCK\` (e traga o \`useState\` de volta pro import do React).
2. \`const [tarefas, setTarefas] = useState(TAREFAS_MOCK);\`
3. \`salvarTarefa(titulo: string, tarefaEditando: Tarefa | null)\`: se veio uma \`tarefaEditando\`, é edição (\`.map()\`); se veio \`null\`, é criação (monta \`{ id: Date.now().toString(), titulo, concluida: false }\` e usa o spread).
4. \`alternarConcluida(id: string)\`: \`.map()\` invertendo o \`concluida\` só da tarefa daquele \`id\` (dica: \`!tarefa.concluida\`).
5. \`excluirTarefa(id: string)\`: \`.filter()\` devolvendo as tarefas sem a daquele \`id\`.

> Nenhuma dessas funções navega. Elas só mexem na lista: quem volta pra tela anterior é o formulário, com \`goBack()\`. Separar "mudar o dado" de "mudar de tela" deixa as duas coisas mais fáceis de entender.
>
> \`Date.now()\` devolve um número (milissegundos desde 1970) e \`.toString()\` vira texto, porque o tipo \`Tarefa\` pede \`id: string\`. Não é um id bonito, mas é único o suficiente pra um mock.`
},
{
  part:'Tarefas viram estado', op:'replace', file:'App.tsx',
  title:'O useState volta pro App',
  explain:'Na aula passada essa linha perdeu o <code>useState</code>, porque o <code>App</code> tinha deixado de guardar estado. Hoje ele volta a guardar: a lista de tarefas.',
  find:
`import React from 'react';
`,
  code:
`import React, { useState } from 'react';
`
},
{
  part:'Tarefas viram estado', op:'insert', file:'App.tsx',
  after:`import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';`,
  title:'Os imports da tela nova e do mock',
  explain:'O mock volta a ser importado pelo <code>App.tsx</code>, como era antes da aula 4, mas agora com um papel diferente: valor inicial de um estado, não dado fixo de uma tela.',
  code:
`import FormularioTarefaScreen from './src/screens/tarefas/FormularioTarefaScreen';
import { Tarefa, TAREFAS_MOCK } from './src/data/tarefas';
`
},
{
  part:'Tarefas viram estado', op:'insert', file:'App.tsx',
  before:`  return (`,
  title:'A lista vira estado, e salvar decide o caminho',
  explain:'Um <code>if</code> só: se existe <code>tarefaEditando</code>, é edição (<code>.map()</code>); senão, é criação (spread). A função não navega, só mexe no dado.',
  code:
`  const [tarefas, setTarefas] = useState(TAREFAS_MOCK);

  function salvarTarefa(titulo: string, tarefaEditando: Tarefa | null) {
    if (tarefaEditando) {
      setTarefas(tarefas.map((tarefa) =>
        tarefa.id === tarefaEditando.id ? { ...tarefa, titulo } : tarefa
      ));
    } else {
      const novaTarefa = { id: Date.now().toString(), titulo, concluida: false };
      setTarefas([...tarefas, novaTarefa]);
    }
  }

`
},
{
  part:'Tarefas viram estado', op:'insert', file:'App.tsx',
  before:`  return (`,
  title:'Alternar concluída e excluir',
  explain:'<code>.map()</code> pra trocar um campo de um item só, <code>.filter()</code> pra remover um item: as duas sempre devolvendo um array novo, nunca mexendo no antigo.',
  code:
`  function alternarConcluida(id: string) {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }

  function excluirTarefa(id: string) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

`
},

/* ----------------------------------------------------------------------
   PARTE 4: Uma rota que recebe props
   ---------------------------------------------------------------------- */
{
  part:'Rotas com props', op:'note',
  title:'Como passar props para uma rota',
  md:
`Agora o \`App.tsx\` tem o dado e as funções, mas as telas são rotas: \`component={ListaTarefasScreen}\` não deixa passar prop nenhuma, quem cria a tela é o navigator.

A saída é trocar o \`component\` por uma **função filha**, que o navigator chama passando \`navigation\` e \`route\`:

\`\`\`tsx
<Stack.Screen name="Lista" options={{ title: 'Minhas tarefas' }}>
  {(props) => <ListaTarefasScreen {...props} tarefas={tarefas} />}
</Stack.Screen>
\`\`\`

- \`props\` aqui é o pacote que o navigator monta: \`navigation\` e \`route\`. O \`{...props}\` repassa os dois pra tela sem escrever um por um.
- Ao lado deles entram as props do \`App\`: \`tarefas\`, \`aoAlternarConcluida\`, \`aoExcluirTarefa\`.
- Por isso o \`type Props\` das telas usa \`&\`: **o que vem da rota** e **o que vem do pai**, juntos.

E o \`options\` também pode ser uma **função**, pra ler os params da rota:

\`\`\`tsx
options={({ route }) => ({
  title: route.params ? 'Editar tarefa' : 'Nova tarefa',
})}
\`\`\`

> Dois jeitos de um dado chegar numa tela, e vale saber escolher: **params** (\`navigate('Formulario', { tarefa })\`) pra dado pequeno e específico daquela navegação; **props** pra estado compartilhado que o pai já tem. Quando a árvore cresce e passar props vira incômodo, a resposta é \`Context\`, assunto de uma próxima aula.`
},
{
  part:'Rotas com props', op:'replace', file:'App.tsx',
  title:'A rota Lista passa a receber props',
  explain:'<code>component={...}</code> some e vira uma função filha. A tela continua recebendo <code>navigation</code> (pelo <code>{...props}</code>), agora acompanhada do estado e das duas funções.',
  find:
`        <Stack.Screen
          name="Lista"
          component={ListaTarefasScreen}
          options={{ title: 'Minhas tarefas', headerBackVisible: false }}
        />
`,
  code:
`        <Stack.Screen
          name="Lista"
          options={{ title: 'Minhas tarefas', headerBackVisible: false }}
        >
          {(props) => (
            <ListaTarefasScreen
              {...props}
              tarefas={tarefas}
              aoAlternarConcluida={alternarConcluida}
              aoExcluirTarefa={excluirTarefa}
            />
          )}
        </Stack.Screen>
`
},
{
  part:'Rotas com props', op:'insert', file:'App.tsx',
  after:`        </Stack.Screen>`,
  title:'A rota do formulário, com título dinâmico',
  explain:'<code>options</code> como <b>função</b>: o cabeçalho lê <code>route.params</code> e escolhe o título. A tela do formulário não sabe nada disso, e é justamente essa a graça.',
  code:
`        <Stack.Screen
          name="Formulario"
          options={({ route }) => ({
            title: route.params ? 'Editar tarefa' : 'Nova tarefa',
          })}
        >
          {(props) => <FormularioTarefaScreen {...props} aoSalvar={salvarTarefa} />}
        </Stack.Screen>
`
},

/* ----------------------------------------------------------------------
   PARTE 5: A lista aciona o CRUD
   ---------------------------------------------------------------------- */
{
  part:'Lista aciona o CRUD', op:'note',
  title:'Três ações em cada item',
  md:
`Falta a lista **usar** tudo isso. Ela ganha três props novas, mais três toques possíveis em cada linha:

- Um botão **+ Nova tarefa** acima da lista, que chama \`navigation.navigate('Formulario')\`, sem params.
- Tocar no **título** abre o formulário em modo edição: \`navigation.navigate('Formulario', { tarefa: item })\`.
- Tocar no **status** chama \`aoAlternarConcluida(item.id)\`, sem sair da tela.
- Tocar em **Excluir** pede confirmação antes de chamar \`aoExcluirTarefa\`.

A confirmação usa uma forma do \`Alert\` que a turma ainda não tinha visto, com **botões**:

\`\`\`tsx
Alert.alert('Excluir tarefa', \`Apagar "\${tarefa.titulo}"?\`, [
  { text: 'Cancelar', style: 'cancel' },
  { text: 'Excluir', style: 'destructive', onPress: () => aoExcluirTarefa(tarefa.id) },
]);
\`\`\`

O terceiro parâmetro é uma **lista de botões**, cada um com seu \`text\` e seu \`onPress\`. \`style: 'destructive'\` é só visual (deixa o botão vermelho no iOS), quem decide o que acontece continua sendo o \`onPress\`.

> Repare na divisão: navegar é com a tela (ela tem \`navigation\`), mudar o dado é com o \`App\` (ele tem \`setTarefas\`). Cada um faz o que é seu.`
},
{
  part:'Lista aciona o CRUD', op:'challenge', time:'7 min',
  title:'Ligue os botões na ListaTarefasScreen',
  md:
`Em \`src/screens/tarefas/ListaTarefasScreen.tsx\`:

1. Importe \`Alert\` do \`react-native\` e troque o import de \`TAREFAS_MOCK\` pelo do tipo \`Tarefa\`: a tela não busca mais o dado, ela recebe.
2. No \`type Props\`, junte com \`&\` as três props novas: \`tarefas: Tarefa[]\`, \`aoAlternarConcluida: (id: string) => void\` e \`aoExcluirTarefa: (id: string) => void\`.
3. Escreva um \`confirmarExclusao(tarefa: Tarefa)\` com o \`Alert\` de dois botões do slide anterior.
4. Acrescente o botão **+ Nova tarefa** acima da \`FlatList\`.
5. Troque \`data={TAREFAS_MOCK}\` por \`data={tarefas}\`.
6. No \`renderItem\`, separe título, status e um botão **Excluir**, cada um no seu próprio \`TouchableOpacity\`.

> Não aninhe tocáveis: três \`TouchableOpacity\` **lado a lado** dentro do item, nunca um dentro do outro, componentes tocáveis aninhados se atrapalham. No \`StyleSheet\`, \`itemInfo: { flex: 1 }\` faz o título ocupar o espaço que sobra e empurra os outros dois pra direita.`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Alert entra na lista de imports',
  explain:'Ele vai ser usado dentro de <code>confirmarExclusao</code>, daqui a duas etapas.',
  find:
`import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
`,
  code:
`import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O mock sai, o tipo entra',
  explain:'A linha que desfaz a regressão da aula 4: a tela para de buscar o dado e volta a só <b>receber</b> a lista. Do arquivo de dados ela só precisa mais do tipo.',
  find:
`import { TAREFAS_MOCK } from '../../data/tarefas';
`,
  code:
`import { Tarefa } from '../../data/tarefas';
`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'As props da rota mais as do App',
  explain:'A interseção (<code>&</code>) em ação: <code>navigation</code> e <code>route</code> vêm da rota, <code>tarefas</code> e as duas funções vêm da função filha lá no <code>App.tsx</code>.',
  find:
`type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;
`,
  code:
`type Props = NativeStackScreenProps<RootStackParamList, 'Lista'> & {
  tarefas: Tarefa[];
  aoAlternarConcluida: (id: string) => void;
  aoExcluirTarefa: (id: string) => void;
};
`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'A assinatura cresce, e chega a confirmação',
  explain:'Quatro props agora, uma por linha só pra ficar legível. <code>confirmarExclusao</code> é uma função comum dentro do componente: ela pergunta, e só chama <code>aoExcluirTarefa</code> se a resposta for sim.',
  find:
`export default function ListaTarefasScreen({ navigation }: Props) {
`,
  code:
`export default function ListaTarefasScreen({
  navigation,
  tarefas,
  aoAlternarConcluida,
  aoExcluirTarefa,
}: Props) {
  function confirmarExclusao(tarefa: Tarefa) {
    Alert.alert('Excluir tarefa', \`Apagar "\${tarefa.titulo}"?\`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => aoExcluirTarefa(tarefa.id) },
    ]);
  }

`
},
{
  part:'Lista aciona o CRUD', op:'insert', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  before:`      <FlatList`,
  title:'O botão de nova tarefa',
  explain:'<code>navigate(\'Formulario\')</code> <b>sem</b> params: é essa ausência que a tela do formulário e o cabeçalho leem como "modo criação".',
  code:
`      <TouchableOpacity onPress={() => navigation.navigate('Formulario')} style={styles.botaoNova}>
        <Text style={styles.botaoNovaTexto}>+ Nova tarefa</Text>
      </TouchableOpacity>

`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'A FlatList lê o estado',
  explain:'Uma palavra de diferença, e é o momento em que a lista "acorda": ela passa a mostrar o estado do <code>App</code>, que muda quando o usuário cria, edita ou exclui.',
  find:
`        data={TAREFAS_MOCK}
`,
  code:
`        data={tarefas}
`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O item ganha três toques',
  explain:'Três <code>TouchableOpacity</code> irmãos, nenhum dentro do outro: tocar o título navega levando a tarefa nos params, tocar o status alterna na hora, tocar "Excluir" pede confirmação.',
  find:
`            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={item.concluida ? styles.status : styles.statusPendente}>
              {item.concluida ? 'Concluída' : 'Pendente'}
            </Text>
`,
  code:
`            <TouchableOpacity
              style={styles.itemInfo}
              onPress={() => navigation.navigate('Formulario', { tarefa: item })}
            >
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => aoAlternarConcluida(item.id)}>
              <Text style={item.concluida ? styles.status : styles.statusPendente}>
                {item.concluida ? 'Concluída' : 'Pendente'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmarExclusao(item)}>
              <Text style={styles.excluir}>Excluir</Text>
            </TouchableOpacity>
`
},
{
  part:'Lista aciona o CRUD', op:'insert', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  after:`  link: { color: '#2e6de6' },`,
  title:'O estilo do botão novo',
  explain:'Mesmo azul dos outros botões do app, só que ocupando a largura toda, logo abaixo do cabeçalho.',
  code:
`  botaoNova: {
    backgroundColor: '#2e6de6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  botaoNovaTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
`
},
{
  part:'Lista aciona o CRUD', op:'replace', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'E os estilos do item',
  explain:'<code>itemInfo: { flex: 1 }</code> faz o título esticar e empurrar status e "Excluir" pra direita; os <code>marginRight</code> só dão respiro entre os três.',
  find:
`  itemTitulo: { fontSize: 16 },
  status: { color: '#2e6de6', fontWeight: 'bold' },
  statusPendente: { color: '#999' },
`,
  code:
`  itemInfo: { flex: 1, marginRight: 8 },
  itemTitulo: { fontSize: 16 },
  status: { color: '#2e6de6', fontWeight: 'bold', marginRight: 12 },
  statusPendente: { color: '#999', marginRight: 12 },
  excluir: { color: '#d33', fontWeight: 'bold' },
`
},

/* ----------------------------------------------------------------------
   PARTE 6: Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'note',
  title:'Teste o CRUD inteiro',
  md:
`Recarregue o app, faça login e teste, na ordem:

1. **+ Nova tarefa** → o cabeçalho diz **Nova tarefa** (sem params!), digite um título e **Salvar** → volta sozinho pra lista, com a tarefa nova no fim, como pendente.
2. Toque no **título** de uma tarefa → o cabeçalho agora diz **Editar tarefa** e o campo já vem preenchido; mude e salve → o título muda na lista.
3. Toque no rótulo **Pendente/Concluída** → alterna na hora, sem sair da tela e sem navegar.
4. Toque em **Excluir** → aparece a confirmação; **Cancelar** não faz nada, **Excluir** some com a tarefa.
5. Entre no formulário e volte pela **seta do cabeçalho** ou pelo **gesto**: é o mesmo \`goBack()\` do botão "Cancelar", de graça, porque é uma rota de verdade.

> Feche o app e abra de novo: as cinco tarefas mocadas estão de volta. Continua tudo em memória, persistência de verdade (\`AsyncStorage\`, banco, API) é assunto de outra aula.`
},
{
  part:'Fechamento', op:'outro',
  title:'CRUD completo, em cima das rotas',
  md:
`O app faz as quatro operações clássicas numa lista de tarefas, com navegação de verdade por baixo: criar, ler, atualizar e excluir, sem nenhuma biblioteca além do React Navigation que já estava lá.

## Conceitos de hoje
Lista como estado, atualização imutável (\`.map()\`, \`.filter()\`, spread \`{...obj}\` e \`[...array]\`), params levando um **objeto** (\`navigate('Formulario', { tarefa })\`), rota com **props** pela forma de função do \`<Stack.Screen>\`, \`options\` como função lendo \`route.params\`, interseção de tipos (\`&\`) e \`Alert.alert\` com lista de botões.

## Desafios pra casa
Todos possíveis com o que já foi visto:

1. **Campo de descrição**: acrescente um segundo campo (opcional) no formulário e no tipo \`Tarefa\`.
2. **Cancelar sem perder**: hoje "Cancelar" volta mesmo com texto digitado. Peça confirmação se o campo não estiver vazio (o \`Alert\` de dois botões já está na lista).
3. **Contagem no cabeçalho**: mostre "X de Y concluídas" na tela da lista.
4. **Ordenar por status**: pendentes primeiro, sem mutar o array original (dica: \`.slice().sort(...)\`).
5. **(avançado, gancho pra próxima aula)** Pesquise \`Context\`: como \`tarefas\` e as três funções poderiam chegar nas telas **sem** a função filha do \`<Stack.Screen>\` e sem props.

> Entrega: o link do Snack com o CRUD completo funcionando, criar, editar, concluir e excluir uma tarefa.`
},
];

global.AULA_EDITANDO_TAREFAS = {
  meta: {
    titulo:    'Editando tarefas (React Native)',
    projeto:   'editando-tarefas-react-native',
    subtitulo: 'React Navigation · CRUD em memória',
    vazio:     'Projeto da aula 4.<br>As rotas e a navegação já estão prontas.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências (da aula 4)', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
