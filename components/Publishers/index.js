import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
const Publisers = ({ publishers, onSelectPubliser, selected }) =>
  publishers &&
  publishers.map((publisher, i) => (
    <TouchableOpacity
      key={i}
      style={[styles.container, selected === i && styles.selected]}
      onPress={() => onSelectPubliser(publisher, i)}
    >
      <Text style={{ color: "black" }}>{publisher}</Text>
    </TouchableOpacity>
  ));

export default Publisers;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    marginRight: 4,
    marginBottom: 6
  },
  selected: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF0074"
  }
});
