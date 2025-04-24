// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React, { useState } from 'react';
import { Text, Alert, Image } from 'react-native';
import { Container, Input, ImageArea, UploadButton, UploadText, SubmitButton, SubmitText } from './stylesCriarPost';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { getAuth } from 'firebase/auth';
import s3 from '../../../awsConfig'

export default function CriarPost() {
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const navigation = useNavigation();

  bucket_name = 'sennect-30-22';

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão negada', 'Você precisa permitir o acesso à galeria para continuar.');
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
      alert('Erro', 'Adicione uma descrição e uma imagem.');
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
    const imageId = uuid.v4();
  
    try {
      // 🔍 Pega os dados do Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      const nomeUsuario = userData ? userData.nome : 'Desconhecido';
  
      const response = await fetch(imagem);
      const blob = await response.blob();
      const filename = `imagens/${imageId}.jpg`;
  
      const params = {
        Bucket: bucket_name,
        Key: filename,
        Body: blob,
        ContentType: "image/jpeg",
      };
  
      s3.upload(params, async (err, data) => {
        if (err) {
          console.log("Erro no upload:", err);
          alert("Erro", "Erro no envio da imagem.");
        } else {
          try {
            await addDoc(collection(db, 'posts'), {
              descricao: descricao,
              imagemUrl: data.Location,
              createdAt: serverTimestamp(),
              userId: user.uid,
              userName: nomeUsuario,
            });
  
            alert("Sucesso", "Post publicado com sucesso!");
            setImagem(null);
            setDescricao('');
            navigation.goBack();
          } catch (error) {
            console.error('Erro ao salvar post no Firestore:', error);
            alert("Erro", "Não foi possível salvar o post.");
          }
        }
      });
    } catch (err) {
      console.error('Erro ao postar:', err);
      alert('Erro', 'Não foi possível postar. Tente novamente.');
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