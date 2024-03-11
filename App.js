import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { useState } from "react";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  //function to pick an image from the device
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //allows the user to edit the image while selecting
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    } else {
      alert("You did not select an image");
    }
  };

  return (
    <View style={styles.container}>
      {/* TASK: set imageContainer to contain selectedImage, regardless of size */}
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          theme="primary"
          label="Choose a Photo"
          onPress={pickImageAsync}
        />
        <Button label="Use this Photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// NOTE: Tailwind can work with React Native, using libraries such as https://www.nativewind.dev/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  buttonsContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
