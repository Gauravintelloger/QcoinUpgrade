import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';

const {width, height, scale} = Dimensions.get('window');

export const OverLay = props => (
  <View
    style={{
      height: height,
      width: width,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size="large" color="#FFAB31" />
  </View>
);
