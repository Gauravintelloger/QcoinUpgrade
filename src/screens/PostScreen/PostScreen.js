import React, { PureComponent } from "react";
import {
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

import AsyncStorage from "@react-native-async-storage/async-storage";

import Post from "../../components/Post";
import { Api } from "../../services";

import { showModal } from "../../navigation/NavigationService";
import { screenIds } from "../../navigation/Screens";

// IMPORT GLUESTACK UI
import { GluestackUIProvider, Box, HStack } from "@gluestack-ui/themed";

const { width } = Dimensions.get("window");
const dimensionsCalculation = (IPhonePixel) => (width * IPhonePixel) / 375;

const styles = StyleSheet.create({
  headerText: {
    fontSize: dimensionsCalculation(20),
    letterSpacing: dimensionsCalculation(0.2),
    lineHeight: dimensionsCalculation(25),
    color: "#fff",
    marginLeft: dimensionsCalculation(8),
  },
});

class PostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    const result = await Api.getPostCall({
      post_id: this.props.route.params.id,
      token: token,
    });

    if (result?.data?.posts) {
      this.setState({ post: result.data.posts }, () => {
        if (this.props.route.params.showComments) {
          showModal(screenIds.COMMENTS_SCREEN, {
            total_likes: result.data.posts.total_likes,
            id: this.props.route.params.id,
            user: this.props.route.params.user,
            post_owner: this.props.route.params.myProfile,
          });
        }
      });
    }
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

  renderPost = () => (
    <Post
      isPostScreen={true}
      navigation={this.props.navigation}
      item={this.state.post}
      user={this.props.route.params.user}
    />
  );

  render() {
    return (
      <GluestackUIProvider>
        <Box flex={1} backgroundColor={"#FCFCFC"}>
          <HStack
            paddingHorizontal={dimensionsCalculation(16)}
            backgroundColor={"#005EB8"}
            justifyContent="space-between"
            alignItems="center"
            paddingTop={dimensionsCalculation(30)}
            style={
              Platform.OS === "android"
                ? { height: dimensionsCalculation(70) }
                : {}
            }
          >
            <TouchableOpacity
              onPress={this.handlePressBack}
              style={{ flexDirection: "row" }}
            >
              <Image
                style={{ marginLeft: 10 }}
                source={require("../../assets/icons/left_arrow.png")}
              />
              <Text style={styles.headerText}>POST</Text>
            </TouchableOpacity>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.post && this.renderPost()}
          </ScrollView>
        </Box>
      </GluestackUIProvider>
    );
  }
}

export default PostScreen;
