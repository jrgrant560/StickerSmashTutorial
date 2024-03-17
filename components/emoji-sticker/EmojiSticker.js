import { View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

//sticker element displayed on the image
export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize); // initial size of the sticker
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // object that detects tap gestures
  // upon double tap gesture: scale the sticker to 2x its size
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  // object that detects pan gestures
  // upon pan gesture: move the sticker to the new position by changing its x and y coordinates
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // animated width & height styles for the sticker
  // useAnimatedStyle hook applies an animation object to the sticker's width and height
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value), //"springing" animation for width change
      height: withSpring(scaleImage.value), //"springing" animation for height change
    };
  });

  // animated translateX & translateY styles for the sticker
  // useAnimatedStyle hook applies an animation object to the sticker's x and y coordinates
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      {/* container that is animated */}
      <Animated.View style={[containerStyle, { top: -350 }]}>
        {/* wrapper that detects gestures: in this case, doubletap */}
        <GestureDetector gesture={doubleTap}>
          {/* animatable image */}
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
