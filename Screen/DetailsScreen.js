import React, { useEffect, useState, useRef } from "react";
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
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

import { BottomSheet } from "react-native-btr";

const DetailsScreen = ({ navigation, route }) => {
  const mapViewRef = useRef(null);
  const [data, setData] = useState([]);
  const id = route.params.id;
  const [destination, setdestination] = useState({
    latitude: 12.863068,
    longitude: 74.836889,
  });
  const [visible, setVisible] = useState(false);
  const [mapRegion, setmapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.11,
  });
  const GOOGLE_MAPS_APIKEY = "AIzaSyBp_bV_mWDRuw_PEILTtT9_ZJghVeoXNU4";

  useEffect(() => {
    axios
      .get(`https://sarfaraz.onrender.com/busid/${id}`)
      .then((res) => {
        setData(res.data.data);
        const firstData = res.data.data[0];
        if (firstData) {
          setmapRegion({
            latitude: firstData.latitude,
            longitude: firstData.longitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          });

          if (firstData.lastPoint === "Karkala") {
            setdestination({
              latitude: 13.213293,
              longitude: 74.998849,
            });
          } else {
            setdestination({
              latitude: 12.863068,
              longitude: 74.836889,
            });
          }
        }
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    // Fit the map to the coordinates of origin and destination
    if (mapViewRef.current) {
      const coordinates = [mapRegion, destination];
      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [mapRegion, destination]);

  const handleImagePress = () => {
    const latitude = data[0]?.latitude;
    const longitude = data[0]?.longitude;

    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleButtonPress = () => {
    navigation.navigate("OnBoardScreen");
  };
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleImagePress}>
        {/* <Image source={require("../assets/img.jpeg")} style={styles.image} />  */}
        {/* <Marker coordinate={mapRegion} title="Marker" /> */}
        <MapView ref={mapViewRef} style={styles.image} region={mapRegion}>
          <MapViewDirections
            origin={mapRegion}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        </MapView>
      </TouchableOpacity>

      <TouchableOpacity
        className="py-3 bg-[#ECDBBA]  rounded-xl"
        onPress={toggleBottomNavigationView}
      >
        <Text className="text-xl font-bold text-center text-[#1d1d1d]">
          View Details of Bus
        </Text>
      </TouchableOpacity>

      <>
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              padding: 20,
            }}
            className="bg-white"
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
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
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
        </BottomSheet>
      </>
    </View>
  );
};
const styles = StyleSheet.create({
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
    height: 750,
    borderRadius: 5,
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
