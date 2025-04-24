import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FlatList, Text, View } from 'react-native';

export default function Mensagens({ destinatarioId }) {
  const [mensagens, setMensagens] = useState([]);
  const auth = getAuth();
  const remetenteId = auth.currentUser?.uid; // O ID do usuário autenticado

  if (!remetenteId || !destinatarioId) {
    console.error('IDs de remetente ou destinatário não definidos!');
    return null;
  }

  // Criação do ID da conversa.
  const conversaId = [remetenteId, destinatarioId].sort().join('_');

  useEffect(() => {
    const q = query(
      collection(db, 'conversas', conversaId, 'mensagens'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensagens(msgs);
    });

    return () => unsubscribe();
  }, [remetenteId, destinatarioId]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{
            alignSelf: item.remetenteId === remetenteId ? 'flex-end' : 'flex-start',
            backgroundColor: item.remetenteId === remetenteId ? '#DCF8C6' : '#eee',
            padding: 8,
            borderRadius: 5,
            marginVertical: 4,
            maxWidth: '80%',
          }}>
            {item.texto}
          </Text>
        )}
      />
    </View>
  );
}
