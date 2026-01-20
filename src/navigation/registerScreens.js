// AppNavigator.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from '../store';

// Import your screens
import {
  WelcomeScreen,
  WelcomeMessageScreen,
  SigninScreen,
  ChangePasswordScreen,
  HomeScreen,
  ProfileScreen,
  AddPostScreen,
  TagPeopleScreen,
  NotFoundScreen,
  LeaderBoardScreen,
  SettingScreen,
  ModalScreen,
  LikesScreen,
  UserInformationScreen,
  ChangePhotoModal,
  ChangePasswordScreen1,
  CommentsScreen,
  ForgetPasswordScreen,
  NotificationScreen,
  PostScreen,
  NewScreen,
  RedeemScreen,
  AboutScreen,
  PublicationScreen,
  // TermsScreen (if outside src/screens)
} from '../screens';

// import TermsScreen from 'src/screens/TermsScreen';

// console.log("registerScreen");
// // Debug logs for undefined screens
// console.log("🚀 SCREEN IMPORTS CHECK START 🚀");

// console.log("WelcomeScreen:", WelcomeScreen);
// console.log("WelcomeMessageScreen:", WelcomeMessageScreen);
// console.log("SigninScreen:", SigninScreen);
// console.log("ChangePasswordScreen:", ChangePasswordScreen);
// console.log("HomeScreen:", HomeScreen);
// console.log("ProfileScreen:", ProfileScreen);
// console.log("AddPostScreen:", AddPostScreen);
// console.log("TagPeopleScreen:", TagPeopleScreen);
// console.log("NotFoundScreen:", NotFoundScreen);
// console.log("LeaderBoardScreen:", LeaderBoardScreen);
// console.log("SettingScreen:", SettingScreen);
// console.log("ModalScreen:", ModalScreen);
// console.log("LikesScreen:", LikesScreen);
// console.log("UserInformationScreen:", UserInformationScreen);
// console.log("ChangePhotoModal:", ChangePhotoModal);
// console.log("ChangePasswordScreen1:", ChangePasswordScreen1);
// console.log("CommentsScreen:", CommentsScreen);
// console.log("ForgetPasswordScreen:", ForgetPasswordScreen);
// console.log("NotificationScreen:", NotificationScreen);
// console.log("PostScreen:", PostScreen);
// console.log("NewScreen:", NewScreen);
// console.log("RedeemScreen:", RedeemScreen);
// console.log("AboutScreen:", AboutScreen);
// console.log("PublicationScreen:", PublicationScreen);

// console.log("🚀 SCREEN IMPORTS CHECK END 🚀");



const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="WelcomeMessage" component={WelcomeMessageScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddPost" component={AddPostScreen} />
          <Stack.Screen name="TagPeople" component={TagPeopleScreen} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
          <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Modal" component={ModalScreen} />
          <Stack.Screen name="Likes" component={LikesScreen} />
          <Stack.Screen name="UserInformation" component={UserInformationScreen} />
          <Stack.Screen name="ChangePhoto" component={ChangePhotoModal} />
          <Stack.Screen name="ChangePassword1" component={ChangePasswordScreen1} />
          <Stack.Screen name="Comments" component={CommentsScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="New" component={NewScreen} />
          <Stack.Screen name="Redeem" component={RedeemScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Publication" component={PublicationScreen} />
          {/* <Stack.Screen name="Terms" component={TermsScreen} /> */}
          {/* Add other screens similarly */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppNavigator;
