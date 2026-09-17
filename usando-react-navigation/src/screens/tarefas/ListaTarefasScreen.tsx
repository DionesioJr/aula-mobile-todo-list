import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/tipos';
import { TAREFAS_MOCK } from '../../data/tarefas';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;

export default function ListaTarefasScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={styles.link}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={TAREFAS_MOCK}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
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
