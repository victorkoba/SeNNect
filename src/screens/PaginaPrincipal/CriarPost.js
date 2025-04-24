import React, { useState } from 'react';
import { Text, Alert, Image } from 'react-native';
import { Container, Input, ImageArea, UploadButton, UploadText, SubmitButton, SubmitText } from './stylesCriarPost';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { storage, db } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import uuid from 'react-native-uuid';

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
    if (!descricao || !imagem?.uri) {
        alert('Erro', 'Adicione uma descrição e uma imagem.');
        return;
      }
    
      const imageId = uuid.v4();
      const storageRef = ref(storage, `posts/${imageId}.jpg`);
    
      try {
        // Pega imagem local e envia pro Firebase Storage
        const response = await fetch(imagem.uri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
    
        const url = await getDownloadURL(storageRef);
    
        // Salva no Firestore
        await addDoc(collection(db, 'posts'), {
          descricao,
          imagemUrl: url,
          createdAt: serverTimestamp()
        });
    
        navigation.goBack();
      } catch (err) {
        alert('Erro', 'Não foi possível postar. Tente novamente.');
        console.log(err);
      }

    console.log('Post criado:', { descricao, imagem });
    navigation.goBack();
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
