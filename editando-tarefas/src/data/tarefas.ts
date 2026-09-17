export type Tarefa = {
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
