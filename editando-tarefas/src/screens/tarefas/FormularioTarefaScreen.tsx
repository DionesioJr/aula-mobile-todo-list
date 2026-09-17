import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Tarefa } from '../../data/tarefas';

type Props = {
  tarefaEditando: Tarefa | null;
  aoSalvar: (titulo: string) => void;
  aoVoltar: () => void;
};

export default function FormularioTarefaScreen({ tarefaEditando, aoSalvar, aoVoltar }: Props) {
  const [titulo, setTitulo] = useState(tarefaEditando ? tarefaEditando.titulo : '');

  function handleSalvar() {
    if (!titulo) {
      Alert.alert('Atenção', 'Digite um título para a tarefa.');
      return;
    }
    aoSalvar(titulo);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tarefaEditando ? 'Editar tarefa' : 'Nova tarefa'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity onPress={handleSalvar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={aoVoltar}>
        <Text style={styles.link}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  link: { color: '#2e6de6', textAlign: 'center', marginTop: 16 },
});
