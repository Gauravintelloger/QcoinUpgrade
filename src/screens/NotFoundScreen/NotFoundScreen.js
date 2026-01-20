// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import { showModal, screenIds, goToLogin, resetRoot } from '../../navigation';
const { width, height } = Dimensions.get('window');
const dimensionsCalculation = (IPhonePixel) => {
  return width * IPhonePixel / 375
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#039893',
    width: 230,
    marginTop: 30,
    borderRadius: 25
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain'
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

class NotFoundScreen extends PureComponent {


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#005EB8', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Not Found Screen!</Text>
      </View>
    );
  }
}

export default NotFoundScreen;
