import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
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

const OwnerScreen = ({ navigation }) => {
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
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [items, setItems] = useState([
    { label: "Karkala", value: "Karkala" },
    { label: "annekerre", value: "annekerre" },
    { label: "Belvay", value: "Belvay" },
    { label: "Mudubidri", value: "Mudubidri" },
    { label: "Ganjimat", value: "Ganjimat" },
    { label: "Vamanjoor", value: "Vamanjoor" },
    { label: "Jhoti", value: "Jhoti" },
    { label: "Mangalore", value: "Mangalore" },
  ]);

  // const [loading, setLoading] = useState(false);
  // console.log(BusdataId);
  // console.log(data);
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

        Toast.success("Updated  Succesfully");
        // setData(res.data.data);
        call();
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
        Toast.success("Added  Succesfully");

        // setData(res.data.data);
        call();
      })
      .catch((e) => console.log(e));
  };

  const deletePost = (BusdataId) => {
    axios
      .post(`https://sarfaraz.onrender.com/delete/${BusdataId}`)
      .then((res) => {
        Toast.success("Deleted");
        setData((prevData) =>
          prevData.filter((item) => item._id !== BusdataId)
        );
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
    setStatus("");
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
      .get(`https://sarfaraz.onrender.com/allbuses/${id}`)
      .then((res) => {
        // isSetLoading(false);
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((e) => console.log("sasdasdasd", e));
  };
  useEffect(() => {
    call();
    console.log("componet mounted");
  }, [visible]);

  return (
    <View style={styles.container}>
      <Container position="top" />
      {/* <StatusBar
        backgroundColor="#000000"
        animated={true}
        hidden={true}
        translucent={true}
      ></StatusBar> */}
      <Surface style={styles.header}>
        <Title
          onPress={() => navigation.navigate("LoginTailwind")}
          className="font-bold  text-2xl"
        >
          Owner
        </Title>
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
        // refreshing={}
        // onRefresh={call}
        renderItem={({ item }) => (
          <PostCardItem
            onPress={() =>
              navigation.navigate("DetailsScreen", { id: item._id })
            }
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
            onChangeText={(text) => setPassword(text)} //busno
            mode="outlined"
          />
          {/* <View>
            <Text style={{ fontSize: 18, margin: 8, height: 20 }}>Route</Text>
          </View>
          <DropDownPicker
            zIndex={9000}
            zIndexInverse={1000}
            open={open1}
            value={route}
            items={items}
            setOpen={setOpen1}
            setValue={setRoute}
            setItems={setItems}
          /> */}
          <View>
            <Text style={{ fontSize: 18, margin: 8 }}>startPoint</Text>
          </View>
          <DropDownPicker
            zIndex={8000}
            zIndexInverse={2000}
            open={open2}
            value={spoint}
            items={items}
            setOpen={setOpen2}
            setValue={setSpoint}
            setItems={setItems}
          />
          <View>
            <Text style={{ fontSize: 18, margin: 8 }}>Destination Point</Text>
          </View>
          <DropDownPicker
            zIndex={3000}
            zIndexInverse={1000}
            open={open3}
            value={dpoint}
            items={items}
            setOpen={setOpen3}
            setValue={setDponit}
            setItems={setItems}
          />
          <View styles={{ flex: 1, justifyContent: "center" }}>
            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>Stop1</Text>
            </View>

            <DropDownPicker
              zIndex={7000}
              zIndexInverse={1000}
              open={open4}
              value={stop1}
              items={items}
              setOpen={setOpen4}
              setValue={setstop1}
              setItems={setItems}
            />
            <TextInput
              label="Reaching Time"
              value={stop1time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop1time(text)}
              mode="outlined"
            />
            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>Stop2</Text>
            </View>
            <DropDownPicker
              zIndex={6000}
              zIndexInverse={1000}
              open={open5}
              value={stop2}
              items={items}
              setOpen={setOpen5}
              setValue={setstop2}
              setItems={setItems}
            />

            <TextInput
              label="Reaching Time"
              value={stop2time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop2time(text)}
              mode="outlined"
            />

            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>Stop3</Text>
            </View>
            <DropDownPicker
              zIndex={5000}
              zIndexInverse={1000}
              open={open6}
              value={stop3}
              items={items}
              setOpen={setOpen6}
              setValue={setstop3}
              setItems={setItems}
            />
            <TextInput
              label="Reaching Time"
              value={stop3time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop3time(text)} //endpoint
              mode="outlined"
            />
            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>Stop4</Text>
            </View>
            <DropDownPicker
              zIndex={4000}
              zIndexInverse={1000}
              open={open7}
              value={stop4}
              items={items}
              setOpen={setOpen7}
              setValue={setstop4}
              setItems={setItems}
            />
            <TextInput
              label="Reaching Time"
              value={stop4time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop4time(text)} //endpoint
              mode="outlined"
            />
            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>Stop5</Text>
            </View>
            <DropDownPicker
              zIndex={3000}
              zIndexInverse={1000}
              open={open8}
              value={stop5}
              items={items}
              setOpen={setOpen8}
              setValue={setstop5}
              setItems={setItems}
            />
            <TextInput
              label="Reaching Time"
              value={stop5time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop5time(text)} //endpoint
              mode="outlined"
            />
            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>Stop6</Text>
            </View>
            <DropDownPicker
              zIndex={2000}
              zIndexInverse={1000}
              open={open9}
              value={stop6}
              items={items}
              setOpen={setOpen9}
              setValue={setstop6}
              setItems={setItems}
            />

            <TextInput
              label="Reaching Time"
              value={stop6time}
              style={{ height: 50, width: "100%" }}
              onChangeText={(text) => setstop6time(text)} //endpoint
              mode="outlined"
            />
            <View>
              <Text style={{ fontSize: 18, margin: 8 }}>STATUS</Text>
            </View>
            <TextInput
              label="STATUS(1/0)"
              value={status}
              onChangeText={(text) => setStatus(text)} //statue
              mode="outlined"
            />
          </View>
        </ScrollView>
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "grey",
    justifyContent: "center",
  },
  header: {
    paddingTop: 50,
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
    backgroundColor: "#ECDBBA",
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "14px",
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
  },
});

export default OwnerScreen;
