import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
  
  //array of all emoji images
  const [emoji] = useState([
    require('../../assets/images/emoji1.png'),
    require('../../assets/images/emoji2.png'),
    require('../../assets/images/emoji3.png'),
    require('../../assets/images/emoji4.png'),
    require('../../assets/images/emoji5.png'),
    require('../../assets/images/emoji6.png'),
  ]);

  return (
    // react native component that displays a list of elements
    <FlatList
      horizontal //displays horizontally
      showsHorizontalScrollIndicator={Platform.OS === 'web'} //displays the horizontal scroll bar IF the platform is a web browser
      data={emoji} // array of emoji images from useState
      contentContainerStyle={styles.listContainer}
      // maps all images into Pressable Image elements
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
