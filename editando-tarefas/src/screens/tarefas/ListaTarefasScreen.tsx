import React from 'react';
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

export default function ListaTarefasScreen({
  tarefas,
  aoSair,
  aoNovaTarefa,
  aoTocarTarefa,
  aoAlternarConcluida,
  aoExcluirTarefa,
}: Props) {
  function confirmarExclusao(tarefa: Tarefa) {
    Alert.alert('Excluir tarefa', `Apagar "${tarefa.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => aoExcluirTarefa(tarefa.id) },
    ]);
  }

  return (
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

      <FlatList
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
