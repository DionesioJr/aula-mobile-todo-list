import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Props = {
  conta: { usuario: string; senha: string };
  aoCriarConta: () => void;
};

export default function LoginScreen({ conta, aoCriarConta }: Props) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }
    if (usuario !== conta.usuario || senha !== conta.senha) {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
      return;
    }
    Alert.alert('Bem-vindo!', `Login efetuado como ${usuario}.`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Aplicação</Text>

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

      <TouchableOpacity onPress={handleLogin} style={styles.botao}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={aoCriarConta}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
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
