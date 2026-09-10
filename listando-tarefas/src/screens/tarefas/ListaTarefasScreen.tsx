import React from 'react';
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
