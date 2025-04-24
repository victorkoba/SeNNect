// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Feather from "react-native-vector-icons/Feather";

// Telas principais
import PaginaInicial from "../src/screens/PaginaPrincipal/Index";
import Perfil from "../src/screens/Perfil";
import Login from "../src/screens/Login";
import Cadastro from "../src/screens/Cadastro";
import SplashScreen from "../src/screens/SplashScreen";
import CriarPost from "../src/screens/PaginaPrincipal/CriarPost";

// Tela de mensagens
import Mensagens from "../src/screens/Mensagem/Mensagens"; // Tela que lista ou exibe as mensagens

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ff0000",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Tab.Screen
        name="PaginaInicial"
        component={PaginaInicial}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mensagens"
        component={Mensagens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-square" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function NativeStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="PaginaInicial" component={BottomTabs} />
      <Stack.Screen name="CriarPost" component={CriarPost} />
      <Stack.Screen name="Mensagens" component={Mensagens} />
    </Stack.Navigator>
  );
}
