import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Props = {
  aoCadastrar: (usuario: string, senha: string) => void;
  aoVoltar: () => void;
};

export default function CadastroScreen({ aoCadastrar, aoVoltar }: Props) {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function handleCadastrar() {
    if (!nome || !usuario || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (senha.length < 4) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 4 caracteres.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }
    Alert.alert('Conta criada!', `Bem-vindo, ${nome}. Agora é só entrar.`);
    aoCadastrar(usuario, senha);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleCadastrar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={aoVoltar}>
        <Text style={styles.link}>Já tenho conta, voltar</Text>
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
