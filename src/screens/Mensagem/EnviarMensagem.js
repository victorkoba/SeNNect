// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function EnviarMensagem({ destinatarioId }) {
  const [mensagem, setMensagem] = useState('');
  const auth = getAuth();
  const remetenteId = auth.currentUser?.uid;

  const conversaId = [remetenteId, destinatarioId].sort().join('_');

  const enviar = async () => {
    if (!mensagem) return;

    try {
      await addDoc(collection(db, 'mensagens', conversaId, 'mensagens'), {
        texto: mensagem,
        remetenteId,
        destinatarioId,
        createdAt: serverTimestamp(),
        lida: false,
      });
      setMensagem('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChangeText={setMensagem}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Enviar" onPress={enviar} />
    </View>
  );
}
