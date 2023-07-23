import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PendingCard from "./PendingCard";
import { ScrollView, Modal } from "react-native";
import HistoryCard from "./HistoryCard";
import axios from "axios";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { ethers } from "ethers";
import request, { gql } from "graphql-request";

export default function Transactions({
  navigation,
  modalScreen = false,
  modalOpen = false,
}) {
  const socketProvider = new ethers.providers.WebSocketProvider(
    "wss://goerli.infura.io/ws/v3/a4e1ddd82cd94f5baea39f80e2eef866"
  );
  const contractAddress = "0x6187EBe7d3D7fe033E3EA060b15a26fBe157fE01";
  const abi = [
    {
      inputs: [],
      name: "TransactionAlreadyExists",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "success",
          type: "bool",
        },
        {
          indexed: true,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "transactionId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bytes4",
          name: "methodId",
          type: "bytes4",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "transactionTimestamp",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "transactionBlockNumber",
          type: "uint256",
        },
      ],
      name: "AuthenticationCompleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "txId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes4",
          name: "methodId",
          type: "bytes4",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "transactionTimestamp",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "transactionBlockNumber",
          type: "uint256",
        },
      ],
      name: "InitiateAuthentication",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "txId",
          type: "uint256",
        },
      ],
      name: "completeAuthentication",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "bytes4",
              name: "methodId",
              type: "bytes4",
            },
            {
              internalType: "bytes32[]",
              name: "params",
              type: "bytes32[]",
            },
            {
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "blockNumber",
              type: "uint256",
            },
          ],
          internalType: "struct ZkMask.Transaction",
          name: "txDetails",
          type: "tuple",
        },
      ],
      name: "initiateAuthentication",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "transactionId",
      outputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "methodId",
          type: "bytes4",
        },
        {
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "blockNumber",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "transactionVerified",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const [activeTab, setActiveTab] = useState("Pending");
  const [modalVisible, setModalVisible] = useState(modalOpen);
  const [pendingTx, setPendingTx] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [modalData, handleModalData] = useState({
    functionName: "Function Name",
    details: "Hey Transaction!",
    txId: 0,
  });

  const { address } = useWalletConnectModal();

  const ownerAddress = { address };
  console.log("owner", ownerAddress);
  const contract = new ethers.Contract(contractAddress, abi, socketProvider);

  const listenForEvent = async () => {
    try {
      contract.on(
        "InitiateAuthentication",
        (
          txId,
          userAddress,
          methodId,
          transactionTimestamp,
          transactionBlockNumber
        ) => {
          //   if (userAddress.toString().replace(/^0+/, "r") === ownerAddress) {
          console.log(
            txId,
            userAddress,
            methodId,
            transactionTimestamp,
            transactionBlockNumber
          );
          const newArr = [
            {
              txId,
              userAddress,
              methodId,
              transactionTimestamp,
              transactionBlockNumber,
            },
          ];
          setPendingTx((prev) => [...prev, ...newArr]);
        }
        // }
      );
    } catch (err) {
      console.log(err);
    }
  };

  console.log(pendingTx);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (!socketProvider) return;
    listenForEvent();

    return () => {
      contract.removeAllListeners(); // Remove all event listeners
    };
  });

  //   //fetch data for the pending tab
  //   useEffect(() => {
  //     if (activeTab !== "Pending") return;
  //     async function fetchData() {
  //       await axios.get("http://localhost:3000/transactions").then((res) => {
  //         console.log(res.data);
  //       });
  //     }
  //     fetchData();
  //   }, [activeTab]);

  //fetch data for the history tab
  useEffect(() => {
    if (activeTab !== "History") return;
    async function fetchData() {
      const { authenticationCompleteds } = await request(
        "https://api.thegraph.com/subgraphs/name/richa-iitr/zkmask",
        fetchAuthConfirmationData()
      );
      setHistoryData(authenticationCompleteds);
    }
    fetchData();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.address}>
          <View style={styles.profileContainer}>
            <View style={styles.pfp}>
              <Image
                source={"../assets/blockies.png"}
                style={{ height: 50, width: 50, zIndex: 1 }}
              />
            </View>
            <Text style={styles.headerText}>{`${address.slice(
              0,
              7
            )}...${address.slice(-10, -1)}`}</Text>
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
          <View>
            {activeTab === "Pending"
              ? //   <PendingCard onConfirm={handleModal} />
                pendingTx.map((data) => {
                  return (
                    <PendingCard
                      onConfirm={() => {
                        handleModal();
                        handleModalData({
                          functionName: data.methodId,
                          details: "Hey Transaction!",
                          txId: data.txId,
                        });
                      }}
                      functionName={data.methodId}
                      details={"Hey Transaction!"}
                      txId={data.txId}
                    />
                  );
                })
              : historyData.map((data) => (
                  <HistoryCard
                    key={data.id}
                    name={"Transfer Tokens"}
                    description={"Send ETH to reciepent"}
                    success={data.success}
                  />
                ))}
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        {!modalScreen ? (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeaderText}>
                {modalData.functionName}
              </Text>
              <Text style={styles.modalText}>
                Are you sure you want to authenticate this transaction?
              </Text>
              <Image
                source={require("../assets/mask.png")}
                style={{ width: 54, height: 54, margin: 35 }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonGreen}
                  onPress={() =>
                    navigation.navigate(
                      "FaceScan",
                      { signup: false },
                      { txId: modalData.txId }
                    )
                  }
                >
                  <Text style={styles.buttonTextGreen}>
                    Scan face to proceed
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonRed}
                  onPress={handleModal}
                >
                  <Text style={styles.buttonTextRed}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeaderText}>Transaction Successful</Text>
              <Text style={styles.modalText}>
                You have successfully authenticated the transaction.
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: "#ffffff50",
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

function fetchAuthConfirmationData() {
  return gql`
    query Query {
      authenticationCompleteds {
        id
        success
        user
        txId
        contract
        methodId
        transactionHash
        txBlockNumber
        txTimestamp
        value
      }
    }
  `;
}
