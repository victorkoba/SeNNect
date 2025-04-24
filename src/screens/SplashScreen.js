import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/9496474.png')} // Você pode trocar a imagem de fundo aqui
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/logo-sennect-1.jpg')} // Troque pelo seu logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>Bem-vindo ao SENNect</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 380,
    height: 180,
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
