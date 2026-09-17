import { Tarefa } from '../data/tarefas';

export type RootStackParamList = {
  Login: { usuario: string; senha: string } | undefined;
  Cadastro: undefined;
  Lista: undefined;
  Formulario: { tarefa: Tarefa } | undefined;
};
