// userSaga.js  

import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import C from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { getUserDetailsAction } from '../actions/userActions';
import Snackbar from 'react-native-snackbar';

import { getApp } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

// Helper to check permission and get FCM token
async function checkPermissionAndGetToken() {
  const app = getApp();
  const msg = messaging(app);

  // On iOS: request permission; on Android: it's usually auto-granted (for API ≤ 32)
  const authStatus = await msg.requestPermission();
  const enabled =
    authStatus === msg.AuthorizationStatus.AUTHORIZED ||
    authStatus === msg.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return null;
  }

  // Register for remote messages (Android, iOS)
  await msg.registerDeviceForRemoteMessages();  // ensure device is registered

  // Get token
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await msg.getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
  return fcmToken;
}

function* login(action) {
  const { Api } = require("../../services");
  try {
    const deviceToken = yield call(checkPermissionAndGetToken);
    const response = yield call(Api.loginCall, {
      ...action.payload,
      deviceToken,
    });
    if (response.data) {
      if (response.data.message || response.data.errors) {
        yield put({ type: C.LOGIN_USER_FAILED, payload: { error: response.data.message } });
        Snackbar.show({
          text: response.data.message || 'Error occurred',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Okay',
            onPress: () => { Snackbar.dismiss(); },
          },
        });
      } else {
        yield call(AsyncStorage.setItem, 'user', JSON.stringify(response.data.user));
        yield call(AsyncStorage.setItem, 'token', response.data.access_token);
        yield call(AsyncStorage.setItem, 'firstTime', "yes");
        yield call(
          AsyncStorage.setItem,
          'changePassword',
          response.data.should_change_password ? 'yes' : 'no'
        );
        yield put({
          type: C.LOGIN_USER_SUCCEEDED,
          payload: {
            accessToken: response.data.access_token,
            changePassword: response.data.should_change_password,
            tokenType: response.data.token_type,
            user: response.data.user,
          },
        });

        // navigation logic — if you have RootNavigation or other navigator
        // if (response.data.should_change_password) { ... } else { ... }
      }
    }
  } catch (e) {
    console.warn(e);
    yield put({ type: C.LOGIN_USER_FAILED, payload: { error: e } });
  }
}

const _storeData = async (name, payload) => {
  try {
    await AsyncStorage.setItem(name, payload);
  } catch (error) {
    // Error saving data
  }
};

function* changePassword(action) {
  const { Api } = require("../../services");
  const { resetRoot } = require("../../navigation");
  try {
    const token = yield call(_retrieveData, 'token');
    let response = null;
    response = yield call(Api.changePasswordCall, { ...action.payload, token });
    if (response.data) {
      if (response.data.message || response.data.errors) {
        if (response.data.message === 'Password Changed Succesully') {
          _storeData('changePassword', 'no');

          Snackbar.show({
            text: response.data.message,

            backgroundColor: 'green',

            duration: Snackbar.LENGTH_LONG,
            action: {
              text: 'Okay',

              onPress: () => { Snackbar.dismiss() },
            },
          });
          if (!action.payload.dont)
            setTimeout(() => {
              resetRoot();
            }, 3000);
        } else {

          Snackbar.show({
            text: response.data.message,
            type: 'danger',
            backgroundColor: 'red',

            duration: Snackbar.LENGTH_LONG,
            action: {
              text: 'Okay',

              onPress: () => { Snackbar.dismiss() },
            },
          });
        }
      } else {
        // _storeData('changePassword', response.data.should_change_password ? 'yes' : 'no')
        yield put({
          type: C.CHANGE_PASSWORD_SUCCEEDED,
          payload: {
            // accessToken: response.data.access_token,
            // changePassword: response.data.should_change_password,
            // tokenType: response.data.token_type,
            // user: response.data.user
          },
        });
      }
    }
  } catch (e) {
    yield put({
      type: C.CHANGE_PASSWORD_FAILED,
      payload: {
        error: e,
      },
    });
  }
}

function* getUserProfile(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token');
    if (token) {
      const response = yield call(Api.getUserProfileCall, {
        token,
        userId: action.payload.userId,
        page: action.payload.page ? action.payload.page : 1,
      });
      if (response.data && response.data.posts && response.data.posts) {
        yield put({
          type: C.GET_USER_PROFILE_SUCCEEDED,
          payload: {
            posts: response.data.posts,
            achievments: response.data.achievments,
            user_info: response.data.user_info || null,
            userId: action.payload.userId,
          },
        });
      } else {
        yield put({
          type: C.GET_USER_PROFILE_FAILED,
          payload: {
            error: 'something went wrong [getPsots]',
          },
        });
      }
    }
  } catch (e) {
    // alert(JSON.stringify(e))
    yield put({
      type: C.GET_USER_PROFILE_FAILED,
      payload: {
        error: e,
      },
    });
  }
}

function* getUserDetails(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token');
    if (token) {
      const response = yield call(Api.getUserDataCall, {
        token,
      });
      if (response.data && !response.data.message) {
        yield put({
          type: C.GET_USER_DETAILS_SUCCEEDED,
          payload: {
            ...response.data,
          },
        });
      } else {
        yield put({
          type: C.GET_USER_DETAILS_FAILED,
          payload: {
            error: 'something went wrong [getPsots]',
          },
        });
      }
    }
  } catch (e) {
    // alert(JSON.stringify(e))
    yield put({
      type: C.GET_USER_DETAILS_FAILED,
      payload: {
        error: e,
      },
    });
  }
}

const _retrieveData = async item => {
  try {
    const token = await AsyncStorage.getItem(item);
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) { }
};

function* forgotPassword(action) {
  const { Api } = require("../../services");
  try {
    const response = yield call(Api.forgotPasswordCall, action.payload);
    if (response && response.data && response.data.message) {
      if (response.data.message === 'No Account With This Email') {

        Snackbar.show({
          text: response.data.message,
          type: 'danger',
          backgroundColor: 'red',

          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Okay',

            onPress: () => { Snackbar.dismiss() },
          },
        });
      } else {

        Snackbar.show({
          text: response.data.message,
          type: 'danger',
          backgroundColor: 'green',

          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Okay',

            onPress: () => { Snackbar.dismiss() },
          },
        });
      }
    }
  } catch (error) { }
}

function* updateImage(action) {
  const { Api } = require("../../services");
  const { dismissModal } = require("../../navigation");
  try {
    const token = yield call(_retrieveData, 'token');
    if (token) {
      const response = yield call(Api.updateUserDataCall, {
        token,
        image: action.payload.image,
      });
      if (
        response.data &&
        response.data.message === 'User Updated Successfully'
      ) {
        yield put(getUserDetailsAction({}));
        dismissModal(action.payload.componentId);
        // useToast().show({
        //   duration: 3000,
        //   render:()=>{
        //     return <Box bg={'success.500'}>
        //       Your changes have been successfully saved
        //     </Box>
        //   }
        // });
        Snackbar.show({
          text: ' Your changes have been successfully saved',
          type: 'danger',
          backgroundColor: 'green',

          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Okay',

            onPress: () => { Snackbar.dismiss() },
          },
        });
        yield put({
          type: C.UPDATE_IMAGE_SUCCEEDED,
          payload: {
            ...response.data,
          },
        });
      } else {
        dismissModal(action.payload.componentId);

        Snackbar.show({
          text: response.data.message,
          type: 'danger',
          backgroundColor: 'red',

          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Okay',

            onPress: () => { Snackbar.dismiss() },
          },
        });
        yield put({
          type: C.UPDATE_IMAGE_FAILED,
          payload: {
            error: 'something went wrong [getPsots]',
          },
        });
      }
    }
  } catch (e) {
    // alert(JSON.stringify(e))
    // useToast.show({
    //   duration: 3000,
    //   render:()=>{
    //     return <Box bg={'danger.500'}>
    //       Something went wrong
    //     </Box>
    //   }
    // });
    Snackbar.show({
      text: 'Something went wrong',
      type: 'danger',
      backgroundColor: 'red',

      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'Okay',

        onPress: () => { Snackbar.dismiss() },
      },
    });
    yield put({
      type: C.UPDATE_IMAGE_FAILED,
      payload: {
        error: e,
      },
    });
  }
}
// ... rest of sagas (changePassword, updateImage, etc.) remain same

export default function* userSaga() {
  yield takeLatest(C.LOGIN_USER_REQUESTED, login);
  yield takeLatest(C.CHANGE_PASSWORD_REQUESTED, changePassword);
  yield takeEvery(C.GET_USER_PROFILE_REQUESTED, getUserProfile);
  yield takeLatest(C.GET_USER_DETAILS_REQUESTED, getUserDetails);
  yield takeLatest(C.FORGOT_PASSWORD_REQUESTED, forgotPassword);
  yield takeLatest(C.UPDATE_IMAGE_REQUESTED, updateImage);
}
