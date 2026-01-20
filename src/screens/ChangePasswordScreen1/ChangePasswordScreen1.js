import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { pop } from "../../navigation";
import { HStack, Box } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { OverLay } from "../../components/OverLay";
import Snackbar from "react-native-snackbar";

const { width } = Dimensions.get("window");
const dimensionsCalculation = (IPhonePixel) => (width * IPhonePixel) / 375;

const ChangePasswordScreen1 = ({ componentId, changePassword, pending }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSavePassword = () => {
    Keyboard.dismiss();
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const matches = regex.exec(password2);

    if (!password1 || !password2 || !password3) {
      Snackbar.show({
        text: "Please fill all the fields.",
        backgroundColor: "red",
        duration: Snackbar.LENGTH_LONG,
        action: { text: "Okay", onPress: () => Snackbar.dismiss() },
      });
    } else if (password2 !== password3) {
      Snackbar.show({
        text: "The password confirmation does not match.",
        backgroundColor: "red",
        duration: Snackbar.LENGTH_LONG,
        action: { text: "Okay", onPress: () => Snackbar.dismiss() },
      });
    } else if (!matches) {
      Snackbar.show({
        text: "Your Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and be at least 8 characters.",
        backgroundColor: "red",
        duration: Snackbar.LENGTH_LONG,
        action: { text: "Okay", onPress: () => Snackbar.dismiss() },
      });
    } else {
      changePassword({
        old_password: password1.toString(),
        password: password2.toString(),
        password_confirmation: password3.toString(),
        dont: true,
      });
      setPassword1("");
      setPassword2("");
      setPassword3("");
    }
  };

  return (
    <GluestackUIProvider>
    <Box flex={1} backgroundColor={"white"}>
      <HStack
        backgroundColor={"#005EB8"}
        borderBottomWidth={0}
        justifyContent={"flex-start"}
        alignItems={"center"}
        style={
          Platform.OS === "android" ? { height: dimensionsCalculation(70) } : {}
        }
      >
        <TouchableOpacity
          onPress={() => pop(componentId)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
            <Image style={{ marginLeft: 10 }} source={require("../../assets/icons/left_arrow.png")} />
          <Text
            style={{
              fontSize: dimensionsCalculation(20),
              color: "#FFFFFF",
              marginHorizontal: dimensionsCalculation(8),
            }}
          >
            {"Change Password".toUpperCase()}
          </Text>
        </TouchableOpacity>
      </HStack>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
      >
        <View
          style={{
            paddingHorizontal: dimensionsCalculation(32),
            marginTop: dimensionsCalculation(32),
          }}
        >
          {["Current Password", "New Password", "Confirm New Password"].map(
            (label, index) => (
              <View
                key={index}
                style={{ marginBottom: dimensionsCalculation(32) }}
              >
                <Text
                  style={{
                    color: "#707070",
                    fontSize: dimensionsCalculation(18),
                    fontWeight: "bold",
                    marginBottom: dimensionsCalculation(16),
                  }}
                >
                  {label}
                </Text>
                <CustomInput
                  colored={false}
                  image={require("../../assets/icons/lock.png")}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  password
                  value={[password1, password2, password3][index]}
                  onChange={(text) =>
                    [setPassword1, setPassword2, setPassword3][index](text)
                  }
                  showPassword={showPassword}
                  onClick={setShowPassword}
                  error={null}
                />
              </View>
            )
          )}
          <CustomButton
            title={"Save new password"}
            click={handleSavePassword}
          />
        </View>
      </KeyboardAwareScrollView>
      {pending && <OverLay />}
    </Box>
    </GluestackUIProvider>
  );
};

export default ChangePasswordScreen1;