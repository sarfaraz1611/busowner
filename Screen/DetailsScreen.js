import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { Button, TextInput } from "react-native";

const DetailsScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const id = route.params.id;
  const [mapRegion, setmapRegion] = useState({
    latitude: "",
    longitude: "",
    latitudeDelta: 0.92,
    longitudeDelta: 0.41,
  });

  useEffect(async () => {
    axios
      .get(`https://sarfaraz.onrender.com/busid/${id}`)
      .then((res) => {
        setData(res.data.data);
        const firstData = res.data.data[0];
        if (firstData) {
          setmapRegion({
            latitude: firstData.latitude,
            longitude: firstData.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(mapRegion);

  const handleImagePress = () => {
    const latitude = data[0]?.latitude;
    const longitude = data[0]?.longitude;

    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleButtonPress = () => {
    navigation.navigate("OnBoardScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleImagePress}>
        {/* <Image source={require("../assets/img.jpeg")} style={styles.image} />  */}
        <MapView style={styles.image} region={mapRegion}>
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
      </TouchableOpacity>

      <>
        <Text
          style={{
            width: "70%",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {data[0]?.busName}
        </Text>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop1}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop1time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop2}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fffe", padding: 30 }}>
              <Text> {data[0]?.stop2time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop3}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop3time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop4}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop4time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop5}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop5time}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop6}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
              <Text> {data[0]?.stop6time}</Text>
            </View>
          </View>
        </View>
      </>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",

    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },

  header2: {
    fontSize: 17,
    fontWeight: "bold",
    left: 280,
    top: -20,
  },
  image: {
    width: 400,
    height: 300,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
    left: 20,
  },
  key: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
  },

  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default DetailsScreen;
