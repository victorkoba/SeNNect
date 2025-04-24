import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Alert } from 'react-native';

export const useMensagens = (conversaId, userId) => {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'mensagens', conversaId, 'mensagens'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const novas = [];
      const dados = snapshot.docs.map(doc => {
        const data = doc.data();
        if (!data.lida && data.destinatarioId === userId) {
          novas.push(data);
        }
        return { id: doc.id, ...data };
      });

      if (novas.length > 0) {
        Alert.alert('Nova mensagem!', novas[0].texto);
      }

      setMensagens(dados);
    });

    return () => unsubscribe();
  }, [conversaId]);

  return mensagens;
};
