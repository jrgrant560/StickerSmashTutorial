import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";



const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.buttonsContainer}>
          <Button theme="primary" label="Choose a Photo" />
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
