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
import { collection, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion, arrayRemove, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { getAuth } from 'firebase/auth';

function PaginaInicial() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const lista = await Promise.all(snapshot.docs.map(async (docPost) => {
        const postData = docPost.data();
        const commentsSnap = await getDocs(collection(db, 'posts', docPost.id, 'comentarios'));
        const comentarios = commentsSnap.docs.map(c => c.data());

        return {
          id: docPost.id,
          image: postData.imagemUrl,
          descricao: postData.descricao,
          userName: postData.userName,
          likes: postData.likes || [],
          comentarios,
        };
      }));

      setPosts(lista);
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = async (postId, liked) => {
    const postRef = doc(db, 'posts', postId);

    await updateDoc(postRef, {
      likes: liked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const addComment = async (postId, text) => {
    const postRef = collection(db, 'posts', postId, 'comentarios');

    await addDoc(postRef, {
      texto: text,
      userId: user.uid,
      userName: user.displayName || 'Anônimo',
      createdAt: new Date(),
    });
  };

  const renderItem = ({ item }) => {
    const liked = item.likes.includes(user.uid);
    const totalCurtidas = item.likes.length;

    return (
      <PostContainer>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.userName}</Text>
        {item.image && <PostImage source={{ uri: item.image }} />}
        <Text style={{ marginVertical: 4 }}>{item.descricao}</Text>

        <LikeButton onPress={() => toggleLike(item.id, liked)}>
          <Feather name="heart" color={liked ? '#e60000' : '#aaa'} size={24} />
          <LikeText>{liked ? 'Curtido' : 'Curtir'} ({totalCurtidas})</LikeText>
        </LikeButton>

        <CommentInput
          placeholder="Comente algo..."
          onSubmitEditing={(e) => addComment(item.id, e.nativeEvent.text)}
        />

        {item.comentarios.slice(0, 2).map((c, i) => (
          <Text key={i} style={{ fontSize: 13, marginTop: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>{c.userName}: </Text>
            {c.texto}
          </Text>
        ))}
      </PostContainer>
    );
  };

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