import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';
import FormularioTarefaScreen from './src/screens/tarefas/FormularioTarefaScreen';
import { Tarefa, TAREFAS_MOCK } from './src/data/tarefas';
import { RootStackParamList } from './src/navigation/tipos';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [tarefas, setTarefas] = useState(TAREFAS_MOCK);

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

  function alternarConcluida(id: string) {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }

  function excluirTarefa(id: string) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

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
        <Stack.Screen
          name="Formulario"
          options={({ route }) => ({
            title: route.params ? 'Editar tarefa' : 'Nova tarefa',
          })}
        >
          {(props) => <FormularioTarefaScreen {...props} aoSalvar={salvarTarefa} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
