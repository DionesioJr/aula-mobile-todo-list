/* =========================================================================
   AULA 4: Listando tarefas (React Native puro, sem libs)

   Continuação direta da aula 3: Login e Cadastro já existem e já
   conversam entre si. Hoje o login finalmente leva a algum lugar: uma
   TERCEIRA tela, a listagem de tarefas, com dados MOCADOS (sem API, sem
   banco, um array fixo num arquivo próprio).

   Mesma regra das aulas anteriores: NENHUMA biblioteca externa. A
   navegação continua sendo um `useState` no App.tsx e um `if`, só ganha
   mais um valor possível. O componente novo de verdade é o `FlatList`,
   que já vem de fábrica no React Native.

   Formato também igual: a aula PARA em cartões roxos de desafio; a turma
   tenta sozinha antes de ver a solução sendo digitada.

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* =========================================================================
   PONTO DE PARTIDA, o resultado da aula 3 já está no projeto.
   A aula de hoje começa com estes três arquivos prontos na árvore.
   ========================================================================= */
const INITIAL_ENTRIES = [
  {path:'App.tsx', type:'file'},
  {path:'src', type:'dir'},
  {path:'src/screens', type:'dir'},
  {path:'src/screens/LoginScreen.tsx', type:'file'},
  {path:'src/screens/CadastroScreen.tsx', type:'file'},
];

const INITIAL_FILES = {
'App.tsx':
`import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';

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

  return <LoginScreen conta={conta} aoCriarConta={() => setTela('cadastro')} />;
}
`,
'src/screens/LoginScreen.tsx':
`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Props = {
  conta: { usuario: string; senha: string };
  aoCriarConta: () => void;
};

export default function LoginScreen({ conta, aoCriarConta }: Props) {
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
  title:'Listando tarefas',
  eyebrow:'Aula 4 · React Native',
  md:
`Login e cadastro já conversam entre si, mas o login termina num \`Alert\` e não leva a lugar nenhum de verdade. Hoje ele passa a levar a algum lugar: uma **terceira tela**, com a lista de tarefas do usuário.

- **Dado mocado:** um arquivo só de dados, \`src/data/tarefas.ts\`, fingindo ser a resposta de uma API.
- **Componente novo:** \`FlatList\`, o jeito do React Native de mostrar uma lista, feito para listas grandes.
- **Navegação:** o mesmo mecanismo das aulas passadas, mais um valor no \`useState('tela')\`. Nenhuma biblioteca nova.

> Mesmo formato de sempre: nos cartões **roxos de desafio** a aula para e é a vez da turma tentar. **→** avança · **←** volta · **↑ ↓** mudam a velocidade.`
},
{
  part:'De onde partimos', op:'note',
  title:'O que já está pronto',
  md:
`O projeto começa com o resultado da aula passada. Clique nos arquivos da barra lateral para relembrar:

- \`src/screens/LoginScreen.tsx\`, recebe \`conta\` e \`aoCriarConta\` por prop, valida usuário e senha contra a conta cadastrada.
- \`src/screens/CadastroScreen.tsx\`, quatro campos, três regras de validação, entrega os dados pro \`App\` com \`aoCadastrar\`.
- \`App.tsx\`, guarda \`tela\` e \`conta\` em \`useState\`, decide com \`if\` qual tela aparece.

> Hoje o \`App.tsx\` ganha mais uma tela possível, e o \`LoginScreen\` para de terminar num \`Alert\` sozinho.`
},

/* ----------------------------------------------------------------------
   PARTE 2: Dados mocados
   ---------------------------------------------------------------------- */
{
  part:'Dados mocados', op:'note',
  title:'Fingindo uma API',
  md:
`Antes de existir tela, precisa existir dado. Numa aplicação de verdade a lista de tarefas viria de uma API ou de um banco, hoje ainda não é o momento pra isso, então a turma cria um **mock**: um array fixo, escrito à mão, que se comporta como se tivesse vindo de algum lugar.

O mock mora no seu próprio arquivo, \`src/data/tarefas.ts\`, separado das telas:

\`\`\`ts
export type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
};

export const TAREFAS_MOCK: Tarefa[] = [ /* ... */ ];
\`\`\`

- \`type Tarefa\` descreve o formato de **uma** tarefa: o mesmo \`type\` que a turma já usa em \`Props\`, aqui descrevendo um dado, não um componente.
- \`Tarefa[]\` é "um array de \`Tarefa\`", cada item do array precisa ter os três campos.
- \`export\` na frente de ambos: outros arquivos vão importar os dois daqui.

> Separar dado de tela é um hábito que vale a pena cedo: quando a API de verdade chegar, só esse arquivo muda, as telas continuam iguais.`
},
{
  part:'Dados mocados', op:'challenge', time:'4 min',
  title:'Crie o arquivo de dados',
  md:
`Crie \`src/data/tarefas.ts\` com:

1. \`export type Tarefa = { ... }\`, com \`id\` (string), \`titulo\` (string) e \`concluida\` (boolean).
2. \`export const TAREFAS_MOCK: Tarefa[] = [ ... ]\`, um array com **pelo menos 4 tarefas**, cada uma com \`id\`, \`titulo\` e \`concluida\` (misture \`true\` e \`false\`).

> \`id\` é texto (\`'1'\`, \`'2'\`...), não número, é assim que a lista vai identificar cada item daqui a pouco. Sem \`export\`, o arquivo existe mas nada de fora consegue enxergar o que está dentro dele.`
},
{
  part:'Dados mocados', op:'file', target:'src/data/tarefas.ts',
  title:'Criar src/data/tarefas.ts',
  explain:'A pasta <code>src/data</code> é criada junto, automaticamente, do mesmo jeito que <code>src/screens</code> apareceu na aula 2.'
},
{
  part:'Dados mocados', op:'code', file:'src/data/tarefas.ts',
  title:'O tipo Tarefa',
  explain:'Três campos: um identificador, um título e um booleano de status. É o "formato" que toda tarefa do app vai seguir.',
  code:
`export type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
};

`
},
{
  part:'Dados mocados', op:'code', file:'src/data/tarefas.ts',
  title:'O array mocado',
  explain:'Cinco tarefas fixas, algumas concluídas, outras não, só para a tela ter o que mostrar. Isso não vem de lugar nenhum, é só um array escrito à mão.',
  code:
`export const TAREFAS_MOCK: Tarefa[] = [
  { id: '1', titulo: 'Estudar React Native', concluida: true },
  { id: '2', titulo: 'Terminar o cadastro do app', concluida: true },
  { id: '3', titulo: 'Criar a tela de listagem', concluida: false },
  { id: '4', titulo: 'Revisar os desafios de casa', concluida: false },
  { id: '5', titulo: 'Tomar um café', concluida: false },
];
`
},

/* ----------------------------------------------------------------------
   PARTE 3: A tela de listagem
   ---------------------------------------------------------------------- */
{
  part:'Tela de listagem', op:'note',
  title:'FlatList: a lista do React Native',
  md:
`Dá para mostrar uma lista com vários \`<Text>\` um embaixo do outro, mas não escala: com 500 tarefas o app inteiro fica lento, porque tudo é montado de uma vez. O React Native resolve isso com um componente próprio: \`FlatList\`.

\`\`\`tsx
<FlatList
  data={tarefas}
  keyExtractor={(tarefa) => tarefa.id}
  renderItem={({ item }) => (
    <Text>{item.titulo}</Text>
  )}
/>
\`\`\`

Três props fazem o trabalho todo:

- \`data\`, o array que vai virar lista, no nosso caso, \`Tarefa[]\`.
- \`keyExtractor\`, uma função que devolve um identificador **único** por item, é assim que o React sabe qual item é qual quando a lista muda. Por isso o \`id\` existe.
- \`renderItem\`, uma função que recebe \`{ item }\` (o objeto da vez) e devolve o JSX daquele item.

> \`FlatList\` só desenha na tela os itens visíveis no momento, e vai desenhando mais conforme a turma rola a lista. \`500\` tarefas ou \`5\`, a performance é a mesma.`
},
{
  part:'Tela de listagem', op:'challenge', time:'7 min',
  title:'Monte a ListaTarefasScreen',
  md:
`Crie \`src/screens/tarefas/ListaTarefasScreen.tsx\` com:

1. Os imports: \`React\`, os componentes do \`react-native\` que for usar (\`View\`, \`Text\`, \`FlatList\`, \`StyleSheet\`), e o tipo \`Tarefa\` de \`../../data/tarefas\`.
2. \`type Props = { tarefas: Tarefa[] }\`.
3. O componente recebendo \`{ tarefas }: Props\`.
4. Um título \`Minhas tarefas\`.
5. Um \`FlatList\` com \`data={tarefas}\`, \`keyExtractor\` pelo \`id\`, e \`renderItem\` mostrando o \`titulo\` de cada tarefa num \`Text\`.

**Ainda não** se preocupe com o botão de sair nem com mostrar se a tarefa está concluída, isso vem a seguir.

> O caminho do import muda porque o arquivo mora uma pasta mais fundo (\`src/screens/tarefas/\`): de lá até \`src/data\`, sobe uma pasta (\`../\`) para \`screens\`, sobe outra (\`../\`) para \`src\`, e desce em \`data\`.`
},
{
  part:'Tela de listagem', op:'file', target:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Criar ListaTarefasScreen.tsx',
  explain:'Dentro de uma subpasta <code>tarefas</code>, separada das telas de login e cadastro: é onde vão morar todas as telas relacionadas a tarefa.'
},
{
  part:'Tela de listagem', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Imports',
  explain:'<code>FlatList</code> e <code>TouchableOpacity</code> vêm do <code>react-native</code>, de fábrica. <code>Tarefa</code> é só um tipo, importado do arquivo de dados.',
  code:
`import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Tarefa } from '../../data/tarefas';

`
},
{
  part:'Tela de listagem', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Props e cabeçalho',
  explain:'Por enquanto só <code>tarefas</code> chega por prop. O <code>aoSair</code> aparece no próximo passo, junto com o botão de sair.',
  code:
`type Props = {
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

`
},
{
  part:'Tela de listagem', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'O FlatList',
  explain:'<code>item.concluida ? styles.status : styles.statusPendente</code> escolhe o estilo do rótulo dependendo do booleano, o mesmo <code>?:</code> (operador ternário) que decide entre dois valores numa linha só.',
  code:
`      <FlatList
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

`
},
{
  part:'Tela de listagem', op:'code', file:'src/screens/tarefas/ListaTarefasScreen.tsx',
  title:'Estilos',
  explain:'Nada novo aqui: <code>flexDirection: \'row\'</code> só coloca dois elementos lado a lado em vez de empilhados, é o que separa o título do status dentro de cada item.',
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
`
},

/* ----------------------------------------------------------------------
   PARTE 4: O login leva a algum lugar
   ---------------------------------------------------------------------- */
{
  part:'Login leva a algum lugar', op:'note',
  title:'A tela existe, mas ninguém chega nela',
  md:
`\`ListaTarefasScreen\` está pronta e não aparece em lugar nenhum: exatamente o mesmo problema da aula 3 com o \`CadastroScreen\`. A solução também é a mesma:

1. \`App.tsx\` precisa **conhecer** a tela nova (import) e aceitar mais um valor em \`tela\` (\`'lista'\`).
2. Alguém precisa **pedir** a troca, ainda um \`onPress\` chamando uma função recebida por prop.

Hoje quem pede a troca é o próprio \`handleLogin\`, depois que o usuário e a senha batem com a conta: em vez de só mostrar o \`Alert\` de boas-vindas, ele também avisa o \`App\` que o login deu certo.`
},
{
  part:'Login leva a algum lugar', op:'challenge', time:'8 min',
  title:'Ligue o login à lista',
  md:
`Sozinha, repetindo o padrão de "prop de função" das aulas passadas:

1. Em \`src/screens/LoginScreen.tsx\`, adicione \`aoLogar: () => void;\` ao \`type Props\`, e receba a prop na assinatura do componente.
2. Ainda no \`handleLogin\`, **depois** do \`Alert.alert('Bem-vindo!', ...)\` (não tire ele, só acrescente), chame \`aoLogar()\`.
3. Em \`App.tsx\`, importe \`ListaTarefasScreen\` de \`./src/screens/tarefas/ListaTarefasScreen\` e \`TAREFAS_MOCK\` de \`./src/data/tarefas\`.
4. Ainda no \`App.tsx\`, adicione um novo \`if (tela === 'lista')\` devolvendo \`<ListaTarefasScreen tarefas={TAREFAS_MOCK} aoSair={() => setTela('login')} />\`.
5. Passe \`aoLogar={() => setTela('lista')}\` para o \`<LoginScreen />\`.

> Mesma regra de sempre: \`onPress={aoLogar}\` (sem parênteses) dentro da tela, mas \`aoLogar={() => setTela('lista')}\` (com uma arrow function) na hora de entregar a prop lá do \`App\`.`
},
{
  part:'Login leva a algum lugar', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:'  aoCriarConta: () => void;',
  title:'Mais uma prop de função',
  explain:'Mesmo formato de <code>aoCriarConta</code>: uma função sem parâmetro e sem retorno, é o <code>App</code> quem decide o que ela faz.',
  code:
`  aoLogar: () => void;
`
},
{
  part:'Login leva a algum lugar', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:' }: Props) {',
  title:'Receber a nova prop',
  explain:'Mais um nome dentro das chaves, separado por vírgula, igual às outras.',
  code:', aoLogar'
},
{
  part:'Login leva a algum lugar', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:"Alert.alert('Bem-vindo!', `Login efetuado como ${usuario}.`);",
  title:'Avisar o App do login',
  explain:'O <code>Alert</code> continua aparecendo, só que agora, logo depois, o <code>LoginScreen</code> também avisa o pai que pode trocar de tela.',
  code:
`    aoLogar();
`
},
{
  part:'Login leva a algum lugar', op:'insert', file:'App.tsx',
  after:"import CadastroScreen from './src/screens/CadastroScreen';",
  title:'Importar a tela e o mock',
  explain:'Dois imports novos: o componente da lista e os dados que ele vai mostrar.',
  code:
`import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';
import { TAREFAS_MOCK } from './src/data/tarefas';
`
},
{
  part:'Login leva a algum lugar', op:'insert', file:'App.tsx',
  before:'  return <LoginScreen',
  title:'Mais um valor de tela',
  explain:'Terceiro <code>if</code> no mesmo padrão dos outros dois: se <code>tela</code> for <code>\'lista\'</code>, devolve a listagem e para ali.',
  code:
`  if (tela === 'lista') {
    return <ListaTarefasScreen tarefas={TAREFAS_MOCK} aoSair={() => setTela('login')} />;
  }

`
},
{
  part:'Login leva a algum lugar', op:'insert', file:'App.tsx',
  before:'/>;\n}',
  title:'A prop que fecha o ciclo',
  explain:'Assim que o login validar direitinho, <code>aoLogar</code> troca <code>tela</code> para <code>\'lista\'</code>, e o app renderiza a listagem no lugar do login.',
  code:'aoLogar={() => setTela(\'lista\')} '
},
{
  part:'Login leva a algum lugar', op:'note',
  title:'Teste o caminho completo',
  md:
`Recarregue o app e teste:

1. Tente entrar com qualquer coisa → **"Usuário ou senha inválidos."**, a lista continua fora do ar.
2. Cadastre uma conta nova.
3. Entre com o usuário e a senha cadastrados → o \`Alert\` de boas-vindas aparece e, ao fechá-lo, a **tela de listagem** aparece com as cinco tarefas mocadas.
4. Toque em **Sair** → volta pro login.

> Repare que a lista é sempre a mesma, \`TAREFAS_MOCK\` não muda com o uso, é só leitura por enquanto. Criar, marcar como concluída e apagar uma tarefa de verdade é o assunto da próxima aula.`
},

/* ----------------------------------------------------------------------
   PARTE 5: Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'O login leva a algum lugar',
  md:
`O app ganhou uma terceira tela e o primeiro dado que não veio de um formulário: um mock, mostrado numa lista de verdade, com \`FlatList\`.

## Conceitos de hoje
Separar dado de tela num arquivo próprio, \`type\` para descrever um dado (não só \`Props\`), \`FlatList\` (\`data\`, \`keyExtractor\`, \`renderItem\`), operador ternário (\`?:\`) para estilo condicional, mais um valor no estado de navegação.

## Desafios pra casa
Todos possíveis com o que já foi visto:

1. **Componente próprio:** extraia o \`renderItem\` da \`FlatList\` para um componente \`TarefaItem.tsx\`, recebendo a \`tarefa\` por prop.
2. **Contador:** mostre no cabeçalho quantas tarefas estão concluídas, de quantas no total (dica: \`tarefas.filter(t => t.concluida).length\`).
3. **Lista vazia:** troque \`TAREFAS_MOCK\` por um array vazio e veja o que acontece; depois use a prop \`ListEmptyComponent\` do \`FlatList\` para mostrar um texto tipo "Nenhuma tarefa ainda".
4. **Ordenar:** mostre as tarefas pendentes primeiro, concluídas por último (dica: \`.slice().sort(...)\`, nunca ordene o array original direto).
5. **(avançado, gancho pra próxima aula)** Pesquise como um botão poderia **mudar** o \`concluida\` de uma tarefa. Vai perceber que \`TAREFAS_MOCK\` sendo uma constante importada é um problema, essa é a primeira peça da aula 5.

> Entrega: o link do Snack com login, cadastro e a listagem funcionando.`
},
];

global.AULA_LISTAGEM_TAREFAS = {
  meta: {
    titulo:    'Listando tarefas (React Native)',
    projeto:   'listando-tarefas-react-native',
    subtitulo: 'React Native puro · sem bibliotecas externas',
    vazio:     'Projeto da aula 3.<br>Login e cadastro já estão prontos.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    null, // continua sem nenhuma dependência nova
  steps:   STEPS,
};

})(window);
