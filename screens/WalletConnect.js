import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import { useWalletConnectModal } from "@walletconnect/modal-react-native";
// const { isOpen, open, close, provider, isccConnected, address } = useWalletConnectModal();
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WalletConnect({ navigation }) {
  const projectId = "5a7416f217897c5d3360766ad3514e5b";
  const providerMetadata = {
    name: "YOUR_PROJECT_NAME",
    description: "YOUR_PROJECT_DESCRIPTION",
    url: "https://your-project-website.com/",
    icons: ["https://your-project-logo.com/"],
    redirect: {
      native: "YOUR_APP_SCHEME://",
      universal: "YOUR_APP_UNIVERSAL_LINK.com",
    },
  };

  const { open, isConnected, address, provider } = useWalletConnectModal();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Function to handle the
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  useEffect(() => {
    console.log("isConnected", isConnected);
  }, [isConnected]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("myUniqueKey");
      if (value !== null) {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!address) return;
    async function getLoacalStorage() {
      const logged = await getData();
      if (logged) setIsLoggedIn(logged);
    }
    getLoacalStorage();
  }, [address]);
  console.log("Logged?", isLoggedIn);

  return (
    <View style={styles.container}>
      {isConnected ? (
        <>
          <View
            style={{ width: 200, height: 200, backgroundColor: "transparent" }}
          >
            <Image source={require("../assets/wc.png")} />
          </View>
          <View>
            <Text style={styles.header}>Connected to Web3</Text>
          </View>

          <Text style={{ color: "#fff", marginBottom: 50 }}>{address}</Text>
          <TouchableOpacity style={styles.WalletConnectButton}>
            <Text
              onPress={() =>
                !isLoggedIn
                  ? navigation.navigate("FaceRegister")
                  : navigation.navigate("Transactions")
              }
              style={{
                color: "#fff",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.WalletConnectButton}>
            <Text
              onPress={handleButtonPress}
              style={{
                color: "#fff",
              }}
            >
              Connect to a different account
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={{ width: 200, height: 200, backgroundColor: "transparent" }}
          >
            <Image
              style={{ width: 100, height: 100, marginHorizontal: 50 }}
              source={require("../assets/wallet.png")}
            />
          </View>
          <View>
            <Text style={styles.header}>Connect with your Web3 Wallet</Text>
          </View>
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
            onPress={handleButtonPress}
          >
            <Image source={require("../assets/wcText.png")} />
          </TouchableOpacity>
        </>
      )}
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
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
    width: 250,
    height: 50,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
