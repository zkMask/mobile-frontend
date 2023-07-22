import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import { useWalletConnectModal } from "@walletconnect/modal-react-native";
// const { isOpen, open, close, provider, isccConnected, address } = useWalletConnectModal();
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

export default function WalletConnect({ navigation }) {0.
  const projectId = '5a7416f217897c5d3360766ad3514e5b';
  const providerMetadata = {
    name: 'YOUR_PROJECT_NAME',
    description: 'YOUR_PROJECT_DESCRIPTION',
    url: 'https://your-project-website.com/',
    icons: ['https://your-project-logo.com/'],
    redirect: {
      native: 'YOUR_APP_SCHEME://',
      universal: 'YOUR_APP_UNIVERSAL_LINK.com'
    }
  };

  const { open, isConnected, address, provider } = useWalletConnectModal();

  // Function to handle the
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

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
          onPress={handleButtonPress}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            WalletConnect
          </Text>
        </TouchableOpacity>
        <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
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
