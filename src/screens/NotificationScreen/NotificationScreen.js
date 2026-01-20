import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"; // If needed

import { showModal, screenIds, goToLogin, push } from "../../navigation";

// ** Gluestack UI imports **
import { HStack, Box, VStack } from "@gluestack-ui/themed";

const { width } = Dimensions.get("window");
const dimensionsCalculation = (IPhonePixel) => (width * IPhonePixel) / 375;

const styles = StyleSheet.create({
  textBody: {
    fontSize: dimensionsCalculation(14),
    color: "#929292",
    flexWrap: "wrap",
    flex: 1,
  },
  dateText: {
    color: "#CECECE",
  },
});

class NotificationScreen extends Component {
  componentDidMount() {
    this.props.getNotification({});
  }

  renderNotification = ({ item }) => {
    const {
      created_at = "",
      body,
      from_user = {},
      click_action = "",
    } = item || {};
    const { image = "" } = from_user || {};

    const navigate_to =
      item.body && item.body.includes("Request")
        ? screenIds.SETTING_SCREEN
        : screenIds.POST_SCREEN;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          push(
            this.props.componentId,
            navigate_to,
            { id: click_action },
            {
              layout: { backgroundColor: "#fff" },
              modalPresentationStyle: "overCurrentContext",
              statusBar: {
                style: "dark",
                backgroundColor: "#005EB8",
              },
            }
          );
        }}
      >
        <View
          style={{
            flex: 1,
            padding: dimensionsCalculation(16),
            backgroundColor: "#FFFFFF",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: dimensionsCalculation(50),
                height: dimensionsCalculation(50),
                borderRadius: dimensionsCalculation(25),
                backgroundColor: "#ddd",
              }}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: dimensionsCalculation(25),
                  }}
                />
              ) : null}
            </View>

            <View
              style={{
                flex: 1,
                paddingHorizontal: dimensionsCalculation(4),
                paddingTop: dimensionsCalculation(4),
              }}
            >
              <Text style={styles.textBody}>{body}</Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-end",
              paddingTop: dimensionsCalculation(4),
            }}
          >
            <Text style={styles.dateText}>
              {created_at ? created_at.split(" ")[0] : ""}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderEmpty = () => {
    if (this.props.notification.success) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: dimensionsCalculation(30),
          }}
        >
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>
            No Notifications
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      // Root Box container instead of SafeAreaView
      <Box flex={1} bg="#FCFCFC">
        {/* Header */}
        <HStack
          px={dimensionsCalculation(16)}
          bg="#005EB8"
          justifyContent="flex-start"
          alignItems="center"
          height={dimensionsCalculation(90)}
          style={
            Platform.OS === "android"
              ? { paddingTop: dimensionsCalculation(30) }
              : { paddingTop: dimensionsCalculation(50) }
          }
        >
          <Text
            style={{
              fontSize: dimensionsCalculation(20),
              letterSpacing: dimensionsCalculation(0.2),
              color: "#fff",
            }}
          >
            {"Notifications".toUpperCase()}
          </Text>
        </HStack>

        {/* List of Notifications */}
        <FlatList
          data={this.props?.notification?.list}
          keyExtractor={(item, index) =>
            (item.id + "notif" + index).toString()
          }
          renderItem={this.renderNotification}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                this.props.getNotification({});
              }}
            />
          }
          ListEmptyComponent={this.renderEmpty}
        />
      </Box>
    );
  }
}

export default NotificationScreen;
