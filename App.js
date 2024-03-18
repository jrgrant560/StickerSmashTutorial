import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, View } from "react-native";
import { useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

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
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();

  if (permissionStatus === null) {
    requestPermission();
  }

  //resets home screen (to picture select buttons)
  const onReset = () => {
    setShowAppOptions(false);
  };

  // switch modal to visible
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // close modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const imageRef = useRef();

  // take a screenshot of the image and save it to the device
  // NOTE: right now, this saves the image to Android's 'DCIM' folder; will need to explore further to specify a custom folder
  const onSaveImageAsync = async () => {

    if (Platform.OS !== "web") { //if platform is not web, use captureRef
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else { //if platform is web, use domtoimage
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {/* TASK: set imageContainer to contain selectedImage, regardless of size */}
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
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
              onPress={pickImageAsync}
              // onPress={() => setShowAppOptions(true)}
            />
            <Button label="Use this Photo" />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
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
