

import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  Image
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, resetRoot } from '../../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { getAppVersionCall } from '../../services/api/calls';
import { Text } from 'react-native';

console.log("calling welcome");
// console.log("screenIds", screenIds);
// console.log("goToLogin", goToLogin);
// console.log("resetRoot", resetRoot);

class WelcomeScreen extends PureComponent {

  async componentDidMount() {
    console.log('WELCOME');
    let version = await DeviceInfo.getVersion();
    let newVersion = await getAppVersionCall();
    newVersion =
      Platform.OS === 'android'
        ? newVersion.data.android.version
        : newVersion.data.ios.version;

    if (version >= newVersion) {
      let firstTime = await AsyncStorage.getItem('firstTime');
      if (firstTime) {
        this.getToken();
      } else {
        setTimeout(() => {
          this.showWelcomeMessage();
        }, 3000);
      }
    } else {
      // showModal(screenIds.MODAL_SCREEN, {
      //   text: 'An update required before the user is allowed to continue using the App.',
      //   noText: 'Cancel',
      //   yesText: 'Okay',
      //   noClick: () => { },
      // });
    }
  }
  showWelcomeMessage = () => {
    // showModal(screenIds.SIGNIN_SCREEN);
  };
  getToken = async () => {
    //goToLogin();
    //return
    let token = await AsyncStorage.getItem('token');
    let changePassword = await AsyncStorage.getItem('changePassword');
    if (token) this.props.getUserDetails({});
    setTimeout(() => {
      if (!token || !changePassword || changePassword === 'yes') {
        goToLogin();
      } else {
        resetRoot();
      }
    }, 2000);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#005EB8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Text>Hey loading this</Text> */}
        <Image
          source={require('../../assets/images/splashScreen.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default WelcomeScreen;
