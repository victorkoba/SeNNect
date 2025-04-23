import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import PaginaInicial from "../src/screens/PaginaInicial";
import Perfil from "../src/screens/Perfil";
import Login from "../src/screens/Login";
import Mensagens from "../src/screens/Mensagens";

const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="PaginaInicial"
          component={PaginaInicial}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
        />
        <Tab.Screen
          name="Mensagens"
          component={Mensagens}
        />
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function NativeStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="PaginaInicial"
          component={BottomTabs}
        />
      </Stack.Navigator>
  );
}