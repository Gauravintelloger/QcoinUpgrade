import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const dimensionsCalculation = (iPhonePixel) =>
  (width * iPhonePixel) / 375;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  text: {
    color: "#FFFFFF",
    lineHeight: dimensionsCalculation(22),
    letterSpacing: dimensionsCalculation(0.6),
    fontSize: dimensionsCalculation(14),
    marginBottom: dimensionsCalculation(8),
  },
  title: {
    fontSize: dimensionsCalculation(20),
    color: "#FFFFFF",
    lineHeight: dimensionsCalculation(25),
    letterSpacing: dimensionsCalculation(3),
    marginBottom: dimensionsCalculation(24),
  },
  bottomBar: {
    height: dimensionsCalculation(48),
    backgroundColor: "#005EB8",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: dimensionsCalculation(24),
    flexDirection: "row",
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: dimensionsCalculation(18),
    marginRight: dimensionsCalculation(8),
  },
});

class WelcomeMessageScreen extends PureComponent {
  handlePress = async () => {
    const { goToLogin, dismissModal } = require("../../navigation");

    await AsyncStorage.setItem("firstTime", "yes");

    goToLogin();
    dismissModal(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={[styles.flex, { backgroundColor: "#005EB8" }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: dimensionsCalculation(24) }}>
              <Text style={styles.title}>Welcome to the Qcoin App</Text>

              <Text style={styles.text}>
                Quality Points is the currency we use to reward audit quality
                and this App will help you in keeping the score and record
                feedback.
              </Text>

              <Text style={styles.text}>
                Let’s enhance the audit quality and get rewarded{" "}
                <Image
                  source={require("../../assets/icons/like_splash.png")}
                  style={{
                    width: dimensionsCalculation(20),
                    height: dimensionsCalculation(18),
                  }}
                />
              </Text>

              <View style={{ marginTop: dimensionsCalculation(24) }}>
                <Text style={styles.text}>Muhammad Tariq</Text>
                <Text style={styles.text}>
                  Head of Audit – Saudi Levant Cluster
                </Text>
              </View>

              <View style={{ marginTop: dimensionsCalculation(16) }}>
                <Text style={styles.text}>Kashif Zafar</Text>
                <Text style={styles.text}>
                  Audit COO – Saudi Levant Cluster
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={this.handlePress}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.skipText}>SKIP</Text>
              <Image
                source={require("../../assets/icons/right_arrow.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

export default WelcomeMessageScreen;
