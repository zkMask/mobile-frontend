import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import axios from "axios";
import * as crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { generatePoseidonHash } from "../utils/ukToHash";
// import { Feather } from "@expo/vector-icons";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
export default function FaceScan({ navigation, isRegister = false }) {
  const isOwner = false;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isPreview, setIsPreview] = useState(false);
  const [camera, setCamera] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  //   const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [base64, setBase64] = useState(null);
  //   const [isRegister, setIsRegister] = useState(true);
  const [base64Array, setBase64Array] = useState([]);
  const [counter, setCounter] = useState(0);
  const cameraRef = useRef();

  const generateKey = async () => {
    //get the current timestamp
    const timestamp = Date.now();
    //salt the combination and hash it
    const hash = await crypto
      .createHash("sha256")
      .update(timestamp)
      .digest("hex");

    // const hash2 = await generatePoseidonHash(hash);

    return hash;
  };

  //   const generatePoseidonHash = async (key) => {
  //     const poseidon = await circomlibjs.buildPoseidon();
  //     const hash = poseidon.F.toString(poseidon([10]));
  //     return hash;
  //   };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setBase64(data.base64);
        console.log("here");
        console.log("picture source", typeof data.base64);
      }
    }
  };
  const takeRegisterPictures = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setBase64Array([...base64Array, data.base64]);
        console.log("here");
        console.log("picture source", typeof data.base64);
      }
    }
  };
  useEffect(() => {
    console.log("changed");
  }, [base64Array]);

  // Backend Schema:
  // {
  //   address: "0x123",
  // hashOfUniqueKey: "0x123",
  // photos: ["base64", "base64", "base64", "base64"],
  // }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("myUniqueKey", value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("myUniqueKey");
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendImage = async () => {
    try {
      console.log("1");
      //get the current timestamp
      const timestamp = Date.now();
      const randomNumber = Math.floor(Math.random() * 1000);
      console.log("random", randomNumber);
      const arr = randomNumber.toString();
      console.log(arr);
      storeData(arr);

      const hashOfUniqueKey = await axios.post(
        "http://192.168.43.109:4000/api/v1/hash/hash",
        {
          uniqueKey: arr,
        }
      );
      console.log(hashOfUniqueKey.data.hash);
      isOwner ? getData() : console.log("not owner");
      // console.log(base64);
      const img = base64;
      console.log(img);
      if (isRegister) {
        const response = await axios.post(
          "http://192.168.43.109:4000/api/v1/users/signup",
          {
            address: "Ox",
            hashOfUniqueKey: hashOfUniqueKey.data.hash,
            photos: base64Array,
          }
        );
        console.log(response.data);
        // setIsRegister(!isRegister);
      } else {
        const response = await axios.post(
          "http://192.168.43.109:4000/api/v1/recognition/recognize",
          {
            image: img,
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    // await cameraRef.current.resumePreview();
    setCamera(false);
    setIsPreview(false);
    setVideoSource(null);
  };
  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );
  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      shouldPlay={true}
      style={styles.media}
    />
  );
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity
        disabled={!isCameraReady}
        onPress={switchCamera}
        style={styles.flip}
      >
        <Text style={styles.text}>{"Flip"}</Text>
        {/* <Feather name={"rotate-cw"} size={30} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          console.log(isRegister);
          if (isRegister) {
            await takeRegisterPictures();
            // setTimeout(() => {}, 1000);
            // setCamera(true);
            await cameraRef.current.resumePreview();

            setIsPreview(false);
            setVideoSource(null);

            console.log(base64Array.length);
            // }
            setCounter(counter + 1);
            console.log("ddd", isPreview);
            if (counter >= 4) {
              await cameraRef.current.pausePreview();

              setIsPreview(true);

              // setIsRegister(!isRegister);
            }
          } else takePicture();
          console.log("clicked");
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Scan Now</Text>
      </TouchableOpacity>
    </View>
  );
  const renderAuthenticate = () => (
    <View style={styles.control}>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          await sendImage();
          navigation.navigate("Transactions");
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
  const background = camera ? "white" : "black";
  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: "#0C0C0C" }}>
      {camera ? (
        <>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
            flashMode={Camera.Constants.FlashMode.on}
            onCameraReady={onCameraReady}
            onMountError={(error) => {
              console.log("cammera error", error);
            }}
          />
          {/* {isVideoRecording && renderVideoRecordIndicator()} */}
          {/* {videoSource && renderVideoPlayer()} */}
          {isPreview && renderCancelPreviewButton()}
          {isPreview && renderAuthenticate()}
          {!videoSource && !isPreview && renderCaptureControl()}
        </>
      ) : (
        <>
          {/* <View style={styles.logo}>
            <Image
              source={require("./assets/face.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View style={styles.title}>
            <Text style={styles.text}>Make Logging in faster with face id</Text>
          </View>
          <View
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
            }}
          >
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setCamera(!camera);
                console.log("clicked");
              }}
            >
              <Image source={require("./assets/white_face.png")} />
              <Text style={{ color: "white", fontSize: 20 }}>Authenticate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setCamera(!camera);
                setIsRegister(!isRegister);
                console.log("clicked");
              }}
            >
              <Image source={require("./assets/white_face.png")} />
              <Text style={{ color: "white", fontSize: 20 }}>
                Set Up Face ID
              </Text>
            </TouchableOpacity>
          </View> */}
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  camera: {
    ...StyleSheet.absoluteFillObject,
    // marginLeft: 40,
    // marginTop: 200,
    height: "70%",
    width: "100%",
    marginVertical: 40,
    // marginHorizontal: 20,
    borderColor: "red",
    borderWidth: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  button: { marginTop: 30 },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",

    bottom: 100,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  flip: {},
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "black",
  },
  text: {
    color: "#6117FF",
    fontSize: 30,
    textAlign: "center",
  },
  logo: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // margin: 50,
    width: "100%",
  },
  title: {
    flex: 1,
  },
  btn: {
    display: "flex",
    paddingHorizontal: 30,
    // width: "40%",
    // marginTop: 100,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6117FF",
    borderRadius: 69,
    paddingVertical: 10,
  },
});
