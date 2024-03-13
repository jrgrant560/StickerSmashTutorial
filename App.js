import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Platform, Pressable, View } from "react-native";
import { useState } from "react";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/buttons/Button";
import CircleButton from "./components/buttons/CircleButton";
import IconButton from "./components/buttons/IconButton";
import EmojiPicker from "./components/emoji-sticker/EmojiPicker";
import EmojiList from "./components/emoji-sticker/EmojiList";
import EmojiSticker from "./components/emoji-sticker/EmojiSticker";

import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  //resets home screen (to picture select buttons)
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // "we will implement this later"
  };

  //function to pick an image from the device
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //allows the user to edit the image while selecting
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      setShowAppOptions(true);
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
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        // shows buttons for stickers when showAppOptions is true
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        // shows home picture select buttons when showAppOptions is false
        <View style={styles.buttonsContainer}>
          <Button
            theme="primary"
            label="Choose a Photo"
            onPress={() => setShowAppOptions(true)}
          />
          <Button label="Use this Photo" />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
