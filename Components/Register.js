import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import ModalDropdown from "react-native-modal-dropdown";

// import Parse from "parse/react-native";

function Register({ navigation }) {
  const [Email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");

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
          navigation.navigate("Loginscreen");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSelect = (value) => {
    setRoles(Options[value]);
  };
  const Options = ["driver", "owner"];

  return (
    <View style={styles.main}>
      <Text style={styles.text}>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"     name"}
        onChangeText={(text) => setname(text)}
        autoCapitalize={"none"}
      />
      <Text style={styles.text}>Email</Text>

      {/* <View style={styles.inputView}> */}
      <TextInput
        style={styles.input}
        placeholder="  Email"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setEmail(text)}
      />
      {/* </View> */}
      <Text style={styles.text}>Password</Text>

      <TextInput
        style={styles.input}
        value={password}
        placeholder={"      Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.text}>roles</Text>
      <ModalDropdown
        options={Options}
        onSelect={handleSelect}
        defaultValue="2"
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownMenu}
        // dropdownTextStyle={styles.dropdownMenuItemText}
      >
        <View style={styles.dropdownInnerContainer}>
          <Text style={styles.dropdownValue}>{"Role"}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </ModalDropdown>

      <TouchableOpacity
        onPress={() => {
          Registerfunction();
        }}
      >
        <Text style={styles.butto}>Sign Up </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    color: "yellow",
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
  },
  butto: {
    color: "white",
    padding: 10,
    fontSize: 20,
    marginStart: "40%",
    alignContent: "center",
  },
  input: {
    width: "95%",
    marginStart: 10,
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  dropdown: {
    width: 250,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  dropdownText: {
    fontSize: 22,
    textAlign: "center",
  },
  dropdownMenu: {
    width: 200,
    maxHeight: 200,
  },
  dropdownInnerContainer: {
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownValue: {
    fontSize: 16,
    color: "white",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "white",

    marginLeft: 8,
  },
});

export default Register;
