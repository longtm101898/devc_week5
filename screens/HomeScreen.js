import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import FeedItem from "../components/FlatList/FeedItem";
import { week5Api } from "../common/axios";

export default class HomeScreen extends React.Component {
  state = {
    isLoading: false,
    articles: [],
    totalResults: 0,
    page: 1
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const res = await week5Api.get(
      "/top-headlines?country=us&apiKey=9518dd1b64ee47e19d0f6e05007b7c16&page=1"
    );
    this.setState({
      isLoading: false,
      articles: res.data.articles,
      totalResults: res.data.totalResults
    });
  }

  renderItem = ({ item }) => <FeedItem item={item} />;

  render() {
    const { isLoading, articles } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style="large" color="red" animating={isLoading} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={articles}
          keyExtractor={item => item.content}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  flatList: {
    marginHorizontal: 15
  }
});
