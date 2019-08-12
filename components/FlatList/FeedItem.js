import React from "react";
import { View, Text, StyleSheet, Image, Button, Linking } from "react-native";

onPressReadmore = url => {
  Linking.openURL(url).catch(err => console.error(err));
};
const FeedItem = ({ item: { urlToImage, title, url } }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: urlToImage }} style={styles.image} />
      <Text>{title}</Text>
      <Button
        style={styles.button}
        title="Read more"
        onPress={() => onPressReadmore(url)}
      />
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  image: {
    width: 400,
    height: 200
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 15,
    borderRadius: 10
  }
});
