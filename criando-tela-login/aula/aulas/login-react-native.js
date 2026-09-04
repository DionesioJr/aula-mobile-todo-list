/* =========================================================================
   AULA 2 — Tela de Login (React Native puro, sem bibliotecas externas)

   Diferença para a aula 1: nada de digitar 3 horas seguidas. A turma só vê
   uma solução sendo digitada DEPOIS de tentar sozinha (etapas `challenge`).
   Escopo enxuto de propósito — só a tela de login, só o que o React Native
   já traz de fábrica (View, Text, TextInput, TouchableOpacity, StyleSheet,
   Alert, useState). Sem react-navigation, sem nenhuma lib de UI: não há
   nada pra instalar nesta aula.

   Quem toca a aula é o motor em ../player/player.js (mesmo motor da aula 1,
   com um tipo de etapa novo: `challenge`).
   ========================================================================= */
(function (global) {
'use strict';

const INITIAL_ENTRIES = [];
const INITIAL_FILES = {};

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert
   ========================================================================= */
const STEPS = [

/* ----------------------------------------------------------------------
   PARTE 1 — Preparação
   ---------------------------------------------------------------------- */
{
  part:'Preparação', op:'intro',
  title:'Tela de Login',
  eyebrow:'Aula 2 · React Native',
  md:
`Hoje a turma constrói só **uma tela**: o login. Sem navegação, sem biblioteca nenhuma além do que o React Native já traz de fábrica — e sem 3 horas de copiar código alheio.

- **Dinâmica nova:** em vários pontos a aula **para** e mostra um desafio. A turma tenta sozinha, com o que já foi visto até ali — só depois a solução é digitada na tela.
- **Estado, aos poucos:** primeiro a tela sem nenhum estado, depois um campo controlado, depois o outro, depois a validação. Cada degrau usa só o degrau anterior.
- **Zero instalação:** nenhuma dependência nova — só \`useState\` do React e componentes que já vêm no \`react-native\`.

> **→** avança · **←** volta · **↑ ↓** mudam a velocidade da digitação. Nos cartões roxos de **desafio**, pare de apertar seta — é a vez da turma.`
},
{
  part:'Preparação', op:'note',
  title:'Passo 1 — Abrir o projeto',
  md:
`Abra um Snack novo em [snack.expo.dev](https://snack.expo.dev) (ou continue no projeto da aula passada, se preferir) e deixe o **Expo Go** conectado no celular.

- Apague o conteúdo de exemplo de \`App.js\` e renomeie para \`App.tsx\`.
- Vamos criar um arquivo próprio só para a tela: \`src/screens/LoginScreen.tsx\`.

> Nenhuma dependência para declarar hoje — o \`package.json\` nem precisa ser tocado.`
},
{
  part:'Preparação', op:'folder', target:'src/screens',
  title:'Criar a pasta src/screens',
  explain:'Mesma regra da aula passada: <b>uma tela por arquivo</b>. Hoje só teremos uma tela, mas a pasta já nasce no padrão certo para as próximas aulas.'
},
{
  part:'Preparação', op:'file', target:'src/screens/LoginScreen.tsx',
  title:'Criar LoginScreen.tsx',
  explain:'Vamos construir esse arquivo em camadas: primeiro só a parte visual (sem estado nenhum), depois vamos ligando o estado aos poucos.'
},

/* ----------------------------------------------------------------------
   PARTE 2 — Tela estática (sem estado)
   ---------------------------------------------------------------------- */
{
  part:'Tela estática', op:'note',
  title:'Os quatro componentes de hoje',
  md:
`Todo o visual da tela sai de só quatro peças do \`react-native\` — sem instalar nada:

- **\`View\`** — uma caixa (o equivalente à \`div\` da web).
- **\`Text\`** — obrigatório para exibir qualquer texto.
- **\`TextInput\`** — campo de digitação.
- **\`TouchableOpacity\`** — área tocável (não existe \`<button>\` no React Native).

> A estilização de hoje é a mínima possível — \`StyleSheet.create\` básico, sem enfeite. O foco é **estado**, não design.`
},
{
  part:'Tela estática', op:'challenge', time:'4 min',
  title:'Monte a estrutura, sozinho',
  md:
`Sem olhar a solução ainda: monte a tela com \`View\`, \`Text\`, dois \`TextInput\` (usuário e senha) e um \`TouchableOpacity\` com o texto "Entrar" dentro. **Nenhum estado ainda** — os campos podem ficar sem \`value\`.

- Um título com \`Text\` no topo.
- Um \`TextInput\` com \`placeholder="Usuário"\`.
- Um \`TextInput\` com \`placeholder="Senha"\` e a prop \`secureTextEntry\` (esconde o texto digitado).
- Um botão "Entrar" — \`TouchableOpacity\` por fora, \`Text\` por dentro.

> Repare que, mesmo sem \`value\`, dá pra digitar nos campos — o \`TextInput\` guarda o próprio texto sozinho. O problema é que **o React não sabe** o que tem lá dentro. É esse o próximo passo.`
},
{
  part:'Tela estática', op:'code', file:'src/screens/LoginScreen.tsx',
  title:'Imports',
  explain:'Nada de <code>useState</code> por enquanto — só os componentes visuais que vamos usar.',
  code:
`import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
`
},
{
  part:'Tela estática', op:'code', file:'src/screens/LoginScreen.tsx',
  title:'O componente, sem estado nenhum',
  explain:'Um componente React é só uma função que devolve JSX. Os campos ainda <b>não são controlados</b> — sem <code>value</code>, o próprio <code>TextInput</code> guarda o texto digitado (estado interno dele, não do nosso componente).',
  code:
`
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Aplicação</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
`
},
{
  part:'Tela estática', op:'code', file:'src/screens/LoginScreen.tsx',
  title:'Estilos: o mínimo pra ficar legível',
  explain:'Em React Native, estilo é objeto JavaScript (<b>camelCase</b>, sem "px"). Não é o foco de hoje — por isso é só isso: caixa, título, campo e botão.',
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
{
  part:'Tela estática', op:'file', target:'App.tsx',
  title:'Criar App.tsx',
  explain:'Hoje não existe navegação — <code>App.tsx</code> só mostra a <code>LoginScreen</code> direto. Isso muda na próxima aula, quando surgir uma segunda tela pra ir.'
},
{
  part:'Tela estática', op:'code', file:'App.tsx',
  title:'App.tsx aponta para a tela',
  explain:'<code>App.tsx</code> é o ponto de entrada do projeto: o Expo sempre chama esse componente primeiro.',
  code:
`import React from 'react';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return <LoginScreen />;
}
`
},
{
  part:'Tela estática', op:'note',
  title:'Teste 1 — rodar no celular',
  md:
`Salve e olhe o Expo Go: a tela aparece, dá pra digitar nos dois campos e o botão pisca ao tocar.

- Apague o texto de um campo e digite de novo: funciona, mas é o **próprio TextInput** fazendo isso — nosso componente não sabe de nada.
- Tocar "Entrar" não faz nada ainda: não passamos nenhuma função pro botão.

> Prova de que dá pra construir tela em React Native **sem nenhum estado**. Estado só entra quando o componente precisa saber o que está escrito — que é o próximo passo.`
},

/* ----------------------------------------------------------------------
   PARTE 3 — Estado: o campo usuário
   ---------------------------------------------------------------------- */
{
  part:'Estado: usuário', op:'note',
  title:'O que é useState',
  md:
`\`useState\` cria uma "caixinha" de memória dentro do componente: um valor atual e uma função para trocar esse valor.

- \`const [usuario, setUsuario] = useState('')\` — \`usuario\` é o valor agora; \`setUsuario\` é a única forma correta de mudá-lo.
- Chamar \`setUsuario(...)\` faz o componente **re-renderizar** — é assim que a tela "sabe" que o texto mudou.
- **Componente controlado**: quando um \`TextInput\` recebe \`value={usuario}\` e \`onChangeText={setUsuario}\`, quem manda no que aparece na tela é o **estado**, não o teclado.

> Vou ligar isso no campo de **usuário** primeiro, ao vivo. Daqui a pouco é a vez da turma repetir sozinha para a **senha**.`
},
{
  part:'Estado: usuário', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:" from 'react';",
  title:'Importar o useState',
  explain:'<code>useState</code> vem do próprio <code>React</code> — só precisa importar junto.',
  code:', { useState }'
},
{
  part:'Estado: usuário', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:'export default function LoginScreen() {',
  title:'Criar o estado do usuário',
  explain:'Começa vazio (<code>\'\'</code>) — nenhum usuário digitado ainda.',
  code:
`  const [usuario, setUsuario] = useState('');
`
},
{
  part:'Estado: usuário', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:'placeholder="Usuário"',
  title:'Conectar o campo ao estado',
  explain:'<code>value</code> manda o React exibir o que está no estado; <code>onChangeText</code> chama <code>setUsuario</code> a cada letra digitada. Esse par é o componente controlado.',
  code:
`        value={usuario}
        onChangeText={setUsuario}
`
},
{
  part:'Estado: usuário', op:'note',
  title:'Teste rápido',
  md:
`Salve e digite no campo **Usuário** — visualmente nada muda, mas agora é diferente de antes.

- Antes: o texto vivia só dentro do \`TextInput\`, escondido do resto do app.
- Agora: o texto vive na variável \`usuario\` — o componente \`LoginScreen\` sabe exatamente o que está escrito, a cada tecla.

> É por isso que dá pra validar, mostrar erro, mandar pra um servidor etc. — sem estado, o React nunca sabe o que tem no campo.`
},

/* ----------------------------------------------------------------------
   PARTE 4 — Estado: o campo senha (desafio)
   ---------------------------------------------------------------------- */
{
  part:'Estado: senha', op:'challenge', time:'3 min',
  title:'Repita o padrão para a senha',
  md:
`Sozinha agora: faça pro campo **Senha** exatamente o que acabei de fazer pro campo **Usuário**. É o mesmo padrão, três vezes:

1. Criar o estado: \`const [senha, setSenha] = useState('');\`
2. Conectar \`value={senha}\` no \`TextInput\` da senha.
3. Conectar \`onChangeText={setSenha}\` no mesmo campo.

> Não tem pegadinha nenhuma — é literalmente repetir o que já foi feito, trocando o nome. Essa repetição é proposital: é assim que o padrão gruda.`
},
{
  part:'Estado: senha', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:"const [usuario, setUsuario] = useState('');",
  title:'O estado da senha',
  explain:'Igual ao de usuário — outra caixinha de memória, independente.',
  code:
`  const [senha, setSenha] = useState('');
`
},
{
  part:'Estado: senha', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:'placeholder="Senha"',
  title:'Conectar o campo de senha',
  explain:'Mesmo par <code>value</code> + <code>onChangeText</code>. A prop <code>secureTextEntry</code>, que já estava lá, continua escondendo o texto — isso não muda com o estado.',
  code:
`        value={senha}
        onChangeText={setSenha}
`
},

/* ----------------------------------------------------------------------
   PARTE 5 — Login e validação (desafio)
   ---------------------------------------------------------------------- */
{
  part:'Login e validação', op:'note',
  title:'Usando o estado pra decidir algo',
  md:
`Agora que \`usuario\` e \`senha\` existem como variáveis normais, dá pra usar em um \`if\` comum — nada de mágico.

- \`Alert.alert(titulo, mensagem)\` mostra um aviso nativo do sistema — vem de \`react-native\`, não precisa instalar.
- A validação de hoje é mínima: só checa se os dois campos foram preenchidos. Não existe conta real pra comparar.

> Isso vai virar a função \`handleLogin\`, chamada quando o botão "Entrar" for tocado.`
},
{
  part:'Login e validação', op:'challenge', time:'5 min',
  title:'Escreva a função handleLogin',
  md:
`Sozinha: escreva uma função \`handleLogin\` dentro do componente, usando os estados \`usuario\` e \`senha\` que já existem.

- Se \`usuario\` **ou** \`senha\` estiverem vazios, mostra \`Alert.alert('Atenção', 'Preencha usuário e senha.')\` e para (não segue em frente).
- Se os dois estiverem preenchidos, mostra um \`Alert.alert\` de boas-vindas, incluindo o nome digitado na mensagem.
- Não esqueça de ligar a função ao botão: \`onPress={handleLogin}\` no \`TouchableOpacity\`.

> Pra colocar uma variável dentro de um texto, troque as aspas pelo acento grave (crase) no começo e no fim, e use \`\${variavel}\` no meio — é a **template string** do JavaScript.`
},
{
  part:'Login e validação', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:" } from 'react-native';",
  title:'Importar o Alert',
  explain:'<code>Alert</code> também é de fábrica do <code>react-native</code> — só falta importar junto dos outros.',
  code:', Alert'
},
{
  part:'Login e validação', op:'insert', file:'src/screens/LoginScreen.tsx',
  after:"const [senha, setSenha] = useState('');",
  title:'A função handleLogin',
  explain:'Primeiro valida; se passou da validação, os dois campos têm conteúdo. A crase com <code>${usuario}</code> é a template string — insere o valor da variável dentro do texto.',
  code:
`
  function handleLogin() {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }
    Alert.alert('Bem-vindo!', \`Login efetuado como \${usuario}.\`);
  }

`
},
{
  part:'Login e validação', op:'insert', file:'src/screens/LoginScreen.tsx',
  before:'style={styles.botao}',
  title:'Ligar o botão à função',
  explain:'<code>onPress</code> recebe a função (sem chamar com <code>()</code> — só o nome). O React chama pra gente quando o botão for tocado. <b>Tela de login pronta!</b>',
  code:'onPress={handleLogin} '
},
{
  part:'Login e validação', op:'note',
  title:'Teste final',
  md:
`Salve e teste os três caminhos no celular:

- Tocar "Entrar" com os dois campos vazios → alerta "Preencha usuário e senha."
- Preencher só um dos dois → mesmo alerta.
- Preencher os dois → alerta de boas-vindas com o nome digitado.

> Tudo isso sem nenhuma biblioteca instalada — só \`useState\` do React e componentes de fábrica do \`react-native\`.`
},

/* ----------------------------------------------------------------------
   PARTE 6 — Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Tela de login pronta',
  md:
`Em pouco mais de 20 blocos de código — e três desafios resolvidos pela turma — a tela ficou completa: estrutura visual, dois campos controlados e validação. Na próxima aula ela ganha companhia: uma segunda tela e navegação entre elas.

## Conceitos de hoje
Componente funcional e JSX, \`useState\`, componente controlado (\`value\` + \`onChangeText\`), \`StyleSheet\`, \`Alert\`, condicionais com estado.

## Desafios pra casa
Todos possíveis só com o que a turma já viu hoje:

1. Mostrar/ocultar senha: um \`useState\` booleano controlando \`secureTextEntry\`, com um botão ou ícone de olho.
2. Trocar o \`Alert\` de erro por um \`Text\` vermelho na própria tela (mais um estado: a mensagem de erro).
3. Desabilitar o botão "Entrar" enquanto algum campo estiver vazio (prop \`disabled\` do \`TouchableOpacity\`).
4. Um contador de tentativas erradas, mostrado na tela.
5. (avançado, pra próxima aula) pesquisar sobre \`AsyncStorage\` — como lembrar o último usuário digitado mesmo depois de fechar o app.`
},
];

global.AULA_LOGIN_RN = {
  meta: {
    titulo:    'Aula 2 — Tela de Login (React Native)',
    projeto:   'login-react-native',
    subtitulo: 'React Native puro · sem bibliotecas externas',
    vazio:     'Projeto vazio.<br>Vamos criar tudo do zero.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    null, // nenhuma dependência nova nesta aula
  steps:   STEPS,
};

})(window);
