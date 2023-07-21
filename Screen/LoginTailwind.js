import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import axios from "axios";

const LoginTailwind = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setId, setRoles } = useContext(UserContext);

  const login = async ({ navigation }) => {
    await axios
      .get(
        `https://sarfaraz.onrender.com/user/login?email=${email}&password=${password}`
      )
      .then((response) => {
        if (response.data.success == true) {
          setId(response.data.message);

          if (response.data.driver == 1) {
            navigation.navigate("DriverScreen");
          }

          if (response.data.roles) {
            setRoles(response.data.roles);

            if (response.data.roles == "admin") {
              navigation.navigate("HomeScreen");
            } else if (response.data.roles == "owner") {
              navigation.navigate("OwnerScreen");
            }
          }
        } else if (response.data.success == false) {
          Alert.alert("invalid Credentials", response.data.message, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <View className="flex-1 bg-[#1d1d1f]">
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity className="bg-[#ECDBBA] p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center py-10">
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: 300, height: 250 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 py-10"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            onChangeText={setPassword}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-[#ECDBBA]  rounded-xl"
            onPress={login}
          >
            <Text className="text-xl font-bold text-center text-[#1d1d1d]">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="font-semibold text-[#1d1d1d]"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginTailwind;
