import React from "react";
import { View, Modal, Text, TextInput, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Publisers from "../Publishers";

class SearchModal extends React.PureComponent {
  state = { searchText: "", publiserSelected: {}, selectedId: -1 };
  onChangeTextSearch = searchText => {
    this.setState({ searchText });
  };

  onSelectPubliser = (publisher, selectedId) => {
    const { publiserSelected } = this.state;
    this.setState({
      publiserSelected: { ...publiserSelected, name: publisher },
      selectedId
    });
  };

  render() {
    const { visible, onClose, publishers, onFilter } = this.props;
    const { searchText, selectedId, publiserSelected } = this.state;

    return (
      <View style={styles.searchModalContainer}>
        <Modal visible={visible} animationType="slide">
          <Ionicons name="ios-arrow-round-back" size={30} onPress={onClose} />
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={this.onChangeTextSearch}
          />
          <Text style={styles.textBold}>Publishers: </Text>
          <View style={styles.publishersContainer}>
            <Publisers
              publishers={publishers}
              onSelectPubliser={this.onSelectPubliser}
              selected={selectedId}
            />
          </View>

          <Button
            title="Apply filter"
            onPress={() =>
              onFilter({
                title: searchText,
                source: { name: publiserSelected.name }
              })
            }
          />
        </Modal>
      </View>
    );
  }
}

export default SearchModal;

const styles = StyleSheet.create({
  searchModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  input: {
    borderWidth: 1,
    height: 30,
    borderColor: "gray",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  textBold: {
    fontWeight: "800"
  },
  publishersContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
    flexWrap: "wrap"
  }
});
