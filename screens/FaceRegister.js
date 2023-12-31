import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function FaceRegister({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../assets/face.png")}
        />
      </View>
      <View>
        <Text style={styles.header}>Get started with Face Recognition</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.metamaskConnectButton}
          onPress={() => navigation.navigate("FaceScan", { isRegister: true })}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            Setup Face
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26232E",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#fff",
    textAlign: "center",
    marginVertical: 75,
    paddingHorizontal: 50,
  },

  metamaskConnectButton: {
    backgroundColor: "#8242FA",
    paddingHorizontal: 120,
    height: 50,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
