import React from "react";
import { View, Text, StyleSheet, Image, Button, Linking } from "react-native";
import { timeSince } from "../../common/utils";

onPressReadmore = url => {
  Linking.openURL(url).catch(err => console.error(err));
};
const imageNotFound =
  "https://t4.ftcdn.net/jpg/01/39/16/63/240_F_139166369_NdTDXc0lM57N66868lC66PpsaMkFSwaf.jpg";
const FeedItem = ({
  item: { urlToImage, title, content, url, source, publishedAt }
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.title}>
        <Text style={styles.textBold}>{title}</Text>
      </View>

      <Image
        source={{ uri: urlToImage || imageNotFound }}
        style={styles.image}
      />
      <Text style={styles.textBold}>
        Source: <Text style={styles.textNormal}>{source.name}</Text>
      </Text>
      <Text style={styles.textNormal}>
        {content || "Does not have content"}
      </Text>
      <Text style={styles.textBold}>
        Published:{" "}
        <Text style={styles.textNormal}>{timeSince(publishedAt) + " ago"}</Text>
      </Text>
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
    paddingHorizontal: 10,
    borderColor: "#808080",
    borderWidth: 1,
    marginBottom: 5,
    justifyContent: "center"
  },
  title: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 360,
    height: 200
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 15,
    borderRadius: 10
  },
  textBold: {
    fontWeight: "800"
  },
  textNormal: {
    fontWeight: "100"
  }
});
