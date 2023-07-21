import React, { useState, createContext } from "react";

// import LoginScreen from "./Screen/Loginscreen";
import LoginTailwind from "./Screen/LoginTailwind";

import HomeScreen from "./Screen/HomeScreen";
import Register from "./Screen/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverScreen from "./Screen/DriverScreen";
import OwnerScreen from "./Screen/OwnerScreen";
const Stack = createNativeStackNavigator();
export const UserContext = createContext();

export default function App() {
  const [id, setId] = useState("");
  const [roles, setRoles] = useState("");

  return (
    <UserContext.Provider value={{ id, setId, roles, setRoles }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Loginscreen" component={LoginScreen} /> */}
          <Stack.Screen name="LoginTailwind" component={LoginTailwind} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DriverScreen" component={DriverScreen} />
          <Stack.Screen name="OwnerScreen" component={OwnerScreen} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
        {/* <Location /> */}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
