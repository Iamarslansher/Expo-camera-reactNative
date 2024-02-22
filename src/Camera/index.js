import { Camera, CameraType } from "expo-camera";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import Gallery from "../Gallery";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraComponent() {
  const [permission, setPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (permission === false) {
    return <Text>No Access to Camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (ref) {
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const photo = await ref.current.takePictureAsync(options);

        const copyImaghes = [...allImages];
        copyImaghes.push(photo.uri);
        setAllImages(copyImaghes);
        setImage(photo.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImg = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        {!image ? (
          <Camera style={styles.camera} type={type} ref={ref}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Button
                  title="Flip Camera"
                  style={styles.text}
                  onPress={toggleCameraType}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Button
                  title="Take Pic"
                  style={styles.text}
                  onPress={takePicture}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View style={styles.galleryContainer}>
            <Gallery allUri={allImages} />
            <Button
              style={styles.takeAghainBtn}
              title="take picture again"
              onPress={() => setImage(null)}
            />
          </View>
          // <View>
          //   <Image
          //     style={styles.img}
          //     source={{
          //       uri: image,
          //     }}
          //   />
          //   <View style={styles.buttonView}>
          //     <Button
          //       title="take picture again"
          //       onPress={() => setImage(null)}
          //     />
          //     <Button title="Save" onPress={saveImg} />
          //   </View>
          // </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    top: -65,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  galleryContainer: {
    flex: 1,
    paddingTop: 33,
    gap: 10,
  },
  takeAghainBtn: {
    flex: 1,
  },
});
