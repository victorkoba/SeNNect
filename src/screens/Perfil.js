// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import * as ImagePicker from 'expo-image-picker';
import s3 from '../../awsConfig';

const S3_BUCKET = 'sennect-30-22';

const Perfil = ({ navigation }) => {
  const auth = getAuth(getApp());
  const firestore = getFirestore(getApp());

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [initialPhotoURL, setInitialPhotoURL] = useState(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarCampoSenha, setMostrarCampoSenha] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
        const userRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome);
          setImageUri(data.photoURL);
          setInitialPhotoURL(data.photoURL);
        }
      }
    };
    loadUserData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToS3 = async (imageUri, uid) => {
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const filePath = `perfil_imagem/${uid}/${filename}`;

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const uploadParams = {
      Bucket: S3_BUCKET,
      Key: filePath,
      Body: blob,
      ContentType: 'image/jpeg',
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    return uploadResult.Location;
  };

  const handleSalvar = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(firestore, 'users', user.uid);
    let photoURL = initialPhotoURL;

    if (imageUri !== initialPhotoURL) {
      photoURL = await uploadImageToS3(imageUri, user.uid);
    }

    await updateDoc(userRef, {
      nome,
      photoURL,
    });

    if (mostrarCampoSenha && novaSenha) {
      try {
        await updatePassword(user, novaSenha);
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        setNovaSenha('');
        setMostrarCampoSenha(false);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível alterar a senha.');
        return;
      }
    }

    navigation.navigate('PaginaInicial');
    Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil do Usuário</Text>

      <Pressable onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Selecionar Foto</Text>
        )}
      </Pressable>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={[styles.input, { backgroundColor: '#eee' }]}
          value={email}
          editable={false}
        />

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => setMostrarCampoSenha(!mostrarCampoSenha)}
        >
          <Text style={styles.botaoTexto}>
            {mostrarCampoSenha ? 'Cancelar Alteração de Senha' : 'Alterar Senha'}
          </Text>
        </TouchableOpacity>

        {mostrarCampoSenha && (
          <View style={styles.senhaContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={novaSenha}
              onChangeText={setNovaSenha}
              placeholder="Nova Senha"
              secureTextEntry={!mostrarSenha}
            />
          </View>
        )}

        <Pressable style={styles.botao} onPress={handleSalvar}>
          <Text style={styles.botaoTexto}>Salvar Alterações</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    paddingBottom: 48,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#ff4d4d',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoSecundario: {
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#dfdfdf',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 120,
    color: '#777',
    fontSize: 16,
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default Perfil;
