import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HistoryCard({ name, description, date, success }) {
  return (
    <View style={success ? styles.containerTint : styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>{name}</Text>
      </View>
      <View style={styles.body}>
        <Text style={{ color: "#fff" }}>{description}</Text>
        <Text style={{ color: "#fff" }}>{date}</Text>
        <Text
          style={
            success
              ? { color: "#00DBA1", marginTop: 24 }
              : { color: "#E21717", marginTop: 24 }
          }
        >
          {success ? "Successful" : "Failed"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
    width: 330,
    marginVertical: 10,
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#26232E",
    borderRadius: 10,
  },
  containerTint: {
    backgroundColor: "#26232E",
    alignItems: "flex-start",
    justifyContent: "center",
    width: 330,
    marginVertical: 10,
    padding: 18,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderBottomColor: "#26232E",
  },
  header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
