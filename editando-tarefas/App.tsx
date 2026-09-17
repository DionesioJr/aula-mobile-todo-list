import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ListaTarefasScreen from './src/screens/tarefas/ListaTarefasScreen';
import FormularioTarefaScreen from './src/screens/tarefas/FormularioTarefaScreen';
import { Tarefa, TAREFAS_MOCK } from './src/data/tarefas';

export default function App() {
  const [tela, setTela] = useState('login');
  const [conta, setConta] = useState({ usuario: '', senha: '' });
  const [tarefas, setTarefas] = useState(TAREFAS_MOCK);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

  function cadastrar(usuario: string, senha: string) {
    setConta({ usuario: usuario, senha: senha });
    setTela('login');
  }

  function abrirNovaTarefa() {
    setTarefaEmEdicao(null);
    setTela('formulario');
  }

  function abrirEdicaoTarefa(tarefa: Tarefa) {
    setTarefaEmEdicao(tarefa);
    setTela('formulario');
  }

  function salvarTarefa(titulo: string) {
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

  function alternarConcluida(id: string) {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }

  function excluirTarefa(id: string) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  if (tela === 'cadastro') {
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

  if (tela === 'lista') {
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
