// src/navigation/RootStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenIds from "./screenIds";

// Import screens
import WelcomeScreen from "../screens/WelcomeMessageScreen/WelcomeMessageScreen";
import SigninScreen from "../screens/SigninScreen/SigninScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/PostScreen/PostScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen/LeaderBoardScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
// import additional ones as needed

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName={screenIds.WELCOME_SCREEN}>
            <Stack.Screen
                name={screenIds.WELCOME_SCREEN}
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={screenIds.SIGNIN_SCREEN}
                component={SigninScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={screenIds.HOME_SCREEN}
                component={HomeScreen}
            />
            <Stack.Screen
                name={screenIds.PROFILE_SCREEN}
                component={ProfileScreen}
            />
            <Stack.Screen
                name={screenIds.LEADER_BOARD_SCREEN}
                component={LeaderBoardScreen}
            />
            <Stack.Screen
                name={screenIds.NOTIFICATION_SCREEN}
                component={NotificationScreen}
            />
            {/* add more screens here */}
        </Stack.Navigator>
    );
}
