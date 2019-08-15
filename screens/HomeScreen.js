import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FeedItem from "../components/FlatList/FeedItem";
import { week5Api } from "../common/axios";
import SearchModal from "../components/Modal";

export default class HomeScreen extends React.Component {
  state = {
    isLoading: false,
    articles: [],
    publishers: [],
    totalResults: 0,
    page: 1,
    error: "",
    isLoadMore: false,
    isRefreshing: false,
    lastPageReached: false,
    modalSearch: false
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
      const newArticles = articles.concat(res.data.articles),
        publishers = this.getPulishers(newArticles);
      this.setState({
        page,
        isLoading: false,
        articles: newArticles,
        totalResults: res.data.totalResults,
        isRefreshing: false,
        publishers,
        lastPageReached: res.data.articles.length > 0 ? false : true
      });
    } catch (error) {
      ToastAndroid.show("Loading articles fail", ToastAndroid.SHORT);
      this.setState({ error });
    }
  };

  getPulishers = articles => {
    var publishers = articles.map(item => item.source.name);
    return publishers.filter((item, i) => publishers.indexOf(item) >= i);
  };

  renderItem = ({ item }) =>
    item ? <FeedItem item={item} /> : <Text>No articles found.</Text>;

  onFlatListEnd = () => {
    const { page, lastPageReached } = this.state;
    const newPage = page + 1;
    if (lastPageReached) {
      return;
    }
    this.callApi(newPage);
  };

  onFlatListRefresh = async () => {
    const firstPage = 1;
    await this.setState({ isLoading: true, isRefreshing: true, articles: [] });
    this.callApi(firstPage);
  };

  renderFooter = () =>
    this.state.lastPageReached ? (
      <Text>No more articles</Text>
    ) : (
      <ActivityIndicator
        size="large"
        color="blue"
        animating={!this.state.refreshing}
      />
    );

  onHandleVisibleSearchModal = () => {
    this.setState({ modalSearch: !this.state.modalSearch });
  };

  onFilter = ({ title, source }) => {
    console.log(title);
    
    this.setState({ articles: [], isLoading: true });
    const { articles, modalSearch } = this.state;
    const articlesFitler = articles.filter(
      article =>
        article.title.includes(title) & article.source.name === source.name
    );
    this.setState({
      articles: articlesFitler,
      totalResults: articlesFitler.length,
      isLoading: false,
      modalSearch: !modalSearch
    });
  };

  render() {
    const {
      isLoading,
      articles,
      publishers,
      isRefreshing,
      totalResults,
      modalSearch
    } = this.state;
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
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={this.onHandleVisibleSearchModal}
        >
          <Ionicons name="ios-search" size={22} />
        </TouchableOpacity>
        <SearchModal
          visible={modalSearch}
          onClose={this.onHandleVisibleSearchModal}
          articles={articles}
          publishers={publishers}
          onFilter={this.onFilter}
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
    marginTop: StatusBar.currentHeight
  },
  textTotalArticles: {
    fontWeight: "500"
  },
  flatList: {
    marginHorizontal: 15
  },

  btnSearch: {
    position: "absolute",
    backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    borderRadius: 30,
    height: 60,
    right: 30,
    bottom: 40
  }
});
