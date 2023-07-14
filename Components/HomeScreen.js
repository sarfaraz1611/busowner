import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../App";
import Container, { Toast } from "toastify-react-native";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

import { Surface, Title, TextInput } from "react-native-paper";
import ModalView from "./ModalView";
import PostCardItem from "./PostCardItem";

const HomeScreen = ({ navigation }) => {
  const { id, roles } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [busname, setBusname] = useState("");
  const [busno, setBusno] = useState("");
  const [password, setPassword] = useState("");
  const [route, setRoute] = useState("Mudubidri");
  const [spoint, setSpoint] = useState("Mangalore");
  const [dpoint, setDponit] = useState("Karkala");
  const [stop1, setstop1] = useState("Jhoti");
  const [stop2, setstop2] = useState("Vamanjoor");
  const [stop3, setstop3] = useState("Ganjimat");
  const [stop4, setstop4] = useState("Mudubidri");
  const [stop5, setstop5] = useState("Belvay");
  const [stop6, setstop6] = useState("annekerre");
  const [stop1time, setstop1time] = useState("");
  const [stop2time, setstop2time] = useState("");
  const [stop3time, setstop3time] = useState("");
  const [stop4time, setstop4time] = useState("");
  const [stop5time, setstop5time] = useState("");
  const [stop6time, setstop6time] = useState("");
  const [status, setStatus] = useState("1");

  const [BusdataId, setBusdataId] = useState(0);
  // const [loading, setLoading] = useState(false);
  // setTimeout(() => {

  const editPost = (
    BusdataId,
    busname,
    busno,
    password,
    route,
    spoint,
    dpoint,
    stop1,
    stop2,
    stop3,
    stop4,
    stop5,
    stop6,
    stop1time,
    stop2time,
    stop3time,
    stop4time,
    stop5time,
    stop6time,
    status
  ) => {
    axios
      .post(`https://sarfaraz.onrender.com/bus/${BusdataId}`, {
        busName: busname,
        busRno: busno,
        route: route,
        password: password,
        startPoint: spoint,
        lastPoint: dpoint,
        stop1: stop1,
        stop2: stop2,
        stop3: stop3,
        stop4: stop4,
        stop5: stop5,
        stop6: stop6,
        stop1time: stop1time,
        stop2time: stop2time,
        stop3time: stop3time,
        stop4time: stop4time,
        stop5time: stop5time,
        stop6time: stop6time,
        status: status,
      })
      .then((res) => {
        // isSetLoading(false);
        console.log("updated");
        Toast.success("Updated  Succesfully");

        setData(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const newPost = (
    id,
    busname,
    busno,
    password,
    route,
    spoint,
    dpoint,
    stop1,
    stop2,
    stop3,
    stop4,
    stop5,
    stop6,
    stop1time,
    stop2time,
    stop3time,
    stop4time,
    stop5time,
    stop6time,
    status
  ) => {
    axios
      .post(
        `https://sarfaraz.onrender.com/post?operatorId=${id}&busName=${busname}&busRno=${busno}&password=${password}&route=${route}&startPoint=${spoint}&lastPoint=${dpoint}&stop1=${stop1}&stop2=${stop2}&stop3=${stop3}&stop4=${stop4}&stop5=${stop5}&stop6=${stop6}&stop1time=${stop1time}&stop2time=${stop2time}&stop3time=${stop3time}&stop4time=${stop4time}&stop5time=${stop5time}&stop6time=${stop6time}&status=${status}`
      )
      .then((res) => {
        // setCourses(res.data.data);
        // isSetLoading(false);
        console.log("added successfully");
        Toast.success("new Data added  Succesfully");

        // setData(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const deletePost = (BusdataId) => {
    axios
      .post(`https://sarfaraz.onrender.com/delete/${BusdataId}`)
      .then((res) => {
        console.log("deleted");
        Toast.success("Deleted");
      })
      .catch((e) => console.log(e));
  };

  const updatePost = () => {
    // getPosts();
    // setVisible(false);
    setBusname("");
    setBusno("");
    setPassword("");
    // setRoute("");
    // setSpoint("");
    // setDponit("");
    // setStatus("");
    // setstop1("");
    // setstop2("");
    // setstop3("");
    // setstop4("");
    // setstop5("");
    // setstop6("");
    setstop1time("");
    setstop2time("");
    setstop3time("");
    setstop4time("");
    setstop5time("");
    setstop6time("");
    setBusdataId(0);
  };

  const edit = (
    opid,
    busname,
    busno,
    route,
    password,
    spoint,
    dpoint,
    stop1,
    stop2,
    stop3,
    stop4,
    stop5,
    stop6,
    stop1time,
    stop2time,
    stop3time,
    stop4time,
    stop5time,
    stop6time,
    status
  ) => {
    setVisible(true);
    setBusdataId(opid);
    // setOpid(id);
    setBusname(busname);
    setBusno(busno);
    setPassword(password);
    setRoute(route);
    setSpoint(spoint);
    setDponit(dpoint);
    setstop1(stop1);
    setstop2(stop2);
    setstop3(stop3);
    setstop4(stop4);
    setstop5(stop5);
    setstop6(stop6);
    setstop1time(stop1time);
    setstop2time(stop2time);
    setstop3time(stop3time);
    setstop4time(stop4time);
    setstop5time(stop5time);
    setstop6time(stop6time);
    setStatus(status);
  };

  const call = async () => {
    axios
      .get(`https://sarfaraz.onrender.com/allbuses`)
      .then((res) => {
        // isSetLoading(false);
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    call();
    console.log("componet mounted");
  }, [visible]);

  return (
    <SafeAreaView style={styles.container}>
      <Container position="top" />
      <StatusBar style="auto" />
      <Surface style={styles.header}>
        <Title onPress={() => navigation.navigate("Loginscreen")}>ADMIN</Title>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setVisible(true), updatePost();
          }}
        >
          <Text style={styles.buttonText}>NEW DATA</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        // refreshing={loading}
        // onRefresh={call}
        renderItem={({ item }) => (
          <PostCardItem
            opid={item.operatorId}
            busname={item.busName}
            busno={item.busRno}
            password={item.password}
            route={item.route}
            spoint={item.startPoint}
            dpoint={item.lastPoint}
            stop1time={item.stop1time}
            stop2time={item.stop2time}
            stop3time={item.stop3time}
            stop4time={item.stop4time}
            stop5time={item.stop5time}
            stop6time={item.stop6time}
            status={item.status}
            onEdit={() =>
              edit(
                item._id,
                item.busName,
                item.busRno,
                item.route,
                item.password,
                item.startPoint,
                item.lastPoint,
                item.stop1,
                item.stop2,
                item.stop3,
                item.stop4,
                item.stop5,
                item.stop6,
                item.stop1time,
                item.stop2time,
                item.stop3time,
                item.stop4time,
                item.stop5time,
                item.stop6time,
                item.status
              )
            }
            onDelete={() => deletePost(item._id)}
          />
        )}
      />
      <ModalView
        visible={visible}
        style={{ flexDirection: "column", margin: 40, Top: 200 }}
        title="EDIT DATA"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (BusdataId) {
            editPost(
              BusdataId,
              busname,
              busno,
              password,
              route,
              spoint,
              dpoint,
              stop1,
              stop2,
              stop3,
              stop4,
              stop5,
              stop6,
              stop1time,
              stop2time,
              stop3time,
              stop4time,
              stop5time,
              stop6time,
              status
            );
          } else {
            newPost(
              id,
              busname,
              busno,
              password,
              route,
              spoint,
              dpoint,
              stop1,
              stop2,
              stop3,
              stop4,
              stop5,
              stop6,
              stop1time,
              stop2time,
              stop3time,
              stop4time,
              stop5time,
              stop6time,
              status
            );
          }
        }}
        cancelable
      >
        <ScrollView>
          {/* <TextInput
            label="OPERATOR ID"
            value={opid}
            onChangeText={(text) => setOpid(text)} //operator id
            mode="outlined"
          /> */}
          <TextInput
            label="BUS NAME"
            value={busname}
            onChangeText={(text) => setBusname(text)} //busname
            mode="outlined"
          />
          <TextInput
            label="BUS RNO"
            value={busno}
            onChangeText={(text) => setBusno(text)} //busno
            mode="outlined"
          />
          <TextInput
            label="PASSWORD"
            value={password}
            onChangeText={(text) => setpass(text)} //busno
            mode="outlined"
          />
          <View>
            <Text style={{ fontSize: 20 }}>Route</Text>
          </View>
          <Picker
            selectedValue={route}
            style={{
              height: 150,
              width: "100%",
            }}
            onValueChange={(itemValue, itemIndex) => setRoute(itemValue)}
          >
            <Picker.Item label="Padubidri" value="Padubidri" />
            <Picker.Item label="Mudubidri" value="Mudubidri" />
          </Picker>
          <View>
            <Text style={{ fontSize: 20 }}>startPoint</Text>
          </View>
          <Picker
            selectedValue={spoint}
            style={{ height: 100, width: "100%" }}
            onValueChange={(itemValue, itemIndex) => setSpoint(itemValue)}
          >
            <Picker.Item label="Mangalore" value="Mangalore" />
            <Picker.Item label="Karkala" value="Karkala" />
          </Picker>
          {/* <TextInput
            label="LAST STOP"
            value={dpoint}
            onChangeText={(text) => setDponit(text)} //endpoint
            mode="outlined"
          /> */}
          <View>
            <Text style={{ fontSize: 20 }}>Destination Point</Text>
          </View>
          <Picker
            selectedValue={dpoint}
            style={{ height: 120, width: "100%" }}
            onValueChange={(itemValue, itemIndex) => setDponit(itemValue)}
          >
            <Picker.Item label="Karkala" value="Karkala" />
            <Picker.Item label="Mangalore" value="Mangalore" />
          </Picker>
          <View>
            <Text style={{ fontSize: 20 }}>Stop1</Text>
          </View>
          <Picker
            selectedValue={stop1}
            style={{ height: 120, width: "100%" }}
            onValueChange={(itemValue, itemIndex) => setstop1(itemValue)}
          >
            <Picker.Item label="Jhoti" value="Jhoti" />
            <Picker.Item label="annekerre" value="annekerre" />
          </Picker>
          <View styles={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              label="Reaching Time"
              value={stop1time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop1time(text)} //endpoint
              mode="outlined"
            />

            <Picker
              selectedValue={stop2}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => setstop2(itemValue)}
            >
              <Picker.Item label="Vamanjoor" value="Vamanjoor" />
              <Picker.Item label="Belvay" value="Belvay" />
            </Picker>
            <TextInput
              label="Reaching Time"
              value={stop2time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop2time(text)} //endpoint
              mode="outlined"
            />
            <Picker
              selectedValue={stop3}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => setstop3(itemValue)}
            >
              <Picker.Item label="Ganjimat" value="Ganjimat" />
              <Picker.Item label="Mudubidri" value="Mudubidri" />
            </Picker>
            <TextInput
              label="Reaching Time"
              value={stop3time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop3time(text)} //endpoint
              mode="outlined"
            />
            <Picker
              selectedValue={stop4}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => setstop4(itemValue)}
            >
              <Picker.Item label="Mudubidri" value="Mudubidri" />
              <Picker.Item label="Ganjimat" value="Ganjimat" />
            </Picker>
            <TextInput
              label="Reaching Time"
              value={stop4time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop4time(text)} //endpoint
              mode="outlined"
            />
            <Picker
              selectedValue={stop5}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => setstop5(itemValue)}
            >
              <Picker.Item label="Belvay" value="Belvay" />
              <Picker.Item label="Vamanjoor" value="Vamanjoor" />
            </Picker>
            <TextInput
              label="Reaching Time"
              value={stop5time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop5time(text)} //endpoint
              mode="outlined"
            />

            <Picker
              selectedValue={stop6}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) => setstop6(itemValue)}
            >
              <Picker.Item label="annekerre" value="annekerre" />
              <Picker.Item label="Jhoti" value="Jhoti" />
            </Picker>
            <TextInput
              label="Reaching Time"
              value={stop6time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop6time(text)} //endpoint
              mode="outlined"
            />
            <TextInput
              label="STATUS(1/0)"
              value={status}
              onChangeText={(text) => setStatus(text)} //statue
              mode="outlined"
            />
          </View>
        </ScrollView>
      </ModalView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "android" ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
  },
});

export default HomeScreen;
