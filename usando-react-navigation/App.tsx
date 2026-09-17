import React from 'react';
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
