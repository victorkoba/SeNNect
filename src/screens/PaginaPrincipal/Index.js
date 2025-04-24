import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Container, ButtonPost, PostImage, PostContainer, LikeButton, LikeText } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

function PaginaInicial(){
  const navigation = useNavigation();

  // Simulando posts
  const [posts, setPosts] = useState([
    { id: '1', image: 'https://placekitten.com/400/300', liked: false },
    { id: '2', image: 'https://placekitten.com/401/300', liked: false },
  ]);

  const toggleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, liked: !post.liked } : post
    ));
  };

  const renderItem = ({ item }) => (
    <PostContainer>
      <PostImage source={{ uri: item.image }} />
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

  return(
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
