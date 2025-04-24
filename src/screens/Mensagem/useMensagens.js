import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Alert } from 'react-native';

export default function useMensagem(remetenteId, destinatarioId) {
  const [mensagens, setMensagens] = useState([]);
  const conversaId = [remetenteId, destinatarioId].sort().join('_');

  useEffect(() => {
    console.log('Remetente ID:', remetenteId);  // Verificar remetenteId
    console.log('Destinatário ID:', destinatarioId);  // Verificar destinatarioId
    if (!remetenteId || !destinatarioId) return;

    const q = query(
      collection(db, 'mensagens', conversaId, 'mensagens'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Mensagens recebidas:', msgs); // Verificar mensagens recebidas

      setMensagens(msgs);

      if (msgs.length > 0) {
        const ultimaMensagem = msgs[msgs.length - 1];
        if (ultimaMensagem.remetenteId !== remetenteId) {
          Alert.alert('Nova mensagem', 'Você recebeu uma nova mensagem!');
        }
      }
    });

    return () => unsubscribe();
  }, [remetenteId, destinatarioId]);

  return mensagens;
}
