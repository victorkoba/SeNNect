import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Container, Input, ImageInput, SubmitButton, SubmitText } from './stylesCriarPost';
import { useNavigation } from '@react-navigation/native';

function CriarPost() {
  const [descricao, setDescricao] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!descricao || !imageUrl) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    // Aqui você pode enviar os dados para o Firebase
    console.log('Post enviado:', { descricao, imageUrl });

    // Após enviar, pode voltar pra página inicial
    navigation.goBack();
  };

  return (
    <Container>
      <Text>Imagem (URL):</Text>
      <ImageInput 
        placeholder="https://exemplo.com/sua-imagem.jpg" 
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <Text>Descrição:</Text>
      <Input 
        placeholder="O que está acontecendo?"
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <SubmitButton onPress={handleSubmit}>
        <SubmitText>Publicar</SubmitText>
      </SubmitButton>
    </Container>
  );
}

export default CriarPost;
