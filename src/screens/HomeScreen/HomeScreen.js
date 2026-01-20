import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";


import Post from "../../components/Post";
import { push, screenIds, showModal } from "../../navigation";

import BranchFilter from "../../components/BranchFiltera/BranchFilters"; // Ensure correct path

// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

const { width } = Dimensions.get("window");
const dimensionsCalculation = (IPhonePixel) => (width * IPhonePixel) / 375;

const styles = StyleSheet.create({
  textTitle: {
    color: "#fff",
    fontSize: dimensionsCalculation(20),
    letterSpacing: dimensionsCalculation(0.2),
    lineHeight: dimensionsCalculation(25),
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      nextPage: null,
      currentPage: 0,
      lastPage: 0,
      isRefreshing: false,
      selectedBranch: null,
      showBranchFilter: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getPosts({});
  }

  renderAddPost = () => (
    <View
      style={{
        position: "absolute",
        top: dimensionsCalculation(Platform.OS == "android" ? 64 : 90),
        zIndex: 99998,
        alignSelf: "center",
        marginTop: dimensionsCalculation(8),
      }}
    >
      <TouchableOpacity
        onPress={() =>
          push(this.props.componentId, screenIds.ADD_POST_SCREEN, {}, {
            bottomTabs: {
              visible: false,
              animate: true,
            },
          })
        }
        style={{
          height: dimensionsCalculation(60),
          width: dimensionsCalculation(365),
          backgroundColor: "#fff",
          borderRadius: dimensionsCalculation(12),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: dimensionsCalculation(24),
          marginTop:
            Platform.OS == "ios"
              ? dimensionsCalculation(40)
              : dimensionsCalculation(0),
        }}
      >
        {this.props.userProfile?.image && (
          <Image
            source={{ uri: this.props.userProfile.image }}
            style={{
              width: dimensionsCalculation(40),
              height: dimensionsCalculation(40),
              borderRadius: dimensionsCalculation(20),
            }}
          />
        )}
        <Text
          style={{
            flex: 1,
            paddingHorizontal: dimensionsCalculation(16),
            fontSize: dimensionsCalculation(15),
            color: "#717171",
          }}
        >
          Add post ...
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderPost = ({ item }) => (
    <Post componentId={this.props.componentId} item={item} />
  );

  renderFooter = () => {
    if (this.props.allPosts?.pending && !this.state.isRefreshing)
      return <ActivityIndicator size="large" />;
    return <View style={{ height: dimensionsCalculation(60) }} />;
  };

  renderEmpty = () => {
    if (this.state.loading) return <ActivityIndicator size="large" />;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Results found</Text>
      </View>
    );
  };

  render() {
    const showAddPost = this.props.userProfile?.position?.layer !== "C";

    return (
      <GluestackUIProvider>
        {/* Root container box replaces SafeAreaView */}
        <Box flex={1} bg="#FCFCFC">

          {/* Header */}
          <HStack
            justifyContent="space-between"
            px={dimensionsCalculation(16)}
            bg="#005EB8"
            height={dimensionsCalculation(90)}
            alignItems="center"
            style={
              Platform.OS === "android"
                ? { paddingTop: dimensionsCalculation(20) }
                : { paddingTop: dimensionsCalculation(30) }
            }
          >
            <Text style={styles.textTitle}>
              {"Messages Board".toUpperCase()}
            </Text>

            <HStack>
              <TouchableOpacity>
                <Image source={require("../../assets/icons/search-icon.png")} />
              </TouchableOpacity>
              {this.props.userProfile &&
                this.props.userProfile.position?.layer !== "C" && (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        showBranchFilter: !this.state.showBranchFilter,
                      })
                    }
                  >
                    <Image
                      source={
                        this.state.showBranchFilter
                          ? require("../../assets/icons/bx-filter.png")
                          : require("../../assets/icons/bx-filter-white.png")
                      }
                    />
                  </TouchableOpacity>
                )}
            </HStack>
          </HStack>

          {/* Add Post */}
          {showAddPost && this.renderAddPost()}

          {/* Posts List */}
          <FlatList
            style={showAddPost ? { paddingTop: dimensionsCalculation(60) } : {}}
            data={this.state.posts}
            renderItem={this.renderPost}
            keyExtractor={(item, index) =>
              `${item.id}_home_${index}`
            }
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => {
                  this.setState(
                    {
                      posts: [],
                      isRefreshing: true,
                    },
                    () => this.props.getPosts({})
                  );
                }}
              />
            }
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
          />

          {/* Branch Filter */}
          {this.state.showBranchFilter && (
            <BranchFilter
              onPress={(id) =>
                this.setState({ selectedBranch: id, showBranchFilter: false })
              }
              selected={this.state.selectedBranch}
              hide={() => this.setState({ showBranchFilter: false })}
            />
          )}

        </Box>
      </GluestackUIProvider>
    );
  }
}

export default HomeScreen;
