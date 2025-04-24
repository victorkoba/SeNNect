import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, ButtonPost } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

function PaginaInicial(){
  const navigation = useNavigation();

  return(
    <Container>
      <ButtonPost>
        <Feather name="edit-2" color="#fff" size={25} />
      </ButtonPost>
    </Container>
  );
}

export default PaginaInicial;