import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Platform, View, Text } from "react-native";
import axios from "axios";
import { Surface, Title, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import { UserContext } from "../App";

const DriverScreen = ({ navigation }) => {
  const { id, roles } = useContext(UserContext);

  const [location, setLocation] = useState({
    // accuracy: "",
    // altitude: "",
    // altitudeAccuracy: "",
    // heading: "",
    latitude: "",
    longitude: "",
    speed: "",
  });
  // push this three to data base
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [place, setplace] = useState("");

  const [data, setData] = useState([]);

  // if (!lat.includes(currentLocation.coords.latitude.toFixed(8))) {
  //   setLat((obj) => [...obj, currentLocation.coords.latitude.toFixed(8)]);
  // }

  // if (!long.includes(currentLocation.coords.longitude.toFixed(8))) {
  //   setLong((obj) => [...obj, currentLocation.coords.longitude.toFixed(8)]);
  // }
  const getLocation = async () => {
    Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permissions");
      return;
    }
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});

      location.latitude = currentLocation.coords.latitude;
      location.longitude = currentLocation.coords.longitude;
      console.log("state location" + JSON.stringify(location));
      console.log(currentLocation.coords);
    } catch (error) {
      console.log("Error getting current location:", error);
    }

    if (location.latitude) {
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location.longitude,
        latitude: location.latitude,
      });
      setLat(location.latitude);
      setLong(location.longitude);
      setplace(reverseGeocodedAddress[0].city);
      console.log("====================================");
      console.log("latis ", location.latitude);
      console.log(location.longitude);
      console.log(reverseGeocodedAddress[0]);
      console.log("====================================");

      console.log("====================================");
      console.log("latis ", lat);
      console.log(long);
      console.log(place);
      console.log("====================================");
    }
  };

  const call = async () => {
    try {
      const response = await axios.get(
        `https://sarfaraz.onrender.com/driver/${id}`
      );
      setData(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    call();
    const interval = setInterval(() => {
      getLocation();
      console.log("asljkdakjdcd");
      if (lat !== 0 && long !== 0) {
        locationpush(id, lat, long, place);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const locationpush = async (id, lat, long, place) => {
    try {
      const response = await axios.post(
        `https://sarfaraz.onrender.com/location/${id}/path`,
        {
          lat,
          long,
          place,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
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
    marginBottom: Platform.OS === "android" ? 20 : 0,
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
