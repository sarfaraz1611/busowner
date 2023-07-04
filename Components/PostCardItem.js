import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
);

export default function PostCardItem({
  opid,
  busname,
  busno,
  route,
  spoint,
  dpoint,
  status,
  onEdit,
  onDelete,
}) {
  // console.log(opid);
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>{busname}</Text>
          <Text>BusName:{busname}</Text>
          <Text>BusRNo:{busno}</Text>
          <Text>Route:{route}</Text>
          <Text>Spoint:{spoint}</Text>
          <Text>Dpoint:{dpoint}</Text>
          <Text
            style={status === "1" ? styles.txt_enabled : styles.txt_disabled}>
            {status === "1" ? "AVAILABLE" : "NOTAVAILABLE"}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Button
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 16 }}
          />
          <Button onPress={onDelete} icon="trash-2" />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  item: {
    padding: 16,
    margin: 6,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    color: "#1c1c1c",
  },
  txt_enabled: {
    fontSize: 14,
    marginTop: 5,
    color: "green",
    fontWeight: "bold",
  },
  txt_disabled: {
    fontSize: 14,
    marginTop: 5,
    color: "red",
    fontWeight: "bold",
  },
});
