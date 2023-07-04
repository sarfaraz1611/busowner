import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Platform, View, Text } from "react-native";
import axios from "axios";
import { Surface, Title, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import { UserContext } from "../App";

const DriverScreen = ({ navigation }) => {
  const { id, roles } = useContext(UserContext);

  const [location, setLocation] = useState({
    accuracy: "",
    latitude: "",
    longitude: "",
  });
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  const [place, setplace] = useState("");
  const [data, setData] = useState([]);

  const getLocation = async () => {
    Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    // console.log("====================================");
    // console.log("current location uis ", currentLocation.coords);
    // console.log("====================================");
    setLocation(currentLocation.coords);
    console.log("state location" + location.latitude);
    console.log(currentLocation);
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.longitude,
      latitude: location.latitude,
    });

    if (!lat.includes(currentLocation.coords.latitude.toFixed(6))) {
      setLat((obj) => [...obj, currentLocation.coords.latitude.toFixed(6)]);
    }
    if (!long.includes(currentLocation.coords.longitude.toFixed(6))) {
      setLong((obj) => [...obj, currentLocation.coords.longitude.toFixed(6)]);
    }

    console.log(lat);
    console.log(long);
    setplace(reverseGeocodedAddress[0].city);
  };

  const call = async () => {
    axios
      .get(`http://192.168.0.197:3100/driver/${id}`)
      .then((res) => {
        // isSetLoading(false);
        //   console.log("sadasdsasdassdasd", res.data.data[0]);
        setData(res.data.data[0]);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    call();
  }, []);
  // var mytimer =
  setInterval(() => {
    getLocation();
    // locationpush();
  }, 1000);
  //   clearInterval(mytimer);

  const locationpush = async () => {
    await axios
      .post(`http://192.168.0.197:3100/location/${id}/path`, {
        long,
        lat,
      })
      .then((response) => {
        console.log("Path data saved:", response.data);
        // Do something with the response if needed
      })
      .catch((error) => {
        console.error("Error saving path data:", error);
        // Handle the error if needed
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.header}>
        <Title onPress={() => navigation.navigate("Loginscreen")}>{id}</Title>
      </Surface>

      <>
        <Text
          style={{
            width: "70%",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
          }}>
          {data.busName}
        </Text>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> Bus is in</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {place}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop1}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop1time}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop2}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fffe", padding: 30 }}>
              <Text> {data.stop2time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop3}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop3time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop4}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop4time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop5}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop5time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop6}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data.stop6time}</Text>
            </View>
          </View>
        </View>
      </>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: "5%",
    // justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
  },
});
export default DriverScreen;
