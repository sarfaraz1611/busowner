import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import { Surface, Title, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import { UserContext } from "../App";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import { BottomSheet } from "react-native-btr";

const DriverScreen = ({ navigation }) => {
  const { id, roles } = useContext(UserContext);
  const mapViewRef = useRef(null);
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

  // if (!lat.includes(currentLocation.coords.latitude.toFixed(8))) {
  //   setLat((obj) => [...obj, currentLocation.coords.latitude.toFixed(8)]);
  // }

  // if (!long.includes(currentLocation.coords.longitude.toFixed(8))) {
  //   setLong((obj) => [...obj, currentLocation.coords.longitude.toFixed(8)]);
  // }
  const getLocation = async () => {
    Location.setGoogleApiKey(GOOGLE_MAPS_APIKEY);
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
      // console.log("====================================");
      // console.log("latis ", location.latitude);
      // console.log(location.longitude);
      // console.log(reverseGeocodedAddress[0]);
      // console.log("====================================");
    }
  };

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
  if (place == "Karkala") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop1`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "Jhoti") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop2`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "Vamanjoor") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop3`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "Ganjimat") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop4`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "Mudubidri") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop5`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "Belvay") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop6`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "annekerre") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop7`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  } else if (place == "Mangalore") {
    console.log("stop1 triggerd");
    try {
      const response = axios.post(
        `https://sarfaraz.onrender.com/location/${id}/stop8`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  }

  const call = async () => {
    try {
      const response = await axios.get(
        `https://sarfaraz.onrender.com/driver/${id}`
      );
      setData(response.data.data[0]);
      const firstData = response.data.data[0];
      console.log("first data sis ", response.data.data[0]);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    call();
    const interval = setInterval(() => {
      getLocation();
    }, 10000);
    return () => clearInterval(interval);
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

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  useEffect(() => {
    if (lat && long && place) {
      locationpush(id, lat, long, place);
    }
  }, [lat, long, place]);

  return (
    <View style={styles.container}>
      {/* <Surface style={styles.header}>
        <Title onPress={() => navigation.navigate("Loginscreen")}>{id}</Title>
      </Surface> */}
      <MapView ref={mapViewRef} style={styles.image} region={mapRegion}>
        <MapViewDirections
          origin={mapRegion}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="blue"
        />
      </MapView>
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
              width: "70%",

              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
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
        </BottomSheet>
      </>
    </View>
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
    marginBottom: 20,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
  },
  image: {
    width: 400,
    height: 750,
    borderRadius: 5,
  },
});
export default DriverScreen;
