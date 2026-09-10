import React, { useState } from 'react';
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
