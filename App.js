// import * as Crypto from "expo-crypto";
import "./expo-cryto-shim.js";
import { StyleSheet, Text, View } from "react-native";
import Transactions from "./components/Transactions";
import WalletConnect from "./screens/WalletConnect";
import Welcome from "./screens/Welcome";
import FaceRegister from "./screens/FaceRegister";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FaceScan from "./screens/FaceScan";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

export default function App() {
  const { isConnected } = useWalletConnectModal();
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="WalletConnect" component={WalletConnect} />
        <Stack.Screen name="FaceRegister" component={FaceRegister} />
        <Stack.Screen name="FaceScan" component={FaceScan} />
        <Stack.Screen name="Transactions" component={Transactions} />
      </Stack.Navigator>
    </NavigationContainer>
    // <FaceScan />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
