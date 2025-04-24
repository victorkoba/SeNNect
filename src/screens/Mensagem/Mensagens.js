import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useMensagens } from './hooks/useMensagens';

export default function Mensagens({ route }) {
  const { destinatarioId } = route.params;
  const userId = 'user1'; // Substituir com ID real
  const conversaId = [userId, destinatarioId].sort().join('_');
  const mensagens = useMensagens(conversaId, userId);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={mensagens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginBottom: 10, color: item.remetenteId === userId ? 'blue' : 'black' }}>
            {item.texto}
          </Text>
        )}
      />
    </View>
  );
}
