import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  StyleSheet,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";

import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import Post from "../../components/Post";

// Gluestack UI
import { HStack, Box } from "@gluestack-ui/themed";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");
const dimensionsCalculation = (iPhonePixel) => (width * iPhonePixel) / 375;

const styles = StyleSheet.create({
  textName: {
    color: "#fff",
    fontSize: dimensionsCalculation(20),
    letterSpacing: 0.2,
    lineHeight: dimensionsCalculation(24),
    marginBottom: dimensionsCalculation(8),
  },
  textPosition: {
    color: "#fff",
    fontSize: dimensionsCalculation(16),
    fontWeight: "800",
    lineHeight: dimensionsCalculation(20),
  },
  textCoins: {
    color: "#EAAA00",
    fontSize: dimensionsCalculation(20),
    fontWeight: "bold",
  },
});

const ProfileScreen = (props) => {
  console.log("props", props);
  const navigation = useNavigation();
  
  const route = useRoute();

  const {
    myProfile = false,
    user = {},
    getUserProfile,
    getUserDetails,
    postsByUserId,
    userProfile,
  } = props;

  const initialUser = myProfile ? userProfile || {} : user || {};

  const [state, setState] = useState({
    posts: [],
    nextPage: null,
    currentPage: 0,
    lastPage: 0,
    achievments: [],
    load: false,
    userDetails: { ...initialUser },
    user: { ...initialUser },
  });

  const userId = state.user.id;

  useFocusEffect(
    useCallback(() => {
      if (myProfile) {
        getUserDetails({});
      }
    }, [myProfile, getUserDetails])
  );

  useEffect(() => {
    if (userId) {
      getUserProfile({ userId });
    }
  }, [userId, getUserProfile]);

  useEffect(() => {
    const currPayload = postsByUserId[userId] || {};
    if (currPayload.success) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(350, "easeInEaseOut", "scaleXY")
      );

      setState((prev) => ({
        ...prev,
        posts: currPayload.list || [],
        nextPage: currPayload.next_page_url,
        currentPage: currPayload.current_page || 0,
        lastPage: prev.currentPage,
        achievments: currPayload.achievments || [],
        load: true,
        userDetails: {
          ...prev.userDetails,
          ...(currPayload.user_info || {}),
        },
      }));
    }
  }, [postsByUserId, userId]);

  const getDisplayPoints = useCallback(
    ({ layer, position = {}, points, given_points, points_to_give }) => {
      const posLayer = position.layer;
      const showRaw =
        layer === "C" ||
        layer === "B" ||
        posLayer === "C" ||
        posLayer === "B";

      return showRaw ? points ?? given_points ?? 0 : points_to_give ?? 0;
    },
    []
  );

  const fetchMore = useCallback(() => {
    if (
      state.nextPage &&
      state.currentPage !== state.lastPage
    ) {
      getUserProfile({
        userId,
        page: state.currentPage + 1,
      });
    }
  }, [
    state.nextPage,
    state.currentPage,
    state.lastPage,
    userId,
    getUserProfile,
  ]);

  const handlePressBack = () => {
    if (!myProfile) navigation.goBack();
  };

  const renderAddPost = () => (
    <Box
      position="absolute"
      bottom={-dimensionsCalculation(50)}
      zIndex={99998}
      alignSelf="center"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("AddPostScreen")}
        style={{
          height: dimensionsCalculation(60),
          width: dimensionsCalculation(365),
          backgroundColor: "#fff",
          borderRadius: dimensionsCalculation(12),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: dimensionsCalculation(24),
        }}
      >
        <Text
          style={{
            fontSize: dimensionsCalculation(15),
            color: "#717171",
          }}
        >
          add post …
        </Text>
      </TouchableOpacity>
    </Box>
  );

  const showAddPost = userProfile?.position?.layer !== "C";

  const titleText = route.params?.profile
    ? "Profile"
    : userProfile?.position?.layer === "A" ||
      userProfile?.position?.layer === "B"
      ? "Allocation Of Qcoins"
      : "My Achievements";

  return (
    <Box flex={1} bg="#005EB8">
      {/* Header */}
      <HStack
        px={dimensionsCalculation(16)}
        alignItems="center"
        justifyContent="space-between"
        bg="#005EB8"
        style={
          Platform.OS === "android"
            ? { height: dimensionsCalculation(70), paddingTop: dimensionsCalculation(20) }
            : {}
        }
      >
        <TouchableOpacity onPress={handlePressBack} style={{ flexDirection: "row" }}>
          {!myProfile && (
            <Image
              source={require("../../assets/icons/left_arrow.png")}
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={{ color: "#fff", fontSize: dimensionsCalculation(20) }}>
            {titleText}
          </Text>
        </TouchableOpacity>
      </HStack>

      {/* Body */}
      <Box flex={1} bg="#FFF">
        {/* Profile Header */}
        <Box
          w="100%"
          bg="#005EB8"
          justifyContent="center"
          alignItems="center"
          pb={dimensionsCalculation(76)}
        >
          {state.userDetails.image ? (
            <Image
              source={{ uri: state.userDetails.image }}
              style={{
                width: dimensionsCalculation(114),
                height: dimensionsCalculation(114),
                borderRadius: dimensionsCalculation(57),
                marginTop: 16,
              }}
              resizeMode="cover"
            />
          ) : null}

          <Text style={styles.textName}>
            {state.userDetails.name?.toUpperCase()}
          </Text>

          <Text style={styles.textPosition}>
            {state.userDetails.position?.name}
          </Text>

          <Text style={styles.textName}>
            <Text style={styles.textCoins}>
              {getDisplayPoints(state.userDetails)}
            </Text>{" "}
            Qcoins
          </Text>

          {showAddPost && renderAddPost()}
        </Box>

        {/* Posts List */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.posts}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={({ item }) => (
            <Post
              item={item}
              myProfile={myProfile}
              user={state.user}
              navigation={navigation} // pass navigation here if Post needs it
            />
          )}
          ListFooterComponent={
            state.nextPage ? (
              <ActivityIndicator size="large" />
            ) : null
          }
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No posts yet
            </Text>
          )}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.7}
        />
      </Box>
    </Box>
  );
};

export default ProfileScreen;
