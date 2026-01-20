// Navigation.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import SigninScreen from "../screens/SigninScreen/SigninScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
// Import other screens here...

// Stack Navigator
const Stack = createNativeStackNavigator();

// Navigation reference to use outside of screens
let navigatorRef = null;

// Set navigation ref from NavigationContainer
export function setNavigationRef(ref) {
  navigatorRef = ref;
}

/**
 * Replace the whole stack and show tutorial (Welcome) screen
 */
export function pushTutorialScreen() {
  if (!navigatorRef) return;

  navigatorRef.reset({
    index: 0,
    routes: [{ name: "Welcome" }],
  });
}

/**
 * Navigate to another screen
 * @param {string} nextScreen
 * @param {object} passProps
 */
export function push(nextScreen, passProps = {}) {
  if (!navigatorRef) return;

  navigatorRef.navigate(nextScreen, passProps);
}

/**
 * Go back one screen
 */
export const pop = () => {
  if (!navigatorRef) return;

  navigatorRef.goBack();
};

/**
 * Go back to first screen
 */
export const popToRoot = () => {
  if (!navigatorRef) return;

  navigatorRef.reset({
    index: 0,
    routes: [{ name: "Welcome" }],
  });
};

/**
 * Show a modal screen
 * In React Navigation modals are just screens with a `presentation` option
 */
export const showModal = (nextScreen, passProps = {}, options = {}) => {
  if (!navigatorRef) return;

  navigatorRef.navigate(nextScreen, { ...passProps, modal: true, ...options });
};

/**
 * Dismiss the current modal (same as pop)
 */
export const dismissModal = () => {
  if (!navigatorRef) return;

  navigatorRef.goBack();
};

/**
 * Shared Element push — just a normal navigation in React Navigation
 */
export const pushWithSharedElement = (
  nextScreen,
  passProps = {},
  sharedParams = {}
) => {
  if (!navigatorRef) return;

  navigatorRef.navigate(nextScreen, {
    ...passProps,
    sharedParams,
  });
};

/**
 * Tab based (you can customize if you want bottom tabs)
 */
export function pushTabBasedApp() {
  push("Home");
}

// Single screen (same as push)
export function pushSingleScreenApp() {
  push("Home");
}

export default function Navigation() {
  return (
    <NavigationContainer
      ref={(ref) => {
        setNavigationRef(ref);
      }}
    >
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Add more screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
