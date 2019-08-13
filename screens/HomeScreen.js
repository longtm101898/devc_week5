import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ToastAndroid
} from "react-native";
import FeedItem from "../components/FlatList/FeedItem";
import { week5Api } from "../common/axios";

export default class HomeScreen extends React.Component {
  state = {
    isLoading: false,
    articles: [],
    totalResults: 0,
    page: 1,
    error: "",
    isLoadMore: false,
    isRefreshing: false
  };
  componentDidMount() {
    const { page } = this.state;
    this.setState({ isLoading: true });
    this.callApi(page);
  }

  callApi = async page => {
    try {
      const { articles } = this.state;
      const res = await week5Api.get(
        `/top-headlines?country=us&apiKey=9518dd1b64ee47e19d0f6e05007b7c16&page=${page}`
      );
      this.setState({
        page,
        isLoading: false,
        articles: articles.concat(res.data.articles),
        totalResults: res.data.totalResults,
        isRefreshing: false
      });
    } catch (error) {
      ToastAndroid.show("Loading articles fail", ToastAndroid.SHORT);
      this.setState({ error });
    }
  };

  renderItem = ({ item }) => <FeedItem item={item} />;

  onFlatListEnd = async () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.callApi(newPage);
  };

  onFlatListRefresh = async () => {
    const firstPage = 1;
    await this.setState({ isLoading: true, isRefreshing: true, articles: [] });
    this.callApi(firstPage);
  };

  renderFooter = () => (
    <ActivityIndicator
      size="large"
      color="blue"
      animating={!this.state.refreshing}
    />
  );

  render() {
    const { isLoading, articles, isRefreshing, totalResults } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style="large" color="red" animating={isLoading} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.textTotalArticles}>Articles: {totalResults}</Text>
        <FlatList
          style={styles.flatList}
          data={articles}
          keyExtractor={(item, index) => item.description + index.toString()}
          renderItem={this.renderItem}
          onEndReached={this.onFlatListEnd}
          onEndReachedThreshold={0.6}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.onFlatListRefresh}
          refreshing={isRefreshing}
          
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
    marginTop: StatusBar.currentHeight
  },
  textTotalArticles: {
    fontWeight: "500"
  },
  flatList: {
    marginHorizontal: 15
  }
});
