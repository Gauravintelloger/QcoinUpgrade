import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef } from './navigationRef';
import screenIds from './screenIds';

import AppTabs from './AppTabs';
import SignInScreen from '../screens/SigninScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={screenIds.WELCOME_SCREEN}
                    component={WelcomeScreen}
                />
                <Stack.Screen
                    name={screenIds.SIGNIN_SCREEN}
                    component={SignInScreen}
                />
                <Stack.Screen
                    name={screenIds.MAIN_TABS}
                    component={AppTabs}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
