import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.title}> OPERATOR</Text>
      <Text style={styles.title2}> LOGIN</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="RegNO or UserName"
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("LoginTailwind")}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={login} style={styles.loginBtn} color="#841584">
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          style={styles.forgotAndSignUpText}
          onPress={() => navigation.navigate("Register")}
        >
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    marginBottom: 10,
  },
  title2: {
    fontWeight: "bold",
    fontSize: 45,
    color: "yellow",
    marginLeft: 0,
    marginBottom: 10,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 11,
    padding: 20,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "blue",
    borderRadius: 25,
    height: 50,
    Color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default LoginScreen;
