import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HistoryCard({ success = true }) {
  return (
    <View style={success ? styles.containerTint : styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>Function Name</Text>
      </View>
      <View style={styles.body}>
        <Text style={{ color: "#fff" }}>Description</Text>
        <Text style={{ color: "#fff" }}>Date</Text>
        <Text
          style={
            success
              ? { color: "#00DBA1", marginTop: 24 }
              : { color: "#D65D800", marginTop: 24 }
          }
        >
          Successful
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
