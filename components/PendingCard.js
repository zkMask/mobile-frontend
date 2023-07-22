import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function PendingCard({ tint = true, onConfirm, onDecline }) {
  const handleOnConfirm = () => {
    onConfirm();
  };
  return (
    <View style={tint ? styles.containerTint : styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>Function Name</Text>
      </View>
      <View style={styles.body}>
        <Text style={{ color: "#fff" }}>Description</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonGreen} onPress={handleOnConfirm}>
          <Text style={styles.buttonTextGreen}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRed}>
          <Text style={styles.buttonTextRed}>Decline</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    gap: 15,
  },

  buttonGreen: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    marginTop: 16,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2DAB8A",
  },

  buttonRed: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    marginTop: 16,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D65D80",
  },

  buttonTextGreen: {
    color: "#2DAB8A",
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    height: 20,
  },
  buttonTextRed: {
    color: "#D65D80",
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    height: 20,
  },
});
