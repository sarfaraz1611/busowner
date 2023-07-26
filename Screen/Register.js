import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import DropDownPicker from "react-native-dropdown-picker";
import ModalDropdown from "react-native-modal-dropdown";

// import Parse from "parse/react-native";

function Register({ navigation }) {
  const [Email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("owner");
  // const [open, setOpen] = useState(false);

  // const [items, setItems] = useState([
  //   { label: "driver", value: "driver" },
  //   { label: "owner", value: "owner" },
  // ]);

  const Registerfunction = async () => {
    console.log(password);
    console.log(Email);
    console.log(name);
    const respose = await axios
      .post(
        `https://sarfaraz.onrender.com/user/register?Email=${Email}&name=${name}&password=${password}&roles=${roles}`
      )

      .then((response) => {
        if (response.data.success == true) {
          console.log("Added succesfully");
          navigation.navigate("LoginTailwind");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // const handleSelect = (value) => {
  //   setRoles(Options[value]);
  // };

  return (
    <View className="flex-1 bg-[#1d1d1d]">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-[#ECDBBA] p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center py-5">
          <Image
            source={require("../assets/images/signup.png")}
            style={{ width: 250, height: 150 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-10"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            onChangeText={(text) => setname(text)}
            placeholder="Enter Name"
          />

          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter Password"
          />
          {/* <Text className="text-gray-700 ml-4">Role</Text> */}
          {/* <DropDownPicker
            open={open}
            value={roles}
            items={items}
            setOpen={setOpen}
            setValue={setRoles}
            setItems={setItems}
          /> */}

          <TouchableOpacity
            className="py-3 bg-[#ECDBBA] rounded-xl"
            onPress={() => {
              Registerfunction();
            }}
          >
            <Text className="font-xl font-bold text-center text-[#1d1d1d]">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginTailwind")}
          >
            <Text className="font-semibold text-[#1d1d1d]"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Register;
