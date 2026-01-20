

import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { screenIds, goToLogin, resetRoot} from '../../navigation';
import { showModal } from "../../navigation/NavigationService";

import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const dimensionsCalculation = IPhonePixel => {
  return (width * IPhonePixel) / 375;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#039893',
    width: 230,
    marginTop: 30,
    borderRadius: 25,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain',
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

class NewScreen extends PureComponent {
  async componentDidMount() {
    let firstTime = await AsyncStorage.getItem('firstTime');
    if (firstTime) {
      this.getToken();
    } else {
      setTimeout(() => {
        this.showWelcomeMessage();
      }, 3000);
    }
    // setTimeout(() => { this.getToken() }, 3000);
  }
  showWelcomeMessage = () => {
     showModal(screenIds.WELCOME_MESSAGE_SCREEN);
  };
  getToken = async () => {
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
        <Image
          source={require('../../assets/images/splashScreen.png')}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default NewScreen;
