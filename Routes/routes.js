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

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Login"
          component={NativeStack}
        />
        <Drawer.Screen
          name="PaginaInicial"
          component={BottomTabs}
        />
      </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();
function NativeStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
        />
      </Stack.Navigator>
  );
}