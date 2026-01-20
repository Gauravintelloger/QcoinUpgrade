// @flow

import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
import {
  showModal,
  screenIds,
  goToLogin,
  pop,
  dismissModal,
} from '../../navigation';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomInput} from '../../components/CustomInput';
import {CustomButton} from '../../components/CustomButton';
import {OverLay} from '../../components/OverLay';
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

class ModalScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: dimensionsCalculation(164),
          marginHorizontal:this.props.noText? 0 : dimensionsCalculation(20),
          alignItems: 'center',
          backgroundColor: 'rgba(52,52,52,0.2)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: dimensionsCalculation(16),
            shadowColor: '#333A4D',
            shadowOpacity: 0.34,
            shadowRadius: 30,
            shadowOffset: {
              height: 10,
              width: 0,
            },
            elevation: 2,
            paddingHorizontal: dimensionsCalculation(32),
            paddingVertical: dimensionsCalculation(24),
          }}>
          <Text
            style={{
              color: '#656565',
              fontSize: dimensionsCalculation(14),
              marginBottom: dimensionsCalculation(24),
              textAlign: 'center',
            }}>
            {this.props.text}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.props.noText &&
            <TouchableOpacity
              onPress={() => {
                if (this.props.noClick) {
                  dismissModal(this.props.componentId);
                  this.props.noClick();
                } else {
                  dismissModal(this.props.componentId);
                }
              }}
              style={{
                height: dimensionsCalculation(32),
                flex: 1,
                marginRight: dimensionsCalculation(16),
                borderRadius: dimensionsCalculation(6),
                borderColor: '#1A66E8',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#1A66E8'}}>{this.props.noText}</Text>
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={() => {
                if (this.props.yesClick) {
                  dismissModal(this.props.componentId);
                  this.props.yesClick();
                } else {
                  dismissModal(this.props.componentId);
                }
              }}
              style={{
                height: dimensionsCalculation(32),
                flex: 1,
                marginLeft: dimensionsCalculation(16),
                borderRadius: dimensionsCalculation(6),
                borderColor: '#1A66E8',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1A66E8',
              }}>
              <Text style={{color: '#fff'}}>{this.props.yesText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ModalScreen;
