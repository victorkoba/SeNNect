// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { 
  Container, 
  ButtonPost, 
  PostImage, 
  PostContainer, 
  LikeButton, 
  LikeText, 
  CommentInput 
} from './styles';
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
      const lista = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          image: data.imagemUrl || null,
          descricao: data.descricao || '',
          userName: data.userName || 'Usuário desconhecido',
          liked: false,
          comment: '',
        };
      });
      setPosts(lista);
    }, (error) => {
      console.error("Erro ao buscar posts:", error);
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, liked: !post.liked } : post
    ));
  };

  const handleCommentChange = (id, text) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, comment: text } : post
    ));
  };

  const renderItem = ({ item }) => (
    <PostContainer>
      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.userName}</Text>
      {item.image && <PostImage source={{ uri: item.image }} />}
      <Text style={{ marginVertical: 5 }}>{item.descricao}</Text>

      <LikeButton onPress={() => toggleLike(item.id)}>
        <Feather 
          name="heart" 
          color={item.liked ? '#e60000' : '#aaa'} 
          size={24} 
        />
        <LikeText>{item.liked ? 'Curtido' : 'Curtir'}</LikeText>
      </LikeButton>

      <CommentInput
        placeholder="Adicione um comentário..."
        value={item.comment}
        onChangeText={(text) => handleCommentChange(item.id, text)}
      />
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