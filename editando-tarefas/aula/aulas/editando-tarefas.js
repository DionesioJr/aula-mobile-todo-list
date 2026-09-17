/* =========================================================================
   AULA 5: Editando tarefas (React Native puro, sem libs)

   Continuação direta da aula 4: existe uma lista de tarefas, mas ela é só
   leitura, um array mocado importado de um arquivo. Hoje a turma completa
   o CRUD: Criar, editar e excluir uma tarefa de verdade.

   Mesma regra das aulas anteriores: NENHUMA biblioteca externa. A
   navegação continua sendo um `useState` no App.tsx e um `if`, só ganha
   mais um valor possível ('formulario'). O conceito novo de verdade é
   trabalhar com uma LISTA como estado: atualizar, adicionar e remover
   itens sem nunca mutar o array original.

   Formato também igual: a aula PARA em cartões roxos de desafio; a turma
   tenta sozinha antes de ver a solução sendo digitada.

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* =========================================================================
   PONTO DE PARTIDA, o resultado da aula 4 já está no projeto.
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

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert | clear
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
`A lista de tarefas já aparece depois do login, mas é só leitura: os dados vêm de uma constante importada, e constante não muda. Hoje a turma completa o CRUD: **C**riar, **U**pdate (editar) e **D**elete (excluir) uma tarefa de verdade.

- **Tela nova:** \`FormularioTarefaScreen\`, reaproveitada tanto pra criar quanto pra editar.
- **Conceito novo:** trabalhar com uma **lista como estado**, atualizando, adicionando e removendo itens sem nunca mutar o array original.
- **Sem biblioteca nova:** a navegação continua manual, mais um valor no \`useState('tela')\`.

> Mesmo formato de sempre: nos cartões **roxos de desafio** a aula para e é a vez da turma tentar. **→** avança · **←** volta · **↑ ↓** mudam a velocidade.`
},
{
  part:'De onde partimos', op:'note',
  title:'O que já está pronto',
  md:
`O projeto começa com o resultado da aula passada. Clique nos arquivos da barra lateral para relembrar:

- \`src/data/tarefas.ts\`, o tipo \`Tarefa\` e o mock \`TAREFAS_MOCK\`.
- \`src/screens/tarefas/ListaTarefasScreen.tsx\`, mostra \`TAREFAS_MOCK\` com \`FlatList\`, só leitura.
- \`App.tsx\`, guarda \`tela\` e \`conta\`, decide com \`if\` qual tela aparece, hoje passa \`TAREFAS_MOCK\` direto pra lista.

> Repare: \`ListaTarefasScreen\` recebe \`tarefas\` por prop, então **de onde vem** esse array não é problema dela. Hoje só o \`App.tsx\` muda de onde ele vem, a tela de listagem nem percebe a diferença. É o poder de separar tela de dado.`
},

/* ----------------------------------------------------------------------
   PARTE 2: O formulário de tarefa
   ---------------------------------------------------------------------- */
{
  part:'Formulário de tarefa', op:'note',
  title:'Uma tela, dois usos',
  md:
`Criar e editar uma tarefa têm quase tudo em comum: um campo de título e um botão de salvar. Em vez de duas telas quase iguais, a turma constrói **uma só**, \`FormularioTarefaScreen\`, que se comporta diferente dependendo do que recebe por prop:

\`\`\`tsx
type Props = {
  tarefaEditando: Tarefa | null;
  aoSalvar: (titulo: string) => void;
  aoVoltar: () => void;
};
\`\`\`

- \`tarefaEditando: Tarefa | null\`, **ou** é uma tarefa (modo edição, o campo já vem preenchido), **ou** é \`null\` (modo criação, campo vazio). \`|\` em TypeScript significa "ou um tipo, ou outro".
- O \`useState\` do campo já nasce com o valor certo: \`useState(tarefaEditando ? tarefaEditando.titulo : '')\`, o mesmo ternário da aula passada, decidindo entre dois valores iniciais.
- \`aoSalvar(titulo)\` não sabe (nem precisa saber) se é criação ou edição, quem decide isso é o \`App.tsx\`, que é quem tem a lista inteira.

> Reaproveitar um componente pra dois modos é um padrão comum: menos código, menos duplicação, um só lugar pra manter.`
},
{
  part:'Formulário de tarefa', op:'challenge', time:'8 min',
  title:'Monte o FormularioTarefaScreen',
  md:
`Crie \`src/screens/tarefas/FormularioTarefaScreen.tsx\` com:

1. Imports: \`React\` com \`useState\`, os componentes do \`react-native\` (\`View\`, \`Text\`, \`TextInput\`, \`TouchableOpacity\`, \`StyleSheet\`, \`Alert\`), e o tipo \`Tarefa\`.
2. \`type Props\` com \`tarefaEditando: Tarefa | null\`, \`aoSalvar: (titulo: string) => void\` e \`aoVoltar: () => void\`.
3. Um \`useState\` pro título, já preenchido se \`tarefaEditando\` não for \`null\`.
4. Um título de tela que muda: **Editar tarefa** ou **Nova tarefa**, dependendo de \`tarefaEditando\`.
5. Um \`TextInput\` controlado pro título.
6. Um \`handleSalvar\` que valida (título não pode estar vazio) e chama \`aoSalvar\`.
7. Botões **Salvar** e **Cancelar** (o de cancelar chama \`aoVoltar\`).

> Copie o \`StyleSheet\` do \`LoginScreen\` como ponto de partida, os estilos são os mesmos de sempre.`
},
{
  part:'Formulário de tarefa', op:'file', target:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'Criar FormularioTarefaScreen.tsx',
  explain:'Mesma pasta da tela de listagem: <code>src/screens/tarefas/</code>.'
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'Imports e Props',
  explain:'<code>Tarefa | null</code> é um <b>union type</b>: o valor só pode ser uma das duas coisas listadas, nunca outra.',
  code:
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Tarefa } from '../../data/tarefas';

type Props = {
  tarefaEditando: Tarefa | null;
  aoSalvar: (titulo: string) => void;
  aoVoltar: () => void;
};

`
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'O componente e o estado inicial',
  explain:'<code>tarefaEditando ? tarefaEditando.titulo : \'\'</code> roda uma única vez, na primeira renderização, decidindo com que valor o campo nasce.',
  code:
`export default function FormularioTarefaScreen({ tarefaEditando, aoSalvar, aoVoltar }: Props) {
  const [titulo, setTitulo] = useState(tarefaEditando ? tarefaEditando.titulo : '');

  function handleSalvar() {
    if (!titulo) {
      Alert.alert('Atenção', 'Digite um título para a tarefa.');
      return;
    }
    aoSalvar(titulo);
  }

`
},
{
  part:'Formulário de tarefa', op:'code', file:'src/screens/tarefas/FormularioTarefaScreen.tsx',
  title:'O JSX da tela',
  explain:'O título da tela usa o mesmo ternário do estado inicial, dessa vez decidindo um texto em vez de um valor de campo.',
  code:
`  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tarefaEditando ? 'Editar tarefa' : 'Nova tarefa'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity onPress={handleSalvar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={aoVoltar}>
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
  explain:'Cópia do <code>StyleSheet</code> do <code>LoginScreen</code>, mais uma duplicação pro desafio de casa de sempre.',
  code:
`const styles = StyleSheet.create({
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
`
},

/* ----------------------------------------------------------------------
   PARTE 3: As tarefas viram estado
   ---------------------------------------------------------------------- */
{
  part:'Tarefas viram estado', op:'note',
  title:'O problema da constante',
  md:
`\`TAREFAS_MOCK\` é uma constante importada. Chamar \`setTarefas\` não existe pra ela, porque ela nunca foi um estado, é só um array fixo. Pra criar, editar ou excluir, as tarefas precisam morar num \`useState\`, do mesmo jeito que \`conta\` mora desde a aula 3.

\`\`\`tsx
const [tarefas, setTarefas] = useState(TAREFAS_MOCK);
\`\`\`

\`TAREFAS_MOCK\` continua existindo, só que agora é usado uma vez só, como **valor inicial** do estado. Depois disso, quem manda é \`tarefas\` e \`setTarefas\`, \`TAREFAS_MOCK\` não muda mais nada.

> É a mesma ideia de "elevar o estado" da aula 3, agora aplicada a uma **lista**, não a um objeto único.`
},
{
  part:'Tarefas viram estado', op:'note',
  title:'Mudar uma lista sem mutar o array',
  md:
`As três operações do CRUD viram três funções no \`App.tsx\`, e nenhuma delas altera o array \`tarefas\` diretamente, todas criam um **array novo**:

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

- \`.map()\` percorre cada item e devolve um **novo array**: aqui, a maioria dos itens volta igual, só o que bate o \`id\` vira uma cópia com o título trocado (\`{ ...tarefa, titulo }\`).
- \`{ ...tarefa, titulo }\` copia todos os campos de \`tarefa\` e sobrescreve só \`titulo\`, o \`...\` (spread) que a turma já viu em \`[...tarefas, novaTarefa]\`.
- \`.filter()\` devolve só os itens que passam no teste, aqui, "não é o que eu quero apagar".

> **Por que não mutar direto** (\`tarefas[i].titulo = novo\`, \`tarefas.push(...)\`)? O React só percebe que precisa re-renderizar quando recebe uma referência de array **diferente** da anterior. Mutar o array antigo no lugar, o React nem fica sabendo que algo mudou.`
},
{
  part:'Tarefas viram estado', op:'challenge', time:'6 min',
  title:'Escreva as três funções',
  md:
`No \`App.tsx\`, com \`tarefas\` e \`setTarefas\` já em mãos, escreva:

1. \`alternarConcluida(id: string)\`, usa \`.map()\` pra inverter o \`concluida\` só da tarefa com aquele \`id\` (dica: \`!tarefa.concluida\`).
2. \`excluirTarefa(id: string)\`, usa \`.filter()\` pra devolver as tarefas sem a de determinado \`id\`.
3. \`salvarTarefa(titulo: string)\`, por enquanto só a parte de **criar**: monta uma tarefa nova com \`id: Date.now().toString()\`, \`titulo\` e \`concluida: false\`, e adiciona ao array com o spread.

> \`Date.now()\` devolve um número (milissegundos desde 1970), \`.toString()\` transforma em texto, porque o tipo \`Tarefa\` pede \`id: string\`. Não é um id bonito, mas é único o suficiente pra um mock.`
},
{
  part:'Tarefas viram estado', op:'clear', target:'App.tsx',
  title:'App.tsx vai ganhar bastante coisa',
  explain:'O arquivo acumulou lógica demais pra ir só inserindo pedaço por pedaço, então a turma reescreve ele inteiro, com calma, com tudo que a aula de hoje acrescenta.'
},
{
  part:'Tarefas viram estado', op:'code', file:'App.tsx',
  title:'Imports',
  explain:'Dois imports novos: a tela de formulário e o tipo <code>Tarefa</code> (que soma ao <code>TAREFAS_MOCK</code> que já vinha sendo importado).',
  code:
`import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';
import FormularioTarefaScreen from './src/screens/tarefas/FormularioTarefaScreen';
import { Tarefa, TAREFAS_MOCK } from './src/data/tarefas';

`
},
{
  part:'Tarefas viram estado', op:'code', file:'App.tsx',
  title:'Os dois estados novos',
  explain:'<code>useState&lt;Tarefa | null&gt;(null)</code> tem uma novidade: o <code>&lt;Tarefa | null&gt;</code> antes dos parênteses. O TypeScript não consegue adivinhar o tipo só olhando pra <code>null</code>, então a turma dá a dica na mão.',
  code:
`export default function App() {
  const [tela, setTela] = useState('login');
  const [conta, setConta] = useState({ usuario: '', senha: '' });
  const [tarefas, setTarefas] = useState(TAREFAS_MOCK);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

  function cadastrar(usuario: string, senha: string) {
    setConta({ usuario: usuario, senha: senha });
    setTela('login');
  }

`
},
{
  part:'Tarefas viram estado', op:'code', file:'App.tsx',
  title:'Abrir o formulário, criar ou editar',
  explain:'Duas funções pequenas, cada uma prepara <code>tarefaEmEdicao</code> antes de trocar de tela: <code>null</code> pra criar do zero, a tarefa tocada pra editar.',
  code:
`  function abrirNovaTarefa() {
    setTarefaEmEdicao(null);
    setTela('formulario');
  }

  function abrirEdicaoTarefa(tarefa: Tarefa) {
    setTarefaEmEdicao(tarefa);
    setTela('formulario');
  }

`
},
{
  part:'Tarefas viram estado', op:'code', file:'App.tsx',
  title:'Salvar: criar ou editar, dependendo do caso',
  explain:'Um <code>if</code> só decide o caminho: se existe <code>tarefaEmEdicao</code>, é edição (<code>.map()</code>); senão, é criação (monta uma tarefa nova e usa o spread). Os dois caminhos terminam do mesmo jeito, voltando pra lista.',
  code:
`  function salvarTarefa(titulo: string) {
    if (tarefaEmEdicao) {
      setTarefas(tarefas.map((tarefa) =>
        tarefa.id === tarefaEmEdicao.id ? { ...tarefa, titulo } : tarefa
      ));
    } else {
      const novaTarefa = { id: Date.now().toString(), titulo, concluida: false };
      setTarefas([...tarefas, novaTarefa]);
    }
    setTela('lista');
  }

`
},
{
  part:'Tarefas viram estado', op:'code', file:'App.tsx',
  title:'Alternar concluída e excluir',
  explain:'<code>.map()</code> pra trocar um campo de um item só, <code>.filter()</code> pra remover um item, os dois sempre devolvendo um array novo.',
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
{
  part:'Tarefas viram estado', op:'note',
  title:'Faltam duas coisas',
  md:
`\`App.tsx\` agora sabe **fazer** tudo (criar, editar, excluir, alternar), mas ainda faltam duas pontas:

1. A tela de listagem precisa de **botões** que chamem essas funções, hoje ela só mostra o título e o status.
2. O \`App.tsx\` precisa de um novo \`if (tela === 'formulario')\` e passar as novas funções pra \`ListaTarefasScreen\`.

Nessa ordem: primeiro a lista ganha os botões, depois o \`App\` liga tudo.`
},

/* ----------------------------------------------------------------------
   PARTE 4: A lista aciona o CRUD
   ---------------------------------------------------------------------- */
{
  part:'Lista aciona o CRUD', op:'note',
  title:'Três ações, três props de função',
  md:
`\`ListaTarefasScreen\` ganha três props novas, todas funções que ela só chama, sem saber o que fazem por dentro, o mesmo "dado desce, aviso sobe" de sempre:

- \`aoNovaTarefa: () => void\`, um botão **+ Nova tarefa** acima da lista.
- \`aoTocarTarefa: (tarefa: Tarefa) => void\`, tocar no título abre o formulário em modo edição.
- \`aoAlternarConcluida: (id: string) => void\`, tocar no rótulo de status alterna concluída/pendente.
- \`aoExcluirTarefa: (id: string) => void\`, um botão **Excluir** por item, com confirmação antes de apagar.

A confirmação usa uma forma do \`Alert\` que a turma ainda não tinha visto, com **botões**:

\`\`\`tsx
Alert.alert('Excluir tarefa', \`Apagar "\${tarefa.titulo}"?\`, [
  { text: 'Cancelar', style: 'cancel' },
  { text: 'Excluir', style: 'destructive', onPress: () => aoExcluirTarefa(tarefa.id) },
]);
\`\`\`

O terceiro parâmetro é uma **lista de botões**: cada um com \`text\` e um \`onPress\` próprio. \`style: 'destructive'\` deixa o botão vermelho no iOS, é só um aviso visual, quem decide o que acontece continua sendo o \`onPress\`.`
},
{
  part:'Lista aciona o CRUD', op:'challenge', time:'7 min',
  title:'Ligue os botões na ListaTarefasScreen',
  md:
`Em \`src/screens/tarefas/ListaTarefasScreen.tsx\`:

1. Adicione as quatro props novas ao \`type Props\`: \`aoNovaTarefa\`, \`aoTocarTarefa\`, \`aoAlternarConcluida\`, \`aoExcluirTarefa\`.
2. Um \`TouchableOpacity\` acima do \`FlatList\` com o texto **+ Nova tarefa**, chamando \`aoNovaTarefa\`.
3. Dentro do \`renderItem\`, separe o título e o status cada um no seu próprio \`TouchableOpacity\` (título chama \`aoTocarTarefa(item)\`, status chama \`aoAlternarConcluida(item.id)\`), e adicione um terceiro botão **Excluir**.
4. O botão **Excluir** não chama \`aoExcluirTarefa\` direto, chama uma função local, \`confirmarExclusao\`, que mostra o \`Alert\` com os dois botões do slide anterior.

> Não deixe um \`TouchableOpacity\` **dentro** de outro, três botões **lado a lado** no mesmo item, não um dentro do outro, componentes tocáveis aninhados se atrapalham.`
},
{
  part:'Lista aciona o CRUD', op:'clear', target:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Reescrevendo a tela de listagem',
  explain:'Assim como o <code>App.tsx</code>, essa tela ganha props e um item de lista bem diferente do de antes, mais fácil reescrever inteira do que ir remendando.'
},
{
  part:'Lista aciona o CRUD', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Imports e Props',
  explain:'<code>Alert</code> entra na lista de imports do <code>react-native</code>, é usado dentro de <code>confirmarExclusao</code>. Quatro props novas, todas funções.',
  code:
`import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Tarefa } from '../../data/tarefas';

type Props = {
  tarefas: Tarefa[];
  aoSair: () => void;
  aoNovaTarefa: () => void;
  aoTocarTarefa: (tarefa: Tarefa) => void;
  aoAlternarConcluida: (id: string) => void;
  aoExcluirTarefa: (id: string) => void;
};

`
},
{
  part:'Lista aciona o CRUD', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O componente e a confirmação de exclusão',
  explain:'Seis props agora, uma em cada linha, só pra ficar legível. <code>confirmarExclusao</code> é uma função comum dentro do componente, sem nada de especial, só chama <code>Alert.alert</code> com uma lista de botões.',
  code:
`export default function ListaTarefasScreen({
  tarefas,
  aoSair,
  aoNovaTarefa,
  aoTocarTarefa,
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
  part:'Lista aciona o CRUD', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Cabeçalho e o botão de nova tarefa',
  explain:'Igual ao cabeçalho de antes, só acrescido do botão azul de nova tarefa logo abaixo, antes da lista.',
  code:
`  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minhas tarefas</Text>
        <TouchableOpacity onPress={aoSair}>
          <Text style={styles.link}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={aoNovaTarefa} style={styles.botaoNova}>
        <Text style={styles.botaoNovaTexto}>+ Nova tarefa</Text>
      </TouchableOpacity>

`
},
{
  part:'Lista aciona o CRUD', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O item da lista, com três ações lado a lado',
  explain:'Três <code>TouchableOpacity</code> irmãos dentro do mesmo item, nenhum dentro do outro: tocar o título edita, tocar o status alterna, tocar "Excluir" pede confirmação.',
  code:
`      <FlatList
        data={tarefas}
        keyExtractor={(tarefa) => tarefa.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity style={styles.itemInfo} onPress={() => aoTocarTarefa(item)}>
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
          </View>
        )}
      />
    </View>
  );
}

`
},
{
  part:'Lista aciona o CRUD', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Estilos novos',
  explain:'<code>itemInfo: { flex: 1 }</code> faz o título ocupar todo o espaço que sobra na linha, empurrando o status e o "Excluir" pra direita.',
  code:
`const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  link: { color: '#2e6de6' },
  botaoNova: {
    backgroundColor: '#2e6de6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  botaoNovaTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
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
  itemInfo: { flex: 1, marginRight: 8 },
  itemTitulo: { fontSize: 16 },
  status: { color: '#2e6de6', fontWeight: 'bold', marginRight: 12 },
  statusPendente: { color: '#999', marginRight: 12 },
  excluir: { color: '#d33', fontWeight: 'bold' },
});
`
},

/* ----------------------------------------------------------------------
   PARTE 5: Conectando tudo
   ---------------------------------------------------------------------- */
{
  part:'Conectando tudo', op:'note',
  title:'A última peça: o if do formulário',
  md:
`Só falta o \`App.tsx\` saber mostrar a tela de formulário e passar as props novas pra listagem. É o mesmo padrão de sempre: mais um \`if\`, mais props numa chamada que já existia.`
},
{
  part:'Conectando tudo', op:'code', file:'App.tsx',
  title:'O if da tela de formulário',
  explain:'<code>tarefaEmEdicao</code> vai direto como prop: se for <code>null</code>, o formulário abre em modo criação; se for uma tarefa, abre em modo edição. A tela nem sabe como chegou naquele valor, só recebe.',
  code:
`  if (tela === 'cadastro') {
    return <CadastroScreen aoCadastrar={cadastrar} aoVoltar={() => setTela('login')} />;
  }

  if (tela === 'formulario') {
    return (
      <FormularioTarefaScreen
        tarefaEditando={tarefaEmEdicao}
        aoSalvar={salvarTarefa}
        aoVoltar={() => setTela('lista')}
      />
    );
  }

`
},
{
  part:'Conectando tudo', op:'code', file:'App.tsx',
  title:'A lista recebe o estado e as ações',
  explain:'<code>tarefas={tarefas}</code> no lugar de <code>tarefas={TAREFAS_MOCK}</code>, é a mudança que fecha o ciclo: agora a lista mostra o estado, que muda quando o usuário cria, edita ou exclui.',
  code:
`  if (tela === 'lista') {
    return (
      <ListaTarefasScreen
        tarefas={tarefas}
        aoSair={() => setTela('login')}
        aoNovaTarefa={abrirNovaTarefa}
        aoTocarTarefa={abrirEdicaoTarefa}
        aoAlternarConcluida={alternarConcluida}
        aoExcluirTarefa={excluirTarefa}
      />
    );
  }

  return <LoginScreen conta={conta} aoCriarConta={() => setTela('cadastro')} aoLogar={() => setTela('lista')} />;
}
`
},
{
  part:'Conectando tudo', op:'note',
  title:'Teste o CRUD inteiro',
  md:
`Recarregue o app, faça login e teste, na ordem:

1. Toque em **+ Nova tarefa**, digite um título, **Salvar** → a tarefa aparece no fim da lista, como pendente.
2. Toque no **título** de uma tarefa → o formulário abre em modo edição, com o título já preenchido, mude e salve → o título muda na lista.
3. Toque no rótulo **Pendente/Concluída** de uma tarefa → alterna na hora, sem abrir tela nenhuma.
4. Toque em **Excluir** → aparece a confirmação, toque em **Cancelar** e nada acontece, toque de novo e escolha **Excluir** → a tarefa some da lista.

> Feche o app e abra de novo: as tarefas voltam a ser as cinco mocadas originais. Continua tudo em memória, persistência de verdade (\`AsyncStorage\`, banco, API) é assunto de outra aula.`
},

/* ----------------------------------------------------------------------
   PARTE 6: Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'CRUD completo',
  md:
`O app agora faz as quatro operações clássicas numa lista de tarefas: criar, ler, atualizar e excluir, tudo sem biblioteca nenhuma, só \`useState\`, \`props\` e os métodos de array que todo JavaScript já tem.

## Conceitos de hoje
Lista como estado, atualização imutável (\`.map()\`, \`.filter()\`, spread \`{...obj}\`/\`[...array]\`), reaproveitar um componente para dois modos via prop nula, \`union type\` (\`Tarefa | null\`), \`useState<T>\` com tipo explícito, \`Alert.alert\` com lista de botões.

## Desafios pra casa
Todos possíveis com o que já foi visto:

1. **Campo de descrição**: acrescente um segundo campo (opcional) no formulário e no tipo \`Tarefa\`.
2. **Cancelar sem perguntar**: hoje "Cancelar" no formulário simplesmente volta, mesmo com texto digitado. Adicione uma confirmação se o campo não estiver vazio.
3. **Contagem no cabeçalho**: mostre "X de Y concluídas" ao lado do título da lista.
4. **Ordenar por status**: pendentes primeiro, sem mutar o array original (dica: \`.slice().sort(...)\`).
5. **(avançado, gancho pra próxima aula)** Pesquise \`AsyncStorage\`: como salvar \`tarefas\` pra elas sobreviverem ao fechar o app.

> Entrega: o link do Snack com o CRUD completo funcionando, criar, editar, concluir e excluir uma tarefa.`
},
];

global.AULA_EDITANDO_TAREFAS = {
  meta: {
    titulo:    'Editando tarefas (React Native)',
    projeto:   'editando-tarefas-react-native',
    subtitulo: 'React Native puro · sem bibliotecas externas',
    vazio:     'Projeto da aula 4.<br>A listagem de tarefas já está pronta.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    null, // continua sem nenhuma dependência nova
  steps:   STEPS,
};

})(window);
