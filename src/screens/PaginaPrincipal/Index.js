import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Container, ButtonPost, PostImage, PostContainer, LikeButton, LikeText } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function PaginaInicial() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        image: doc.data().imagemUrl,
        descricao: doc.data().descricao,
        userName: doc.data().userName || 'Usuário desconhecido',
        liked: false,
      }));
      setPosts(lista);
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, liked: !post.liked } : post
    ));
  };

  const renderItem = ({ item }) => (
    <PostContainer>
      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.userName}</Text>
      <PostImage source={{ uri: item.image }} />
      <Text style={{ marginVertical: 5 }}>{item.descricao}</Text>
      <LikeButton onPress={() => toggleLike(item.id)}>
        <Feather 
          name={item.liked ? 'heart' : 'heart'} 
          color={item.liked ? '#e60000' : '#aaa'} 
          size={24} 
        />
        <LikeText>{item.liked ? 'Curtido' : 'Curtir'}</LikeText>
      </LikeButton>
    </PostContainer>
  );

  return (
    <Container>
      <FlatList 
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <ButtonPost onPress={() => navigation.navigate('CriarPost')}>
        <Feather name="edit-2" color="#fff" size={25} />
      </ButtonPost>
    </Container>
  );
}

export default PaginaInicial;