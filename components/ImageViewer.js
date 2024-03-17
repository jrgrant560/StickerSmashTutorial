import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    // console.log("SELECTED IMAGE IS: ", selectedImage)
    // const imageProps = selectedImage ? { uri: selectedImage.uri } : placeholderImageSource;
    const imageSource = selectedImage ? { uri: selectedImage.uri } : placeholderImageSource;
    const imageWidth = 320;
    const imageHeight = 440;

    
    // let imageWidth;
    // let imageHeight;
    // if (selectedImage) {
    //     imageWidth = selectedImage.width;
    //     imageHeight = selectedImage.height;
    // } else {
    //     imageWidth = 320;
    //     imageHeight = 440;
    // }
  
    return (
    <Image source={imageSource} style={[styles.image, {width: imageWidth}, {height: imageHeight}]} />
  );
}

const styles = StyleSheet.create({
  image: {
    // width: 320,
    // height: 440,
    borderRadius: 18,
  },
});
