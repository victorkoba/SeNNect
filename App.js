import React from "react";
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native";
// Importou o Drawer porque é a navegação principal que escolhemos, mas poderia ser qualquer outra
import NativeStack from "./Routes/routes";

export default function App() {
  return (
    <NavigationContainer>
      <NativeStack />
    </NavigationContainer>
  );
}