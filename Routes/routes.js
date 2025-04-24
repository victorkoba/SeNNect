import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import PaginaInicial from "../src/screens/PaginaPrincipal/Index";
import Perfil from "../src/screens/Perfil";
import Login from "../src/screens/Login";
import Mensagens from "../src/screens/Mensagens";
import Cadastro from "../src/screens/Cadastro"

const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveColor: "#ff0000",
        tabBarStyle:{
          borderTopWidth: 0,
          backgroundColor: "#ffffff"
        }
        }}>
        <Tab.Screen
          name="PaginaInicial"
          component={PaginaInicial}
          options={{tabBarIcon:({color,size})=> {return <Feather name= 'home' color={color} size={size}/>}}}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{tabBarIcon:({color,size})=> {return <Feather name= 'user' color={color} size={size}/>}}}
        />
        <Tab.Screen
          name="Mensagens"
          component={Mensagens}
          options={{tabBarIcon:({color,size})=> {return <Feather name= 'message-square' color={color} size={size}/>}}}
        />
        
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function NativeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Cadastro" component={Cadastro} />
    <Stack.Screen name="PaginaInicial" component={BottomTabs} />
  </Stack.Navigator>
  );
}