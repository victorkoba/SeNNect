// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React, { useState } from 'react';
import { Text, Alert, Image } from 'react-native';
import { Container, Input, ImageArea, UploadButton, UploadText, SubmitButton, SubmitText } from './stylesCriarPost';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { getAuth } from 'firebase/auth';

export default function CriarPost() {
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const navigation = useNavigation();

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handlePostar = async () => {
    if (!descricao || !imagem) {
      Alert.alert('Erro', 'Adicione uma descrição e uma imagem.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const imageId = uuid.v4();

    try {
      // 1. Pede presigned URL da API
      const response = await fetch('http://SEU_BACKEND_URL:3000/get-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: `posts/${imageId}.jpg` })
      });

      const { uploadUrl, imageUrl } = await response.json();

      // 2. Envia imagem diretamente pro S3
      const imageData = await fetch(imagem);
      const blob = await imageData.blob();

      await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': blob.type
        }
      });

      // 3. Salva post no Firestore
      await addDoc(collection(db, 'posts'), {
        descricao,
        imagemUrl: imageUrl,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: user.displayName || 'Anônimo'
      });

      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível postar. Tente novamente.');
      console.error('Erro ao postar:', err);
    }
  };

  return (
    <Container>
      <UploadButton onPress={abrirGaleria}>
        <UploadText>Selecionar Imagem</UploadText>
      </UploadButton>

      {imagem && (
        <ImageArea>
          <Image source={{ uri: imagem }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
        </ImageArea>
      )}

      <Text>Descrição:</Text>
      <Input
        placeholder="Escreva uma legenda para seu post..."
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <SubmitButton onPress={handlePostar}>
        <SubmitText>Publicar</SubmitText>
      </SubmitButton>
    </Container>
  );
}