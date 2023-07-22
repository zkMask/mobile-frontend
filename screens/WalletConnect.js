import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function WalletConnect({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ width: 200, height: 200, backgroundColor: "#D9D9D920" }}>
        {/* <Image
          style={{ width: 100, height: 100 }}
          source={require("../assets/logo.png")}
        /> */}
      </View>
      <View>
        <Text style={styles.header}>Connect with your Web3 Wallet</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.metamaskConnectButton}>
          <Text
            style={{
              color: "#fff",
            }}
          >
            Metamask
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.WalletConnectButton}
          onPress={() => navigation.navigate("FaceRegister")}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            WalletConnect
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
    backgroundColor: "#F6851B",
    width: 200,
    height: 50,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  WalletConnectButton: {
    backgroundColor: "#8242FA",
    width: 200,
    height: 50,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
