import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PendingCard from "./PendingCard";
import { ScrollView, Modal } from "react-native";
import HistoryCard from "./HistoryCard";

export default function Transactions() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [modalVisible, setModalVisible] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.address}>
          <View style={styles.profileContainer}>
            <View style={styles.pfp}></View>
            <Text style={styles.headerText}>0x654......5DbD</Text>
          </View>
          <View>
            <Text style={styles.headerText}>Menu</Text>
          </View>
        </View>
        <View style={styles.address}>
          <Text style={styles.heading}>Transactions</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.tabOutline}>
          <TouchableOpacity
            style={activeTab === "Pending" ? styles.tabActive : styles.tab}
            onPress={() => handleTabChange("Pending")}
          >
            <Text style={{ color: "#fff" }}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "History" ? styles.tabActive : styles.tab}
            onPress={() => handleTabChange("History")}
          >
            <Text style={{ color: "#fff" }}>History</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.notifText}>
            <Text style={{ color: "#A278F5" }}>
              You have 32 pending notifications.
            </Text>
          </View>
          <View>
            {activeTab === "Pending" ? (
              <PendingCard onConfirm={handleModal} />
            ) : (
              <HistoryCard />
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>Function Name</Text>
            <Text style={styles.modalText}>
              Are you sure you want to authenticate this transaction?
            </Text>
            <Image
              source={require("../assets/mask.png")}
              style={{ width: 54, height: 54, margin: 35 }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonGreen}>
                <Text style={styles.buttonTextGreen}>Scan face to proceed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRed} onPress={handleModal}>
                <Text style={styles.buttonTextRed}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    width: "100%",
    fontSize: 32,
    height: "25%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#6636C6",
  },
  address: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  heading: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  pfp: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    width: "100%",
    height: "75%",
    alignItems: "center",
    backgroundColor: "#0C0C0C",
  },

  tabOutline: {
    width: "80%",
    height: 42,
    backgroundColor: "transparent",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#6636C6",
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tab: {
    width: "47%",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },

  tabActive: {
    width: "47%",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    margin: 3,
    backgroundColor: "#6636C6",
    borderRadius: 5,
  },

  notifText: {
    width: "80%",
    height: 42,
    backgroundColor: "transparent",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scrollContent: {
    flexGrow: 1, // Make sure the content inside ScrollView takes up available space
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalView: {
    margin: 0,
    width: "100%",
    backgroundColor: "#26232E",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonGreen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6636C6",
    borderRadius: 20,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 4,
    paddingHorizontal: 31,
    paddingVertical: 12,
  },
  buttonTextGreen: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonRed: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    height: 50,
    marginTop: 4,
    paddingHorizontal: 31,
    paddingVertical: 12,
  },
  buttonTextRed: {
    color: "#fff",
    fontWeight: "bold",
  },
});
