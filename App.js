import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Components/Loginscreen";
import Location from "./Components/Location";
import HomeScreen from "./Components/HomeScreen";
import Register from "./Components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverScreen from "./Components/DriverScreen";
import OwnerScreen from "./Components/OwnerScreen";
const Stack = createNativeStackNavigator();
export const UserContext = createContext();

export default function App() {
  const [id, setId] = useState("");
  const [roles, setRoles] = useState("");

  return (
    <UserContext.Provider value={{ id, setId, roles, setRoles }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loginscreen" component={LoginScreen} />
          <Stack.Screen name="DriverScreen" component={DriverScreen} />
          <Stack.Screen name="OwnerScreen" component={OwnerScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
        {/* <Location /> */}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
